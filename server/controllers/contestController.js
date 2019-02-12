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
    try {
      const { id } = req;
      const { office, party } = req.body;
      const query = 'INSERT INTO candidates(office, party, createdBy) VALUES($1, $2, $3) RETURNING*';
      const value = [office, party, id];
      pool.query('SELECT FROM candidates WHERE office=$1 AND party=$2 AND createdBy=$3', [office, party, id], (err, resultCheck) => {
        if (err) {
          return res.status(500).json({ staus: 500, message: 'Something unexpected happened' });
        }
        if (resultCheck.rowCount > 0) {
          return res.status(409).json({ staus: 409, message: 'User has been registered for this office ' });
        }
        pool.query('SELECT FROM candidates WHERE office=$1 AND party=$2', [office, party], (err, resultCheck2) => {
          if (err) {
            return res.status(500).json({ staus: 500, message: 'Something unexpected happened' });
          }
          if (resultCheck2.rowCount > 0) {
            return res.status(409).json({ staus: 409, message: 'Party has been registered for this office ' });
          }

          pool.query(query, value, (error, result) => {
            if (error) {
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
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Something unexpected just happened. Try again' });
    }
  }
}


export default contestController;