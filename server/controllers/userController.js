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
        if (error || result.rowCount === 0) {
          console.log(error);
          done();
          return res.status(400).json({ status: 400, error: error.detail });
        }
        jwt.sign({ username, password },
          process.env.SECRETKEY, (err, token) => {
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
  }
}

export default UserControllers;
