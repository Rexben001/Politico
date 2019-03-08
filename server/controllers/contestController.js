import database from '../models/database';

const { pool } = database;
/**
 *
 *
 * @class contestController
 */
class contestController {
  /**
   *
   *
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns
   * @memberof contestController
   */
  static contestInElection(req, res) {
    const { id } = req;
    const { office, party } = req.body;
    const query = 'INSERT INTO candidates(office, party, createdBy, acceptance) VALUES($1, $2, $3, $4) RETURNING*';
    const value = [office, party, id, 'pending'];
    pool.query('SELECT FROM candidates WHERE createdBy=$1', [id], (err, resultCheck) => {
      if (resultCheck.rowCount > 0) {
        return res.status(409).json({ staus: 409, message: 'This party has been registered for this office' });
      }
      pool.query('SELECT FROM candidates WHERE office=$1 AND party=$2', [office, party], (err, resultCheck2) => {
        if (resultCheck2.rowCount > 0) {
          return res.status(409).json({ staus: 409, message: 'User has been registered for this office ' });
        }
        pool.query(query, value, (error, result) => {
          if (result.rowCount === 0) {
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
    });
  }
}


export default contestController;