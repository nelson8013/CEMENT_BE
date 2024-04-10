import jwt from 'jsonwebtoken';

const verifyJWT = (request, response, next) => {
  
  const authorizationHeader  = request.headers['x-access-token'] || request.headers['authorization'];

  if (!authorizationHeader) return response.status(401).json({ message: 'Your access token is missing. Please login!' });
  

    // Split the header value by space to separate "Bearer" from the token
    const [bearer, token] = authorizationHeader.split(' ');


    if (bearer !== 'Bearer' || !token) {
      return response.status(401).json({ message: 'Invalid authorization header format' });
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
