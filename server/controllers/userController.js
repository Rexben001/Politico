import jwt from 'jsonwebtoken';
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
      pool.connect((err, client, done) => {
        if (err) throw err;
        const query = `INSERT INTO users(firstname, lastname, othernames, username,
                  email, phoneNumber, password, is_admin, passportUrl) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *`;
        const value = [firstname, lastname, othernames, username,
          email, phonenumber, password, false, passportUrl];
        client.query(query, value, (error, result) => {
          if (error || result.rowCount === 0) {
            done();
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
        const query = 'SELECT * FROM users WHERE email=$1 AND password=$2';
        const value = [email, password];
        client.query(query, value, (error, result) => {
          done();
          if (error) {
            res.status(500).json({ status: 500, message: 'An error occured while trying to fetch user' });
          } else {
            if (result.rowCount === 0) {
              res.status(500).json({ staus: 500, message: 'The user could not be saved' });
            }
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
          }
        });
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Server error' });
    }
  }
}

export default UserControllers;
