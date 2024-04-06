import {findUsers, findUser, addUser } from '../Services/UserService.js'
import { request, response } from 'express'


const users = async(request, response) => {
 try{
     const users = await findUsers();
     response.status(200).json({users})
 } catch(error){
     console.log(error.message)
     response.status(500).json(error.message)
    }
}

const user = async(request, response) => {
 if (!request?.params?.userId) return response.status(400).json({ message: "user id is required." });

 try{
     let userId = request.params.userId;
     const user = await findUser(userId);
     response.status(200).json({user})
 } catch(error){
     console.log(error.message)
     response.status(500).json(error.message)
    }
}

const createUser = async(request, response) => {
    try{
        const user = await addUser(request);
        response.status(201).json({user})
    } catch(error){
        console.log(error.message)
        response.status(500).json(error.message)
       }
}



export  {users, user, createUser }