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
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof PartyController
   */
  static registerParty(req, res) {
    try {
      const {
        name, hqAddress, logoUrl
      } = req.body;

      if (req.admin) {
        pool.connect((err, client, done) => {
          if (err) throw err;


          const query = 'INSERT INTO parties (name, hqAddress, logoUrl) VALUES($1,$2,$3) RETURNING*';
          const value = [name, hqAddress, logoUrl];
          client.query(query, value, (error, result) => {
            done();
            if (error || result.rowCount === 0) {
              return res.status(400).json({ status: 400, error: 'Unable to create a party' });
            }
            return res.status(201).json({
              status: 201,
              data: [{
                id: result.rows[0].party_id,
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
   * @memberof PartyController
   */
  static getAllParties(req, res) {
    try {
      pool.connect((err, client, done) => {
        if (err) throw err;
        const query = 'SELECT * FROM parties';
        client.query(query, (error, result) => {
          done();
          if (error || result.rowCount === 0) {
            return res.status(404).json({ staus: 404, error: 'The list of parties could not be fetched' });
          }
          return res.status(200).json({
            status: 200,
            data: result.rows
          });
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
   * @memberof PartyController
   */
  static getOneParty(req, res) {
    try {
      const id = Number(req.params.party_id);
      pool.connect((err, client, done) => {
        if (err) throw err;
        const query = `SELECT * FROM parties WHERE party_id=${id}`;
        client.query(query, (error, result) => {
          done();
          if (error || result.rowCount === 0) {
            return res.status(404).json({ staus: 404, message: 'The party with this ID could not be fetched' });
          }
          return res.status(200).json({
            status: 200,
            data: [{
              id: result.rows[0].party_id,
              name: result.rows[0].name,
              logoUrl: result.rows[0].logourl
            }]
          });
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
   * @memberof PartyController
   */
  static editOneParty(req, res) {
    try {
      if (req.admin) {

        const id = Number(req.params.party_id);
        const {
          name, hqAddress, logoUrl
        } = req.body;

        pool.connect((err, client, done) => {
          const query = 'UPDATE parties SET name=$1, hqAddress=$2, logoUrl=$3 WHERE party_id=$4 RETURNING *';
          const value = [name, hqAddress, logoUrl, id];
          client.query(query, value, (error, result) => {
            done();
            if (error || result.rowCount === 0) {
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
   * @memberof PartyController
   */
  static deleteOneParty(req, res) {
    try {
      if (req.admin) {

        const id = Number(req.params.party_id);
        pool.connect((err, client, done) => {
          if (err) throw err;
          const query = `DELETE FROM parties WHERE party_id=${id}`;
          client.query(query, (error, result) => {
            done();
            if (error || result.rowCount === 0) {
              return res.status(404).json({ staus: 404, error: 'Cant fetch any party with this ID' });
            }
            return res.status(200).json({
              status: 200,
              message: 'Party deleted successfully'
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

export default PartyController;