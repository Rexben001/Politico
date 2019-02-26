import database from '../models/database';

const { pool } = database;
/**
 *
 *
 * @class PartyController
 */
class PartyController {

  /**
   *
   *
   * @static
   * @param {Object} req
   * @param {Object} res
   * @returns
   * @memberof PartyController
   */
  static registerParty(req, res) {
    try {
      const {
        name, hqAddress, logoUrl
      } = req.body;

      if (req.admin) {
        const query = 'INSERT INTO parties (name, hqAddress, logoUrl) VALUES($1,$2,$3) RETURNING*';
        const value = [name, hqAddress, logoUrl];
        pool.query('SELECT FROM parties WHERE name=$1', [name], (err, resultCheck) => {
          if (err) {
            return res.status(500).json({ staus: 500, message: 'Something unexpected happened' });
          }
          if (resultCheck.rowCount > 0) {
            return res.status(409).json({ staus: 409, message: 'This party name has been registered' });
          }
          pool.query(query, value, (error, result) => {
            if (error) {
              return res.status(400).json({ status: 400, error: 'Unable to create party' });
            }
            return res.status(201).json({
              status: 201,
              data: [{
                id: result.rows[0].party_id,
                name: result.rows[0].name
              }]
            })
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
   * @param {Object} req
   * @param {Object} res
   * @returns
   * @memberof PartyController
   */
  static getAllParties(req, res) {
    try {
      const query = 'SELECT * FROM parties';
      pool.query(query, (error, result) => {
        if (error) {
          return res.status(500).json({ staus: 500, error: 'The list of parties could not be fetched' });
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
   * @param {Object} req
   * @param {Object} res
   * @returns
   * @memberof PartyController
   */
  static getOneParty(req, res) {
    try {

      const id = Number(req.params.party_id);
      const query = `SELECT * FROM parties WHERE party_id=${id}`;
      pool.query(query, (error, result) => {
        if (error) {
          return res.status(404).json({ staus: 404, message: 'An error just occurred' });
        }
        if (result.rowCount === 0) {
          return res.status(404).json({ staus: 404, message: 'The party with this ID could not be fetched' });
        }
        return res.status(200).json({
          status: 200,
          data: result.rows[0]

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
   * @param {Object} req
   * @param {Object} res
   * @returns
   * @memberof PartyController
   */
  static editOneParty(req, res) {
    try {
      if (req.admin) {
        const id = Number(req.params.party_id);
        const {
          name, hqAddress, logoUrl
        } = req.body;
        const query = 'UPDATE parties SET name=$1, hqAddress=$2, logoUrl=$3 WHERE party_id=$4 RETURNING *';
        const value = [name, hqAddress, logoUrl, id];
        pool.query(query, value, (error, result) => {
          if (error) {
            return res.status(400).json({ staus: 400, message: `The party with this ID could not be fetched, ${error}` });
          }
          if (result.rowCount === 0) {
            return res.status(404).json({ staus: 404, message: 'The party with this ID could not be fetched' });
          }
          return res.status(201).json({
            status: 201,
            data: [{
              id: result.rows[0].party_id,
              name: result.rows[0].name
            }]
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
   * @param {Object} req
   * @param {Object} res
   * @returns
   * @memberof PartyController
   */
  static deleteOneParty(req, res) {
    try {
      if (req.admin) {

        const id = Number(req.params.party_id);
        const query = `DELETE FROM parties WHERE party_id=${id}`;
        pool.query(query, (error, result) => {
          if (error) {
            return res.status(404).json({ staus: 404, error: 'Cant fetch any party with this ID' });
          }
          if (result.rowCount === 0) {
            return res.status(404).json({ staus: 404, message: 'The party with this ID could not be fetched' });
          }
          return res.status(200).json({
            status: 200,
            message: 'Party deleted successfully'
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


export default PartyController;