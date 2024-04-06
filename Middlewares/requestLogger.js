const RequestLog =  require('../Models/RequestLog')
const { sendEmail } = require('../helpers/EmailSender')

const requestLogger = async (request, response, next) => {

 
 const requestStart = Date.now(); 

 let body = [];
 let requestErrorMessage = null;

 const getChunk = chunk => body.push(chunk);
 const assembleBody = () => {
   body = Buffer.concat(body).toString();
 };
 const getError = error => {
   requestErrorMessage = error.message;
 };

 request.on("data", getChunk);
 request.on("end", assembleBody);
 request.on("error", getError);

 

 const logClose = () => {
   removeHandlers();
   log(request, response, "Client aborted.");
 };

 const logError = error => {
   removeHandlers();
   log(request, response, error.message);
 };

 const logFinish = () => {
   removeHandlers();
   log(request, response, requestErrorMessage);
 };

 response.on("close", logClose);
 response.on("error", logError);
 response.on("finish", logFinish);

 const removeHandlers = () => {
   request.off("data",    getChunk);
   request.off("end",     assembleBody);
   request.off("error",   getError);
   response.off("close",  logClose);
   response.off("error",  logError);
   response.off("finish", logFinish);
 };

 process(request, response);


 const getUserAgent = (requestRawHeader) => {
  const userAgentIndex = requestRawHeader.indexOf("User-Agent");
  const userAgent = userAgentIndex !== -1 ? requestRawHeader[userAgentIndex + 1] : null;
  return userAgent;
 }

 const log = async (request, response, errorMessage) => {
 
    const { rawHeaders, httpVersion, method, socket, originalUrl} = request;
    const { remoteAddress, remoteFamily } = socket;
   
    const { statusCode, statusMessage } = response;
    const headers = response.getHeaders();
    const requestSource = getRequestSource( getUserAgent(rawHeaders) )
   

    const responseCode =  response.statusCode

     

    if (responseCode !== 200 && responseCode !== 201) {
         try{
             RequestLog.create({
               request_time:     Date.now(),
               request_method:   method,
               request_url:      originalUrl,
               request_data:     body,
               response_code:    statusCode,
               status_message:   statusMessage,
               response_content: errorMessage,
               request_source:   requestSource,
               processing_time : Date.now() - requestStart + " ms"
             })


            let emailBody  = `<p>Request Time:${Date.now()}</p>
                        <p>Request Method:   ${method}</p>
                        <p>Request URL:      ${originalUrl}</p>
                        <p>Response Code:    ${responseCode}</p>
                        <p>Request Data:     ${JSON.stringify(request.body)}</p>
                        <p>Status Message:   ${statusMessage}</p>
                        <p>Response Content: ${errorMessage}</p>
                        <p>Request Source:   ${requestSource}</p>
                        <p>Processing Time:  ${Date.now() - requestStart}</p>`

            await sendEmail("rasidevelopmentteam@gmail.com", `FAILED REQUEST: ${responseCode}`, emailBody, response); 
           
          }catch(error){
           if (error.name === 'ValidationError') {
             console.error('Validation error:', error.message);
           } else {
             throw error;
           }
          }
    }

 };
 

 next();

}

function getRequestSource(userAgent) {
 if (userAgent.includes('Thunder')) {
   return 'Thunder Client';
 } else if (userAgent.includes('PostmanRuntime')) {
   return 'Postman';
 } 
 return 'Web';
}

const process = (request, response) => {
 setTimeout(() => {
   response.end();
 }, 100);
};


module.exports = {requestLogger}