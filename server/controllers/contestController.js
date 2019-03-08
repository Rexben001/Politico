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
<<<<<<< HEAD
      const query = 'INSERT INTO candidates(office, party, createdBy) VALUES($1, $2, $3) RETURNING*';
      const value = [office, party, id];
      pool.query('SELECT FROM candidates WHERE office=$1 AND party=$2', [office, party], (err, resultCheck) => {
=======
      const query = 'INSERT INTO candidates(office, party, createdBy, acceptance) VALUES($1, $2, $3, $4) RETURNING*';
      const value = [office, party, id, 'pending'];
      pool.query('SELECT FROM candidates WHERE createdBy=$1', [id], (err, resultCheck) => {
>>>>>>> ft-refactor-candidates-table-16450764
        if (err) {
          return res.status(500).json({ staus: 500, message: 'Something unexpected happened' });
        }
        if (resultCheck.rowCount > 0) {
          return res.status(409).json({ staus: 409, message: 'This party has been registered for this office' });
        }
        pool.query('SELECT FROM accept_candidates WHERE office=$1 AND party=$2', [office, party], (err, resultCheck2) => {
          if (err) {
            return res.status(500).json({ staus: 500, message: 'Something unexpected happened' });
          }
          if (resultCheck2.rowCount > 0) {
            return res.status(409).json({ staus: 409, message: 'User has been registered for this office ' });
          }
<<<<<<< HEAD
          pool.query('SELECT FROM candidates WHERE createdBy=$1', [id], (err, resultCheck3) => {
            if (err) {
              return res.status(500).json({ staus: 500, message: 'Something unexpected happened' });
=======
          pool.query(query, value, (error, result) => {
            if (error) {
              return res.status(404).json({ status: 404, error: `Unable to create a contestant, ${error}` });
>>>>>>> ft-refactor-candidates-table-16450764
            }
            if (resultCheck3.rowCount > 0) {
              return res.status(409).json({ staus: 409, message: 'User has been registered for this office ' });
            }
            pool.query(query, value, (error, result) => {
              if (error) {
                return res.status(404).json({ status: 404, error: `Unable to create a contestant, ${error}` });
              }
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
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Something unexpected just happened. Try again' });
    }
  }
}


export default contestController;