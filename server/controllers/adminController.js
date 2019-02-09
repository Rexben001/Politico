
import database from '../models/database';

const { pool } = database;
/**
 *
 *
 * @class AdminController
 */
class AdminController {
  /**
     *
     *
     * @static
     * @param {*} req
     * @param {*} res
     * @returns
     * @memberof AdminController
     */
  static makeAdmin(req, res) {
    try {
      const id = Number(req.params.user_id);
      if (req.admin) {
        const query = 'UPDATE users SET is_admin=$1 WHERE user_id=$2 RETURNING user_id, username, email, is_admin';
        const value = [true, id];
        pool.query(query, value, (error, result) => {
          if (error || result.rowCount === 0) {
            return res.status(404).json({ staus: 404, error: `The user with this ID could not be fetched, ${error}` });
          }
          return res.status(201).json({
            status: 201,
            data: result.rows[0]
          });
        });
      } else {
        return res.status(401).json({ status: 401, error: 'You are not authorized to use this route' });
      }
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
      * @memberof OfficeCOntroller
      */
  static getAllResults(req, res) {
    try {
      if (req.admin) {
        const id = Number(req.params.office_id);
        pool.connect((err, client, done) => {
          if (err) throw err;
          const query = `SELECT office, candidate, COUNT(candidate) AS result FROM votes WHERE office=${id} GROUP BY candidate, office`;
          client.query(query, (error, result) => {
            done();
            if (error || result.rowCount === 0) {
              return res.status(500).json({ staus: 500, message: `Vote could not be fetched, ${error}` });
            }
            return res.status(200).json({
              status: 200,
              data: result.rows
            });
          });
        });
      } else {
        return res.status(401).json({ status: 401, error: 'You are not authorized to use this route' });
      }
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Server error' });
    }
  }

}

export default AdminController;