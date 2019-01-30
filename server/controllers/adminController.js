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
            party.push(newParty);

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
}

export default AdminController;