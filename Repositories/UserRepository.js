import User from '../Models/User.js'


 
const getAllUsers = async () => {
   try{
     return await User.find()
    } catch(error) {
     console.log(error.message)
   }
}

/**
 * Get a product by its ID.
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<object|null>} A promise that resolves to the product object if found, or null if not found.
*/
const getUser = async (userId) => {
   try{
    return await User.findOne({_id : userId})
  } catch(error) {
    console.log(error.message)
  }
}

const createUser = async( newUser) => {
    try{
        return await User.create(newUser);
    } catch(error) {
        console.log(error.message);
    }
}

export {getUser, getAllUsers, createUser}