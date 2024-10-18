import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginWithGoogle } from '../services/authService';

const LoginPage = () => {
  const { currentUser } = useAuth(); // Get current user
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      // If the user is already logged in, redirect to the dashboard
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  const handleLogin = async () => {
    try {
      await loginWithGoogle();
      navigate('/dashboard'); // Navigate to dashboard after login
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div>
      <h1>Login to Calander</h1>
      <button onClick={handleLogin}>Login with Google</button>
    </div>
  );
};

export default LoginPage;
