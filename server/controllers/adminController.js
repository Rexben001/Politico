import dummyDatabase from '../models/dummyDatabase';

const { parties, offices } = dummyDatabase;

class AdminController {
    static registerParty(req, res) {
        try {
            const {
                party_id, name, hqAddress, logoUrl
            } = req.body;

            const newParty = {
                party_id, name, hqAddress, logoUrl
            };
            parties.push(newParty);

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
            "data": parties
        });
    }

    static getOneParty(req, res) {
        const id = Number(req.params.party_id);
        const singleParty = parties.find(parties => parties.party_id == id);
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
        const singleParty = parties.find(parties => parties.party_id == id);
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
    static deleteOneParty(req, res) {
        const id = Number(req.params.party_id);
        const singleParty = parties.find(parties => parties.party_id == id);
        if (!singleParty) {
            return res.status(404).json({
                "status": 404,
                "error": 'Unable to retrieve party'
            });
        }
        parties.splice(singleParty, 1);
        return res.status(200).json({
            "status": 200,
            "data": { "message": `You have successfully deleted ${singleParty.name}` }
        });
    }

    static registerOffice(req, res) {
        const {
            office_id, type, name, region
        } = req.body;

        const newOffice = {
            office_id, type, name, region
        };

        offices.push(newOffice);
        return res.status(201).json({
            "status": 201,
            "data": newOffice
        });
    }

    static getAllOffices(req, res) {
        return res.status(200).json({
            "status": 200,
            "data": offices
        });
    }

    static getOneOffice(req, res) {
        const id = Number(req.params.office_id);
        const singleOffice = offices.find(offices => offices.office_id == id);
        if (!singleOffice) {
            return res.status(404).json({
                "status": 404,
                "error": 'Unable to retrieve Office'
            });
        }
        return res.status(200).json({
            "status": 200,
            "data": singleOffice,
        });
    }
}


export default AdminController;