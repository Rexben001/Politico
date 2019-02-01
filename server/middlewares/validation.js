import validate from 'node-input-validator';
class Validation {

    static partyValidator(req, res, next) {

        let validator = new validate(req.body, {
            party_id: 'required|integer',
            name: 'required|string|minLength:5',
            hqAddress: 'required|string|minLength:10',
            logoUrl: 'required|string'
        });

        validator.check().then(function (matched) {
            if (!matched) {
                return res.status(400).json({
                    "status": 400,
                    "error": validator.errors
                });
            }
            next();
        });

    }


    static editPartyValidator(req, res, next) {

        let validator = new validate(req.body, {
            name: 'required|minLength:5',
            hqAddress: 'required|string|minLength:10',
            logoUrl: 'required|string'
        });

        validator.check().then(function (matched) {
            if (!matched) {
                return res.status(400).json({
                    "status": 400,
                    "error": validator.errors
                });
            }
            next();
        });
    }

    static officeValidator(req, res, next) {

        let validator = new validate(req.body, {
            office_id: 'required|integer',
            type: 'required|string',
            name: 'required|string',
            region: 'required|string'
        });

        validator.check().then(function (matched) {
            if (!matched) {
                return res.status(400).json({
                    "status": 400,
                    "error": validator.errors
                });
            }
            next();
        });

    }

}

export default Validation;
