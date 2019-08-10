import jwt from 'jsonwebtoken';
import config from '../config/config';

class AuthController {
  /**
     * Authentication user
     * @param {Object} req The request object
     * @param {Object} res The response object
     * @param {function} next The callback to the next program handler
     * @return {Object} res The response object
     */
  static authUser(req, res) {
    if (!req.body || !req.body.username || !req.body.password) {
      return res.status(400).json({
        success: false,
        message: 'Username and password are required.',
      });
    }
    const userFilter = config.users.filter(item => (item.name === req.body.username
      && item.password === req.body.password));
    if (!userFilter.length) {
      return res.status(401).json({
        success: false,
        message: 'Incorrect username or password',
      });
    }
    const token = jwt.sign({ username: userFilter[0].name },
      config.jwtAuth.secret, {
        expiresIn: `${config.jwtAuth.expiresInMinutes}m`,
      });
    return res.json({
      success: true,
      token,
    });
  }

  /**
   * Check token middleware
   * @param {Object} req The request object
   * @param {Object} res The response object
   * @param {function} next The callback to the next program handler
   * @return {Object} res The response object
   */
  static checkToken(req, res, next) {
    let token = req.headers['x-access-token'] || req.headers.authorization; // Express headers are auto converted to lowercase
    if (token && token.indexOf('Bearer ') === 0) {
      // Remove Bearer from string
      token = token.slice(7, token.length);
    }
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'No token provided.',
      });
    }

    jwt.verify(token, config.jwtAuth.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          message: 'Token is not valid',
        });
      }
      const { username } = decoded;
      if (!config.users.some(item => item.name === username)) {
        return res.status(401).json({
          success: false,
          message: 'User does not exist',
        });
      }
      req.username = username;
      return next();
    });
    return true;
  }
}

export default AuthController;
