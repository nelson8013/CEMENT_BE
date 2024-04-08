import {getUserByEmail} from '../Repositories/UserRepository.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import InvalidCredentialsException from '../Exceptions/InvalidCredentialsException.js'
import UserNotFoundException from '../Exceptions/UserNotFoundException.js'


const login = async (request, response) => {
   try {
    const { email, password } = request.body;

    const user = await getUserByEmail(email)

    if (!user) throw new UserNotFoundException(`The user with: ${email} does not exist.`)

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) throw new InvalidCredentialsException(`Invalid credentials provided.`)

    const token = jwt.sign({ 
       id:        user._id, 
       first_name:user.first_name, 
       last_name: user.last_name, 
       email:     user.email, 
       phone:     user.phone 
      }, 
      process.env.ACCESS_TOKEN_SECRET, 
      { expiresIn: '1h' })

      const refreshToken = process.env.REFRESH_TOKEN_SECRET

      user.isLoggedIn   = true

      await user.save();

      request.session.accessToken = token;
    
      request.session.save()

      return { token: token, message: "Logged In successfully" };

  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal server error' });
  }
}

const logout = async (request) => {
 try {
    const { email } = request.body;

    const user = await getUserByEmail(email);

    if (!user) throw new UserNotFoundException(`The user with email: ${email} does not exist.`);

    if (request.session) {
     request.session.destroy();
    }

   user.isLoggedIn = false;
   await user.save();


   return { message: 'Logged out successfully' };
 } catch (error) {
   console.error(error);
   throw new Error('Failed to logout');
 }
};

export { logout, login };


