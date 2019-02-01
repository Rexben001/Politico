import validate from 'node-input-validator';
/**
 *
 * @class Validation
 */
class Validation {
    /**
           *
           *
           * @static
           * @param {*} req
           * @param {*} res
           * @param {*} next
           * @memberof Validation
           */
    static partyValidator(req, res, next) {
        const validator = new validate(req.body, {
            party_id: 'required|integer',
            name: 'required|string|minLength:5',
            hqAddress: 'required|string|minLength:10',
            logoUrl: 'required|string'
        });

        validator.check().then((matched) => {
            if (!matched) {
                return res.status(400).json({
                    status: 400,
                    error: validator.errors
                });
            }
            next();
        });
    }

    /**
           *
           *
           * @static
           * @param {*} req
           * @param {*} res
           * @param {*} next
           * @memberof Validation
           */
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
                    error: validator.errors
                });
            }
            next();
        });
    }
}

export default Validation;
