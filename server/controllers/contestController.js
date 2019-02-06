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
        if (typeof (req.params.user_id) !== 'number') {
          return res.status(400).json({ status: 400, error: 'ID must be a number' });
        }
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
      } else {
        return res.status(401).json({ status: 401, error: 'You are not authorized to use this route' });
      }
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Server error' });
    }
  }
}


export default contestController;