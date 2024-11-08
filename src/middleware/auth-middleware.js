const jwt = require('jsonwebtoken');
const Response = require('../utils/response');
const { JWT_SECRET } = process.env;


const auth = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return Response.unauthorized(res,'No token, authorization denied');

  const bearerToken = token.split(' ')[1];
  if (!bearerToken) return Response.unauthorized(res,'No token, authorization denied');

  try {
    const decoded = jwt.verify(bearerToken, JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (e) {
    console.error(e);
    return Response.badRequest(res,'Invalid token');
   
  }
};

module.exports = auth;
