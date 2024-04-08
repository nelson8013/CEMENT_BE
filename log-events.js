import {format} from 'date-fns'
import {uuid}   from 'uuid'

import  {fs}    from 'fs'
import path     from 'path'
const fsPromises = fs.promises


exports.logEvents = async (message, logName) => {
  const dateTime = `${format(new Date(), 'yyyy/MM/dd \t HH:mm:ss')}`
  const logItem = `${dateTime} \t ${uuid} \t ${message} \n`
  console.log(logItem);
  
  try{

    if(!fs.existsSync(path.join(__dirname, '.', 'logs'))){
        fsPromises.mkdir( path.join(__dirname, '.', 'logs'))
    }

    await fsPromises.appendFile(path.join(__dirname, '.', 'logs', logName), logItem)
  }catch(error){
    console.error(error)
  }
}

