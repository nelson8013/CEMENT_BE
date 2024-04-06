import allowedOrigins from '../Config/allowedOrigin.js'

const credentials = (request, response, next) => {
  const origin = request.headers.origin;
  if(allowedOrigins.includes(origin)){
    response.header('Access-Control-Allow-Credentials', true)
  }
  next();
}

export default credentials