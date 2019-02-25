
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
     * @param {Object} req
     * @param {Object} res
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
            return res.status(404).json({ staus: 404, error: 'The user with this ID could not be fetched' });
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
      *@method getAllResults
      * @static
      * @param {Object} req
      * @param {Object} res
      * @returns
      * @memberof AdminController
      */
  static getAllResults(req, res) {
    try {
      const id = Number(req.params.office_id);
      const query = `select office, candidate, users.firstname, users.lastname, users.passportUrl, offices.name, count(candidate) as results from votes inner join users on users.user_id=votes.candidate inner join offices on offices.office_id=votes.office where votes.office=${id} group by candidate, offices.name, users.firstname, office, users.lastname, users.passportUrl`;
      pool.query(query, (error, result) => {
        if (error || result.rowCount === 0) {
          return res.status(404).json({ staus: 404, message: 'Vote could not be fetched' });
        }
        return res.status(200).json({
          status: 200,
          data: result.rows
        });
      });
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Server error' });
    }
  }

  /**
      *
      *@method getAllUsers
      * @static
      * @param {Object} req
      * @param {Object} res
      * @returns
      * @memberof AdminController
      */
  static getAllUsers(req, res) {
    try {
      if (req.admin) {
        const query = 'SELECT * FROM users';
        pool.query(query, (error, result) => {
          if (error) {
            return res.status(500).json({ staus: 500, message: 'Users could not be fetched' });
          }
          return res.status(200).json({
            status: 200,
            data: result.rows
          });
        });
      } else {
        return res.status(401).json({ status: 401, error: 'You are not authorized to use this route' });
      }
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
   * @memberof AdminController
   */
  static acceptCandidate(req, res) {
    try {
      if (req.admin) {
        const id = Number(req.params.user_id);
        const query = 'INSERT INTO accept_candidates(office, party, createdBy) VALUES($1, $2, $3) RETURNING*';
        pool.query('SELECT * FROM candidates WHERE candidate_id=$1', [id], (err, resultCheck) => {
          if (err) {
            return res.status(500).json({ staus: 500, message: 'Something unexpected happened' });
          }
          if (resultCheck.rowCount > 0) {
            return res.status(409).json({ staus: 409, message: 'User does not exists ' });
          }
          const { office } = resultCheck.rows[0];
          const { createdby } = resultCheck.rows[0];
          const { party } = resultCheck.rows[0];
          const value = [office, party, createdby];
          pool.query('SELECT * FROM accept_candidates WHERE office=$1 AND party=$2 AND createdBy=$3', value, (errSelect, resultOfCheck) => {
            if (errSelect) {
              return res.status(500).json({ staus: 500, message: 'Something unexpected happened' });
            }
            if (resultOfCheck.rowCount > 0) {

              return res.status(409).json({ status: 409, message: 'Candidate has been accepted already' })
            }
            pool.query(query, value, (error, result) => {
              if (error || result.rowCount === 0) {
                return res.status(404).json({ status: 404, error: `Unable to create a contestant, ${error}` });
              }
              pool.query('DELETE FROM candidates WHERE candidate_id=$1 RETURNING *', [id], (err, results) => {
                if (err || result.rowCount === 0) {
                  return res.status(500).json({ status: 500, error: `Unable to create a contestant, ${err}` });
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
      } else {
        return res.status(401).json({ status: 401, error: 'You are not authorized to use this route' });
      }
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Something unexpected just happened. Try again' });
    }
  }

  /**
     *
     *@method getAllUsers
     * @static
     * @param {Object} req
     * @param {Object} res
     * @returns
     * @memberof AdminController
     */
  static getAllPending(req, res) {
    try {
      if (req.admin) {
        const query = 'select users.firstname, users.lastname, offices.name, parties.name as party, candidates.candidate_id from users, offices, parties,candidates where user_id=candidates.createdBy and offices.office_id=candidates.office and parties.party_id=candidates.party';
        pool.query(query, (error, result) => {
          if (error) {
            return res.status(500).json({ staus: 500, message: 'Candidates could not be fetched' });
          } if (result.rowCount === 0) {
            return res.status(404).json({ staus: 404, message: 'No candidates' });
          }
          return res.status(200).json({
            status: 200,
            data: result.rows
          });
        });
      } else {
        return res.status(401).json({ status: 401, error: 'You are not authorized to use this route' });
      }
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
   * @memberof AdminController
   */
  static populateValuesForVotes(req, res) {
    try {
      const query = 'select offices.office_id, offices.name as offices_name, offices.type, accept_candidates.candidate_id, users.firstname, users.lastname, users.passportUrl,parties.name from offices, users,accept_candidates, parties  where offices.office_id=accept_candidates.office and users.user_id=accept_candidates.createdBy and parties.party_id=accept_candidates.party;';
      pool.query(query, (error, result) => {
        if (error) {
          return res.status(500).json({ staus: 500, message: 'Candidates could not be fetched' });
        } if (result.rowCount === 0) {
          return res.sofficestatus(404).json({ staus: 404, message: 'No candidates' });
        }
        return res.status(200).json({
          status: 200,
          data: result.rows
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
   * @memberof AdminController
   */
  static getAllPetitions(req, res) {
    try {
      if (req.admin) {
        const query = 'select users.firstname, users.lastname, offices.name, offices.type, petitions.body, petitions.evidence from petitions inner join users on users.user_id=petitions.createdby inner join offices on offices.office_id=petitions.office';
        pool.query(query, (error, result) => {
          if (error) {
            return res.status(500).json({ staus: 500, message: 'Petitions could not be fetched' });
          } if (result.rowCount === 0) {
            return res.status(404).json({ staus: 404, message: 'No petitions' });
          }
          return res.status(200).json({
            status: 200,
            data: result.rows
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
