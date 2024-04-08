import User from '../Models/User.js'

 
/**
 * Retrieve all the users
 * @returns {Promise<object>} A promise that resolves to the user object.
*/
const getAllUsers = async () => {
   try{
     return await User.find()
    } catch(error) {
     console.log(error.message)
   }
}

/**
 * Get a user by its ID.
 * @param {string} userId - The ID of the user to retrieve.
 * @returns {Promise<object|null>} A promise that resolves to the user object if found, or null if not found.
*/
const getUser = async (userId) => {
   try{
    return await User.findOne({_id : userId})
  } catch(error) {
    console.log(error.message)
  }
}

/**
 * Get a user by their email address.
 * @param {string} email - The email of the user to retrieve.
 * @returns {Promise<object|null>} A promise that resolves to the user object if found, or null if not found.
*/
const getUserByEmail = async (email) => {
  try{
   return await User.findOne({email : email})
 } catch(error) {
   console.log(error.message)
 }
}

/**
 * Get a user by their phone number.
 * @param {string} phone - The phone number of the user to retrieve.
 * @returns {Promise<object|null>} A promise that resolves to the user object if found, or null if not found.
*/
const getUserByPhone = async (phone) => {
  try{
   return await User.findOne({phone : phone})
 } catch(error) {
   console.log(error.message)
 }
}

/**
 * Create a new user.
 * @param {object} newUser - The new user object to save.
 * @returns {Promise<object>} A promise that resolves to the new user object.
*/
const createUser = async( newUser) => {
    try{
        return await User.create(newUser);
    } catch(error) {
        console.log(error.message);
    }
}

export {getUser, getAllUsers, createUser, getUserByEmail, getUserByPhone}