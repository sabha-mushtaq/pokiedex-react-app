import { StrictMode } from 'react'; // StrictMode helps to identify potential problems in the app during development.
import { createRoot } from 'react-dom/client'; // createRoot is used to create a React root for the app, this is the new way to render React apps starting from React 18.
import './index.css'; // Import global CSS styles
import App from './App.jsx'; // Import the main App component
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing

// Render the React application
createRoot(document.getElementById('root')).render(
  <BrowserRouter> {/* BrowserRouter is a wrapper to enable React Router for navigation */}
    <StrictMode> {/* StrictMode helps to highlight potential problems in the app */}
      <App /> {/* App component is the root of your app */}
    </StrictMode>
  </BrowserRouter>
);

