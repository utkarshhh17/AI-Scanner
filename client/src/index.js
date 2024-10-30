import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Router>
    <LanguageProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
      </LanguageProvider>
    </Router>
  </React.StrictMode>
);