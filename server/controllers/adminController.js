
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
        const acceptance = 'accepted';
        const query = 'UPDATE candidates SET acceptance=$1 WHERE createdBy=$2';
        pool.query('SELECT * FROM candidates WHERE createdBy=$1', [id], (err, resultCheck) => {
          if (err) {
            return res.status(500).json({ staus: 500, message: 'Something unexpected happened' });
          }
          if (resultCheck.rowCount < 0) {
            return res.status(404).json({ staus: 404, message: 'User does not exists ' });
          }
          pool.query('SELECT * FROM candidates WHERE createdBy=$1 AND acceptance=$2', [id, acceptance], (errSelect, resultOfCheck) => {
            if (errSelect) {
              return res.status(500).json({ staus: 500, message: 'Something unexpected happened' });
            }
            if (resultOfCheck.rowCount < 0) {
              return res.status(409).json({ status: 409, message: 'Candidate has been accepted already' })
            }
            pool.query(query, [acceptance, id], (error, result) => {
              if (error) {
                return res.status(500).json({ status: 500, error: 'Unable to accept candidate' });
              } if (result.rowCount === 0) {
                return res.status(404).json({ status: 404, error: 'Unable to accept candidate' });
              }
              return res.status(201).json({
                status: 201,
                data: result.rows
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
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof AdminController
   */
  static rejectCandidate(req, res) {
    try {
      if (req.admin) {
        const id = Number(req.params.user_id);
        const acceptance = 'rejected';
        const query = 'UPDATE candidates SET acceptance=$1 WHERE createdBy=$2';
        pool.query('SELECT * FROM candidates WHERE createdBy=$1', [id], (err, resultCheck) => {
          if (err) {
            return res.status(500).json({ staus: 500, message: 'Something unexpected happened' });
          }
          if (resultCheck.rowCount < 0) {
            return res.status(404).json({ staus: 404, message: 'User does not exists ' });
          }
          pool.query('SELECT * FROM candidates WHERE createdBy=$1 AND acceptance=$2', [id, acceptance], (errSelect, resultOfCheck) => {
            if (errSelect) {
              return res.status(500).json({ staus: 500, message: 'Something unexpected happened' });
            }
            if (resultOfCheck.rowCount < 0) {
              return res.status(409).json({ status: 409, message: 'Candidate has been accepted already' })
            }
            pool.query(query, [acceptance, id], (error, result) => {
              if (error) {
                return res.status(500).json({ status: 500, error: 'Unable to accept candidate' });
              } if (result.rowCount === 0) {
                return res.status(404).json({ status: 404, error: 'Unable to accept candidate' });
              }
              return res.status(201).json({
                status: 201,
                data: result.rows
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
        const acceptance = 'pending';
        const query = 'select users.firstname, users.lastname, offices.name, parties.name as party, candidates.createdBy, candidates.acceptance from candidates inner join users on users.user_id=candidates.createdBy inner join offices on offices.office_id=candidates.office inner join parties on parties.party_id=candidates.party where candidates.acceptance=$1 group by users.firstname, users.lastname, offices.name, parties.name, candidates.createdBy, candidates.acceptance';
        pool.query(query, [acceptance], (error, result) => {
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
      const acceptance = 'accepted';
      const query = 'select offices.office_id, offices.name as offices_name, offices.type, candidates.createdBy, users.firstname, users.lastname, users.passportUrl, parties.name from candidates inner join offices on offices.office_id=candidates.office inner join users on users.user_id=candidates.createdBy inner join parties on parties.party_id=candidates.party where candidates.acceptance=$1;';
      pool.query(query, [acceptance], (error, result) => {
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
