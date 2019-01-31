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
        return res.status(200).json({
            "status": 200,
            "data": dummyDatabase
        });
    }

    static getOneParty(req, res) {
        const id = Number(req.params.party_id);
        const singleParty = dummyDatabase.find(parties => parties.party_id == id);
        if (!singleParty) {
            return res.status(404).json({
                "status": 404,
                "error": 'Unable to retrieve party'
            });
        }
        return res.status(200).json({
            "status": 200,
            "data": singleParty,
        });
    }

    static editOneParty(req, res) {
        const id = Number(req.params.party_id);
        const {
            name, hqAddress, logoUrl
        } = req.body;
        const singleParty = dummyDatabase.find(parties => parties.party_id == id);
        if (!singleParty) {
            return res.status(404).json({
                "status": 404,
                "error": 'Unable to retrieve party'
            });
        }
        singleParty.name = name;
        singleParty.hqAddress = hqAddress;
        singleParty.logoUrl = logoUrl;
        return res.status(201).json({
            "status": 201,
            "data": singleParty
        });
    }
}

export default AdminController;