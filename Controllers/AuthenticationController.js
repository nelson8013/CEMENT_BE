import { logout, login } from '../Services/AuthenticationService.js';

const handleLogin = async (request, response) => {
  try {
    const { token } = await login(request);
    response.status(200).json({ success: true, token });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ success: false, message: error.message });
  }
};

const handleLogout = async (request, response) => {
  try {
    await logout(request);
    response.status(200).json({ success: true, message: 'Logged out successfully' });
  } catch (error) {
    console.error(error.message);
    response.status(500).json({ success: false, message: error.message });
  }
};

export { handleLogin, handleLogout };
