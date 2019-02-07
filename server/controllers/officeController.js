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
              return res.status(400).json({ status: 400, error: error });
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
   * @memberof OfficeCOntroller
   */
  static getAllParties(req, res) {
    try {
      pool.connect((err, client, done) => {
        if (err) throw err;
        const query = 'SELECT * FROM parties';
        client.query(query, (error, result) => {
          done();
          if (error) {
            return res.status(404).json({ staus: 404, error: 'The list of parties could not be fetched' });
          }
          if (result.rowCount === 0) {
            return res.status(404).json({ staus: 404, data: [] });
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
   * @memberof OfficeCOntroller
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
   * @memberof OfficeCOntroller
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
   * @memberof OfficeCOntroller
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

        pool.connect((err, client, done) => {
          if (err) throw err;
          const query = 'INSERT INTO offices (name, type) VALUES($1,$2) RETURNING*';
          const value = [name, type];
          client.query(query, value, (error, result) => {
            done();
            if (error || result.rowCount === 0) {
              return res.status(400).json({ status: 400, error: error.detail });
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
      pool.connect((err, client, done) => {
        if (err) throw err;
        const query = 'SELECT * FROM offices';
        client.query(query, (error, result) => {
          done();
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
      pool.connect((err, client, done) => {
        if (err) throw err;
        const query = `SELECT * FROM offices WHERE office_id=${id}`;
        client.query(query, (error, result) => {
          done();
          if (error || result.rowCount === 0) {
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
        pool.connect((err, client, done) => {
          if (err) throw err;
          const query = `SELECT COUNT(votes.candidate) AS result, candidates.candidate_id, candidates.office FROM votes JOIN candidates ON candidates.candidate_id =votes.candidate  WHERE votes.office = ${id} GROUP BY candidates.candidate_id, candidates.createdBy, candidates.office`;
          client.query(query, (error, result) => {
            done();
            if (error || result.rowCount === 0) {
              return res.status(500).json({ staus: 500, message: `Vote could not be fetched, ${error}` });
            }
            return res.status(200).json({
              status: 200,
              data: result.rows
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


export default OfficeCOntroller;
