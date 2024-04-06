import { getUser, getAllUsers, createUser } from '../Repositories/UserRepository.js'
import NotFoundException from '../Exceptions/NotFoundException.js'
import RequiredFieldsException from '../Exceptions/RequiredFieldsException.js'
import { request, response } from 'express'
import bcrypt from 'bcryptjs'


const findUsers = async () => { 
    let users = await getAllUsers();
    if(!users) throw new NotFoundException('There\'re no users available.');
    return { data: products, message:"Users retrieved successfully"}
}
   

const findUser = async (userId) => { 
 let user = await getUser(userId);
 if(!user) throw new NotFoundException(`A user with the Id : ${userId} does not exist.`);
 return { data: user, message: "User retrieved successfully" };
}

const addUser = async(request) => {

    const { first_name, last_name, email, phone, password, role } = request.body;
    
    if(!first_name || !last_name || !email || !phone || !password || !role){
        throw new RequiredFieldsException(`All fields are required.`);
    }

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = {
        first_name,
        last_name,
        email,
        phone,
        password : hashedPassword,
        role,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    try{
        let user = await createUser(newUser);
        return { data: user, message: "User added successfully" };
    } catch(error) {
        console.log(error.message);
    }
}


export {findUsers, findUser, addUser}