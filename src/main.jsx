import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <BrowserRouter>
    <AuthProvider> {/* Ensure AuthProvider wraps the entire app */}
      <App />
    </AuthProvider>
  </BrowserRouter>
);
