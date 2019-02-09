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
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof contestController
   */
  static contestInElection(req, res) {
    try {
      if (req.admin) {
        const id = Number(req.params.user_id);
        const { office, party } = req.body;
        const query = 'INSERT INTO candidates(office, party, createdBy) VALUES($1, $2, $3) RETURNING*';
        const value = [office, party, id];
        pool.query('SELECT FROM candidates WHERE office=$1 AND party=$2 AND createdBy=$3 OR office=$4 AND party=$5', [office, party, id, office, party], (err, resultCheck) => {
          if (err) {
            return res.status(500).json({ staus: 500, message: 'Something unexpected happened' });
          }
          if (resultCheck.rowCount > 0) {
            return res.status(409).json({ staus: 409, message: 'User has been registered for this office ' });
          }
          pool.query(query, value, (error, result) => {
            if (error) {
              return res.status(404).json({ status: 404, error: 'Unable to create a contestant' });
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
      } else {
        return res.status(401).json({ status: 401, error: 'You are not authorized to use this route' });
      }
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Something unexpected just happened. Try again' });
    }
  }
}


export default contestController;