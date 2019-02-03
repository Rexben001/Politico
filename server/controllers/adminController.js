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
          res.status(201).json({
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
          if (error) {
            res.status(500).json({ status: 500, message: `An error occured while trying to get parties, ${error}` });
          } else {
            if (result.rowCount === 0) {
              res.status(500).json({ staus: 500, message: 'The list of parties could not be fetched' });
            }
            res.status(200).json({
              status: 200,
              data: result.rows
            });
          }
        });
      });
    } catch (error) {
      return res.status(400).json({
        status: 400,
        error
      });
    }
  }

  // static getOneParty(req, res) {
  //   const id = Number(req.params.party_id);
  //   const singleParty = parties.find(parties => parties.party_id == id);
  //   if (!singleParty) {
  //     return res.status(404).json({
  //       status: 404,
  //       error: 'Unable to retrieve party'
  //     });
  //   }
  //   return res.status(200).json({
  //     status: 200,
  //     data: [{
  //       id: singleParty.party_id,
  //       name: singleParty.name,
  //       logoUrl: singleParty.logoUrl
  //     }]
  //   });
  // }

  // static editOneParty(req, res) {
  //   const id = Number(req.params.party_id);
  //   const {
  //     name, hqAddress, logoUrl
  //   } = req.body;
  //   const singleParty = parties.find(parties => parties.party_id == id);
  //   if (!singleParty) {
  //     return res.status(404).json({
  //       status: 404,
  //       error: 'Unable to retrieve party'
  //     });
  //   }
  //   singleParty.name = name;
  //   singleParty.hqAddress = hqAddress;
  //   singleParty.logoUrl = logoUrl;
  //   return res.status(201).json({
  //     status: 201,
  //     data: [{
  //       id: singleParty.party_id,
  //       name: singleParty.name,
  //     }]
  //   });
  // }

  // static deleteOneParty(req, res) {
  //   const id = Number(req.params.party_id);
  //   const singleParty = parties.find(parties => parties.party_id == id);
  //   if (!singleParty) {
  //     return res.status(404).json({
  //       status: 404,
  //       error: 'Unable to retrieve party'
  //     });
  //   }
  //   const indexOfSignleParty = parties.indexOf(singleParty);
  //   parties.splice(indexOfSignleParty, 1);
  //   return res.status(200).json({
  //     status: 200,
  //     data: [{ message: `You have successfully deleted ${singleParty.name}` }]
  //   });
  // }

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
