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
   * @param {*} req
   * @param {*} res
   * @returns
   * @memberof AdminController
   */
  static registerParty(req, res) {
    try {
      const {
        name, hqAddress, logoUrl
      } = req.body;

      pool.connect((err, client, done) => {
        if (err) throw err;
        const query = 'INSERT INTO parties (name, hqAddress, logoUrl) VALUES($1,$2,$3) RETURNING*';
        const value = [name, hqAddress, logoUrl];
        client.query(query, value, (error, result) => {
          done();
          if (error || result.rowCount === 0) {
            return res.status(400).json({ status: 400, error: error.detail });
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
  static getAllParties(req, res) {
    try {
      pool.connect((err, client, done) => {
        if (err) throw err;
        const query = 'SELECT * FROM parties';
        client.query(query, (error, result) => {
          done();
          if (error || result.rowCount === 0) {
            return res.status(404).json({ staus: 404, message: 'The list of parties could not be fetched' });
          }
          return res.status(200).json({
            status: 200,
            data: result.rows
          });
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
  static getOneParty(req, res) {
    try {
      const id = Number(req.params.party_id);
      pool.connect((err, client, done) => {
        if (err) throw err;
        const query = `SELECT * FROM parties WHERE party_id=${id}`;
        client.query(query, (error, result) => {
          done();
          if (error || result.rowCount === 0) {
            return res.status(404).json({ staus: 404, message: 'The list of parties could not be fetched' });
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
  static editOneParty(req, res) {
    try {
      const id = Number(req.params.party_id);
      const { name, hqAddress, logoUrl } = req.body;
      pool.connect((err, client, done) => {
        const query = 'UPDATE parties SET name=$1, hqAddress=$2, logoUrl=$3 WHERE party_id=$4 RETURNING *';
        const value = [name, hqAddress, logoUrl, id];
        client.query(query, value, (error, result) => {
          done();
          if (error || result.rowCount === 0) {
            return res.status(404).json({ staus: 404, message: 'The list of parties could not be fetched' });
          }
          return res.status(200).json({
            status: 201,
            data: [{
              id: result.rows[0].party_id,
              name: result.rows[0].name
            }]
          });
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
  static deleteOneParty(req, res) {
    try {
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
    } catch (error) {
      return res.status(500).json({ status: 500, error: 'Server error' });
    }
  }


  // static registerOffice(req, res) {
  //   const {
  //     office_id, type, name, region
  //   } = req.body;

  //   const newOffice = {
  //     office_id, type, name, region
  //   };

  //   offices.push(newOffice);
  //   return res.status(201).json({
  //     status: 201,
  //     data: [{
  //       id: newOffice.office_id,
  //       type: newOffice.type,
  //       name: newOffice.name
  //     }]
  //   });
  // }

  // static getAllOffices(req, res) {
  //   return res.status(200).json({
  //     status: 200,
  //     data: offices
  //   });
  // }

  // static getOneOffice(req, res) {
  //   const id = Number(req.params.office_id);
  //   const singleOffice = offices.find(offices => offices.office_id == id);
  //   if (!singleOffice) {
  //     return res.status(404).json({
  //       status: 404,
  //       error: 'Unable to retrieve Office'
  //     });
  //   }
  //   return res.status(200).json({
  //     status: 200,
  //     data: [{
  //       id: singleOffice.office_id,
  //       type: singleOffice.type,
  //       name: singleOffice.name
  //     }]
  //   });
  // }
}


export default AdminController;
