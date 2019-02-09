import database from '../models/database';

const { pool } = database;
/**
 *
 *
 * @class OfficeCOntroller
 */
class OfficeCOntroller {


  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof OfficeCOntroller
   */
  static registerOffice(req, res) {
    try {
      if (req.admin) {
        const {
          name, type
        } = req.body;

        const query = 'INSERT INTO offices (name, type) VALUES($1,$2) RETURNING*';
        const value = [name, type];

        pool.query('SELECT FROM offices WHERE name=$1 AND type=$2', value, (err, resultCheck) => {
          if (err) {
            return res.status(500).json({ staus: 500, message: 'Something unexpected happened' });
          }
          if (resultCheck.rowCount > 0) {
            return res.status(409).json({ staus: 409, message: 'Office has been registered already' });
          }
          pool.query(query, value, (error, result) => {
            if (error) {
              return res.status(400).json({ status: 400, error: '' });
            }
            return res.status(201).json({
              status: 201,
              data: [{
                id: result.rows[0].office_id,
                type: result.rows[0].type,
                name: result.rows[0].name
              }]
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
   * @memberof OfficeCOntroller
   */
  static getAllOffices(req, res) {
    try {
      const query = 'SELECT * FROM offices';
      pool.query(query, (error, result) => {
        if (error) {
          return res.status(404).json({ staus: 404, error: 'The list of offices could not be fetched' });
        }
        if (result.rowCount === 0) {
          return res.status(404).json({ staus: 404, data: [] });
        }
        return res.status(200).json({
          status: 200,
          data: result.rows
        });
      });
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
  static getOneOffice(req, res) {
    try {

      const id = Number(req.params.office_id);
      const query = `SELECT * FROM offices WHERE office_id=${id}`;
      pool.query(query, (error, result) => {
        if (error) {
          return res.status(404).json({ staus: 404, error: 'The office with this ID cannot be retrieved' });
        }
        return res.status(200).json({
          status: 200,
          data: [{
            id: result.rows[0].party_id,
            name: result.rows[0].name,
            type: result.rows[0].type
          }]
        });
      });
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
        const query = `SELECT COUNT(votes.candidate) AS result, candidates.candidate_id, candidates.office FROM votes JOIN candidates ON candidates.candidate_id =votes.candidate  WHERE votes.office = ${id} GROUP BY candidates.candidate_id, candidates.createdBy, candidates.office`;
        pool.query(query, (error, result) => {
          if (error) {
            return res.status(500).json({ staus: 500, message: 'Vote could not be fetched' });
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
      return res.status(500).json({ status: 500, error: 'Something unexpected just happened. Try again' });
    }
  }
}


export default OfficeCOntroller;
