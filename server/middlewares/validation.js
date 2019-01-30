import validate from 'node-input-validator';
class Validation {

    static partyValidator(req, res, next) {

        let validator = new validate(req.body, {
            party_id: 'required|integer',
            name: 'required|minLength:5',
            hqAddress: 'required|string|minLength:10',
            logoUrl: 'required|string'
        });

        validator.check().then(function (matched) {
            if (!matched) {
                return res.status(400).json({
                    "status": 400,
                    "error": 'Unable to process your request, make sure the fields are entered correctly'
                });
            }
            next();
        });

    }
}

export default Validation;
