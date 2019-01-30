import dummyDatabase from '../models/dummyDatabase';

class AdminController {
    static registerParty(req, res) {
        try {
            const {
                party_id, name, hqAddress, logoUrl
            } = req.body;

            const newParty = {
                party_id, name, hqAddress, logoUrl
            };
            dummyDatabase.push(newParty);

            return res.status(201).json({
                "status": 201,
                "data": newParty
            });
        } catch (error) {
            return res.status(500).json({
                "status": 500,
                "error": 'Unable to create a new party'
            });
        }
    }

    static getAllParties(req, res) {
        try {
            return res.status(200).json({
                "status": 200,
                "data": party
            });
        } catch (error) {
            return res.status(400).json({
                "status": 400,
                "error": 'Unable to get all parties'
            });
        }
    }
}

export default AdminController;