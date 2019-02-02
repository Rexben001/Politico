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
   * @memberof UserControllers
   */
  static createUser(req, res) {
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
        done();
        if (error || result.rowCount === 0) {
          return res.status(500).json({ status: 500, error: error.detail });
        }
        jwt.sign({ username, password },
          process.env.SECRETKEY, (err, token) => {
            if (err) throw err;
            res.status(200).json({
              status: 200,
              data: [{
                token,
                user: result.rows[0]
              }]
            });
          });
      });
    });
  }
}

export default UserControllers;
