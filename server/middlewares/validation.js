import validate from 'node-input-validator';
<<<<<<< HEAD

class Validation {
    static partyValidator(req, res, next) {
        const validator = new validate(req.body, {
            party_id: 'required|integer',
            name: 'required|minLength:5',
            hqAddress: 'required|string|minLength:10',
            logoUrl: 'required|string'
        });

        validator.check().then((matched) => {
            if (!matched) {
                return res.status(400).json({
                    status: 400,
                    error: 'Unable to process your request, make sure the fields are entered correctly'
=======
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
>>>>>>> develop
                });
            }
            next();
        });
    }


    static editPartyValidator(req, res, next) {
        const validator = new validate(req.body, {
            name: 'required|minLength:5',
            hqAddress: 'required|string|minLength:10',
            logoUrl: 'required|string'
        });

        validator.check().then((matched) => {
            if (!matched) {
                return res.status(400).json({
                    status: 400,
                    error: 'Unable to process your request, make sure the fields are entered correctly'
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
            next();
        });
    }
}

export default Validation;
