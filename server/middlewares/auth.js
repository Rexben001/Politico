import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

/**
 *
 *
 * @class Auth
 */
class Auth {
  /**
   *
   *
   * @static
   * @param {*} req
   * @param {*} res
   * @param {*} next
   * @returns
   * @memberof Auth
   */
  static verifyUser(req, res, next) {
    // Read from token.txt or added manually
    const token = req.headers['authorization'];
    if (!token || token === undefined) {
      return res.status(403).json({
        status: 403,
        error: 'No token provided.'
      });
    }
    jwt.verify(token, process.env.SECRETKEY, (err, decode) => {
      if (err) {
        return res.status(500).json({ status: 500, error: 'Failed to authenticate token.' });
      }
      req.user = decode.username;
      req.admin = decode.admin;
      req.id = decode.id;
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
   * @returns
   * @memberof Auth
   */
  static verifyResetToken(req, res, next) {
    const { token } = req.params;
    if (!token || token === undefined) {
      return res.status(403).json({
        status: 403,
        error: 'No token provided.'
      });
    }
    jwt.verify(token, process.env.SECRETKEY, (err, decode) => {
      if (err) {
        return res.status(500).json({ status: 500, error: 'Failed to authenticate token.' });
      }
      req.id = decode.id;
      req.token = token;
      next();
    });
  }
}

export default Auth;
