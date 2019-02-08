import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import database from '../models/database';

const { pool } = database;
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
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof UserControllers
   */
  static createUser(req, res) {
    try {
      const {
        firstname, lastname, othernames, username, email, phonenumber, password, passportUrl
      } = req.body;
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
          if (err) throw err;
          const passwordHash = hash;
          pool.connect((err, client, done) => {
            if (err) throw err;
            const query = `INSERT INTO users(firstname, lastname, othernames, username,
                  email, phoneNumber, password, is_admin, passportUrl) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING user_id, firstname, lastname, email, is_admin`;
            const value = [firstname, lastname, othernames, username,
              email, phonenumber, passwordHash, true, passportUrl];
            client.query(query, value, (error, result) => {
              done();
              if (error || result.rowCount === 0) {
                return res.status(400).json({ status: 400, error: `Unable to create user, ${error}` });
              }
              const admin = result.rows[0].is_admin;
              const id = result.rows[0].user_id;
              jwt.sign({ username, password, admin, id },
                process.env.SECRETKEY, { expiresIn: '20d' }, (err, token) => {
                  if (err) throw err;
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
      return res.status(500).json({ status: 500, error: 'Something unexpected just happened. Try again' });
    }
  }

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof UserControllers
   */
  static loginUser(req, res) {
    try {
      const { email, password } = req.body;
      pool.connect((err, client, done) => {
        if (err) throw err;
        const query = 'SELECT * FROM users WHERE email=$1';
        const value = [email];
        client.query(query, value, (error, result) => {
          done();
          if (error || result.rowCount === 0) {
            return res.status(404).json({ status: 404, error: `User with ${email} does not exists` });
          }
          bcrypt.compare(password, result.rows[0].password).then((isMatch) => {
            if (isMatch) {
              const admin = result.rows[0].is_admin;
              const username = result.rows[0];
              const id = result.rows[0].user_id;
              jwt.sign({ username, password, admin, id },
                process.env.SECRETKEY, { expiresIn: '7d' }, (err, token) => {
                  if (err) throw err;
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
   * @returns
   * @memberof UserControllers
   */
  static resetPassword(req, res) {
    try {
      const { email } = req.body;
      pool.connect((err, client, done) => {
        if (err) throw err;
        const query = 'SELECT * FROM users WHERE email=$1';
        const value = [email];
        client.query(query, value, (error, result) => {
          done();
          if (error || result.rowCount === 0) {
            return res.status(404).json({ status: 404, error: 'There is no account associated with this email' });
          }
          res.status(200).json({
            status: 200,
            data: [{
              message: 'Check your email for password reset link',
              email: result.rows[0].email
            }]
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
  static userVote(req, res) {
    const { office, candidate } = req.body;
    pool.connect((err, client, done) => {
      if (err) throw err;
      const query = 'INSERT INTO votes(office, voter, createdOn, candidate) VALUES($1, $2, NOW(), $3) RETURNING*';
      const value = [office, req.id, candidate];
      client.query(query, value, (error, result) => {
        done();
        if (error || result.rowCount === 0) {
          return res.status(404).json({ staus: 404, message: `User can not vote, ${error}` });
        }
        res.status(200).json({
          status: 200,
          data: {
            office: result.rows[0].office,
            candidate: result.rows[0].candidate,
            voter: result.rows[0].createdBy
          }
        });
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
  static writePetition(req, res) {
    const { office, body, evidence } = req.body;
    pool.connect((err, client, done) => {
      if (err) throw err;
      const query = 'INSERT INTO petitions(office, createdOn, createdBy, body, evidence) VALUES($1, NOW(), $2, $3, $4) RETURNING*';
      const value = [office, req.id, body, evidence];
      client.query(query, value, (error, result) => {
        done();
        if (error || result.rowCount === 0) {
          return res.status(400).json({ status: 400, error: `Unable to create user, ${error}` });
        }
        res.status(201).json({
          status: 201,
          data: result.rows[0]
        });
      });
    });
  }
}
export default UserControllers;
