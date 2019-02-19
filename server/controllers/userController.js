import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import nodeMailer from 'nodemailer';
import multer from '../middlewares/multer';
import config from '../config';
import database from '../models/database';

const { pool } = database;
const { dataUri } = multer;
const { uploader } = config;
/**
 *
 *
 * @class UserControllers
 */
class UserControllers {
  /**
   *
   *
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns
   * @memberof UserControllers
   */
  static async createUser(req, res) {
    try {
      const {
        firstname, lastname, othernames, username, email, phonenumber, password, passportUrl
      } = req.body;
      // let passportUrl;
      // if (req.file) {
      //   const file = dataUri(req).content;
      //   const uploadFile = await uploader.upload(file);
      //   if (uploadFile) {
      //     passportUrl = uploadFile.url;
      //   } else {
      //     console.log('No upload file');
      //   }
      // } else {
      //   console.log('It is not a req.file');
      // }
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          const passwordHash = hash;
          const query = `INSERT INTO users(firstname, lastname, othernames, username,
                  email, phoneNumber, password, is_admin, passportUrl) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING user_id, firstname, lastname, email, is_admin`;
          const value = [firstname, lastname, othernames, username,
            email, phonenumber, passwordHash, true, passportUrl];
          // eslint-disable-next-line no-unused-expressions
          pool.query('SELECT * FROM users WHERE email=$1 OR username=$2', [email, username], (err, resCheck) => {
            if (err) {
              return res.status(500).json({
                status: 500,
                error: 'An unexpected error occurred',
              });
            }
            if (resCheck.rowCount > 0) {
              return res.status(400).json({ status: 400, error: 'User has been registered already' });
            }

            pool.query(query, value, (error, result) => {
              if (error) {
                console.log(error);
                return res.status(400).json({ status: 400, error: `Unable to create user, ${error}` });
              }
              const admin = result.rows[0].is_admin;
              const id = result.rows[0].user_id;
              jwt.sign({
                username, admin, id
              },
                process.env.SECRETKEY, { expiresIn: '20d' }, (err, token) => {
                  res.status(201).json({
                    status: 201,
                    data: [{
                      token,
                      user: result.rows[0]
                    }]
                  });
                });
            });
          });
        });
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: `Something unexpected just happened. Try again, ${error}` });
    }
  }

  /**
   *
   *
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns
   * @memberof UserControllers
   */
  static loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const query = 'SELECT * FROM users WHERE email=$1';
      const value = [email];
      pool.query(query, value, (error, result) => {
        if (error || result.rowCount === 0) {
          return res.status(404).json({ status: 404, error: `User with ${email} does not exists` });
        }
        bcrypt.compare(password, result.rows[0].password).then((isMatch) => {
          if (isMatch) {
            const admin = result.rows[0].is_admin;
            const username = result.rows[0];
            const id = result.rows[0].user_id;
            jwt.sign({ username, admin, id },
              process.env.SECRETKEY, { expiresIn: '7d' }, (err, token) => {
                res.status(201).json({
                  status: 201,
                  data: [{
                    token,
                    user: {
                      id: result.rows[0].user_id,
                      username: result.rows[0].username,
                      email: result.rows[0].email
                    }
                  }]
                });
              });
          } else {
            return res.status(404).json({ status: 404, error: 'Incorrect password' });
          }
        });
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Something unexpected just happened. Try again' });
    }
  }



  /**
   *
   *
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns
   * @memberof UserControllers
   */
  static resetPassword(req, res) {
    try {
      const basePath = 'localhost:8080/api/v1';
      const transporter = nodeMailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: 'politicoxpress@gmail.com',
          pass: 'politico.7394'
        }
      });
      const { email } = req.body;
      const query = 'SELECT * FROM users WHERE email=$1';
      const value = [email];
      pool.query(query, value, (error, result) => {
        if (error || result.rowCount === 0) {
          res.status(404).json({ status: 404, error: 'There is no account associated with this email' });
        }
        const id = result.rows[0].user_id;
        jwt.sign({ email, id },
          process.env.SECRETKEY, { expiresIn: '1d' }, (errToken, token) => {
            if (errToken) res.status(400).json({ status: 400, message: 'Unable to create a token' });
            const mailOptions = {
              from: 'politicoxpress@gmail.com',
              to: email,
              subject: 'Reset Password Link - Politico',
              html: `<p>You requested to reset your password. Click <a href="http://localhost:8080/api/v1/resetpassword/${token}">here</a> to reset it</p><p>Pls, ignore if you are not the one</p>. <p>Contact mail us @ politicoxpress@gmail.com for help</p>`
            };
            transporter.sendMail(mailOptions, (err, info) => {
              if (err) {
                return res.status(500).json({ status: 500, message: `Server error, ${err}` });
              }
              res.status(200).json({
                status: 200,
                data: [{
                  message: 'Check your email for password reset link',
                  email: result.rows[0].email,
                  info
                }]
              });
            });
          });
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Something unexpected just happened. Try again' });
    }
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof UserControllers
   */
  static passwordChanged(req, res) {
    const { password } = req.body;
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        const passwordHash = hash;
        const query = 'UPDATE users SET password=$1  WHERE user_id=$2 RETURNING *';
        pool.query(query, [passwordHash, req.id], (err, result) => {
          if (err) res.status(500).json({ status: 500, message: 'Unable to update password' });
          if (result.rowCount === 0) res.status(404).json({ status: 404, message: 'User can not be found' });
          res.status(200).json({
            status: 200,
            data: [{
              message: 'Password changed successfully'
            }]
          })
        })
      });
    });
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof UserControllers
   */
  static loadResetPage(req, res) {
    try {
      res.sendFile('changepassword.html', { root: './UI' });
      // res.json({
      //   display,
      //   token: req.token
      // });
    } catch (e) {
      console.log(e);
    }
  }

  /**
   *
   *
   * @static
   * @param {Object} req
   * @param {Object} res
   * @memberof UserControllers
   */
  static userVote(req, res) {
    const { office, candidate } = req.body;
    const query = 'INSERT INTO votes(office, voter, createdOn, candidate) VALUES($1, $2, NOW(), $3) RETURNING*';
    const value = [office, req.id, candidate];
    pool.query('SELECT FROM votes WHERE office=$1 AND voter=$2 AND candidate=$3 OR office=$4 AND voter=$5', [office, req.id, candidate, office, req.id], (err, resultCheck) => {
      if (err) {
        return res.status(500).json({ staus: 500, message: 'Something unexpected happened' });
      }
      if (resultCheck.rowCount > 0) {
        return res.status(409).json({ staus: 409, message: 'User has voted for this office already' });
      }
      pool.query(query, value, (error, result) => {
        if (error) {
          return res.status(404).json({ staus: 404, message: `An error occurred, ${error}` });
        }
        res.status(201).json({
          status: 201,
          data: {
            office: result.rows[0].office,
            candidate: result.rows[0].candidate,
            voter: result.rows[0].voter
          }
        });
      });
    });
  }

  /**
   *
   *
   * @static
   * @param {Object} req
   * @param {Object} res
   * @memberof UserControllers
   */
  static writePetition(req, res) {
    const { office, bodyValue, evidence } = req.body;
    const query = 'INSERT INTO petitions(office, createdOn, createdBy, body, evidence) VALUES($1, NOW(), $2, $3, $4) RETURNING*';
    const value = [office, req.id, bodyValue, evidence];
    pool.query(query, value, (error, result) => {
      if (error || result.rowCount === 0) {
        return res.status(400).json({ status: 400, error: 'Unable to create petition' });
      }
      res.status(201).json({
        status: 201,
        data: result.rows[0]
      });
    });
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof UserControllers
   */
  static totalVotes(req, res) {
    const query = 'select office, count(office) as total_no from votes where voter=$1 group by office';
    const value = [req.id];
    pool.query(query, value, (error, result) => {
      if (error || result.rowCount === 0) {
        return res.status(400).json({ status: 400, error: `Unable to get total votes, ${error}` });
      }
      res.status(200).json({
        status: 200,
        data: result.rows[0],
        username: req.user.username,
        email: req.user.email,
        passport: req.user.passportUrl
      });
    });
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof UserControllers
   */
  static userProfile(req, res) {
    const query = 'select * from users where user_id=$1';
    const value = [req.id];
    pool.query(query, value, (error, result) => {
      if (error || result.rowCount === 0) {
        return res.status(400).json({ status: 400, error: `Unable to get total votes, ${error}` });
      }
      res.status(200).json({
        status: 200,
        username: req.user.username,
        email: req.user.email,
        passport: req.user.passportUrl
      });
    });
  }


  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @memberof UserControllers
   */
  static allVotes(req, res) {
    const query = 'select * from votes where voter=$1';
    const value = [req.id];
    pool.query(query, value, (error, result) => {
      if (error) {
        return res.status(500).json({ status: 500, error: 'Server error' });
      }
      if (result.rowCount === 0) {
        return res.status(404).json({ status: 404, error: 'No votes has been casted' });
      }
      res.status(200).json({
        status: 200,
        data: result.rows
      });
    });
  }
}
export default UserControllers;
