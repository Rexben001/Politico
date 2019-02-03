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

  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @memberof Validation
   */
  static officeValidator(req, res, next) {
    const validator = new validate(req.body, {
      type: 'required|string',
      name: 'required|string',
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
  static userValidator(req, res, next) {
    const validator = new validate(req.body, {
      firstname: 'required|string',
      lastname: 'required|string',
      othernames: 'required|string',
      username: 'required|string',
      email: 'required|email',
      phonenumber: 'required|string',
      password: 'required|string',
      passportUrl: 'required|string'
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
  static loginValidator(req, res, next) {
    const validator = new validate(req.body, {
      email: 'required|string',
      password: 'required|string'
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
  static resetValidator(req, res, next) {
    const validator = new validate(req.body, {
      email: 'required|string',
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
