import jwt from 'jsonwebtoken';

const verifyJWT = (request, response, next) => {
  const token = request.headers['x-access-token'] || request.headers['authorization'];

  if (!token) {
    return response.status(401).json({ message: 'Your access token is missing. Please login!' });
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    request.user = decoded;
    next();
  } catch (error) {
    return response.status(401).json({ message: 'Your access token is invalid or has expired. Please login again!' });
  }
};

export default verifyJWT;
