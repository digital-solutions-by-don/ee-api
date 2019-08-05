const moment = require('moment');
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'testing';

class AuthenticationStore {
  static async authenticate(req, res, next) {
    const payload = await AuthenticationStore.consumeToken(req);
    console.log(payload);
    if (payload && payload.status && payload.status !== 200) {
      return res.status(payload.status)
                .json({ message: payload.message });
    }
    req.user = payload.id;
    next();
  }

  static async isAdmin(req, res, next) {
    if (!req.user || req.role !== 'ADMIN') {
      return res.status(401)
                .json({ message: 'Unauthorized' });
    }
    next();
  }

  /** Create a JWT
   * @param user
   */

  static signJwt(user) {
    let payload = {
      id: user.id,
      role: user.role,
      iat: moment()
          .unix(),
      exp: moment()
          .add(1, 'hour')
          .unix(),
    };
    return jwt.sign(payload, secret);
  }

  static decodeJwt(token) {
    let payload = null;
    let result = {};
    try {
      payload = jwt.decode(token, secret);
    } catch (err) {
      console.log(err);
    }
    return payload;
  }

  static bearer(token) {
    return this.decodeJwt(token);
  }

  static async consumeToken(req) {
    let result = {};
    if (req.headers && !req.headers.authorization) {
      result.status = 401;
      result.message = 'Please make sure your request has an authorization header.';
      return result;
    }
    let token = req.headers.authorization.split(' ')[1];
    let type = req.headers.authorization.split(' ')[0];
    let payload;
    if (type === 'Bearer') {
      payload = this.bearer(token);
    } else {
      result.status = 401;
      result.message = 'Invalid token type.  Must be type Bearer';
      return result;
    }
    if (!payload || !payload.id) {
      result.status = 401;
      result.message = 'Authorization Denied.';
      return result;
    }
    if (payload.exp <= moment()
        .unix()) {
      result.status = 401;
      result.message = 'Token has expired';
      return result;
    }
    return payload;
  }
}

module.exports = AuthenticationStore;