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
                  email, phoneNumber, password, is_admin, passportUrl) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;
            const value = [firstname, lastname, othernames, username,
              email, phonenumber, passwordHash, false, passportUrl];
            client.query(query, value, (error, result) => {
              done();
              if (error || result.rowCount === 0) {
                return res.status(400).json({ status: 400, error: error.detail });
              }
              jwt.sign({ username, password },
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
      return res.status(500).json({ status: 500, error: 'Server error' });
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
              jwt.sign({ email, password },
                process.env.SECRETKEY, { expiresIn: '7d' }, (err, token) => {
                  if (err) throw err;
                  res.status(201).json({
                    status: 201,
                    data: [{
                      token,
                      user: result.rows[0]
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
      return res.status(500).json({ status: 500, error: 'Server error' });
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
      return res.status(500).json({ status: 500, error: 'Server error' });
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
  static contestInElection(req, res) {
    try {
      const id = Number(req.params.user_id);
      const { office, party } = req.body;
      pool.connect((err, client, done) => {
        if (err) throw err;
        const query = 'INSERT INTO candidates(office, party, createdBy) VALUES($1, $2, $3) RETURNING*';
        const value = [office, party, id];
        client.query(query, value, (error, result) => {
          done();
          if (error || result.rowCount === 0) {
            return res.status(404).json({ status: 404, error: `Unable to create a contestant, ${error}` });
          }
          return res.status(201).json({
            status: 201,
            data: {
              office: result.rows[0].office,
              user: result.rows[0].createdby
            }
          });
        });
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Server error' });
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
  static makeAdmin(req, res) {
    try {
      const id = Number(req.params.user_id);
      pool.connect((err, client, done) => {
        const query = 'UPDATE users SET is_admin=$1, user_id=$2 RETURNING*';
        const value = [true, id];
        client.query(query, value, (error, result) => {
          done();
          if (error || result.rowCount === 0) {
            return res.status(404).json({ staus: 404, message: 'The user with this ID could not be fetched' });
          }
          return res.status(200).json({
            status: 201,
            data: result.rows[0]
          });
        });
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Server error' });
    }
  }

}

export default UserControllers;
