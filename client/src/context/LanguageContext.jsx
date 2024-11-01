import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { translations } from '../assets/LanguageData';

export const LanguageContext = createContext();


export const LanguageProvider = ({ children }) => {
    const [language, setLanguage] = useState('en'); // Default language
    const navigate = useNavigate();

    
    // Load the language from localStorage on app load
    useEffect(() => {
        const storedLanguage = sessionStorage.getItem('silo-fortune-gau-sampurna-ai-scanner-selected-language');
        if (storedLanguage) {
            setLanguage(storedLanguage);
        }
        else {
            navigate('/language'); // Redirect to the language selection page if no language is stored
        }
    }, [navigate]);
    
    const changeLanguage = (newLanguage) => {
      setLanguage(newLanguage);
      sessionStorage.setItem('silo-fortune-gau-sampurna-ai-scanner-selected-language', newLanguage);
    };

    console.log("Your language is set to: "+language)
  
    const t = (key) => translations[language][key] || key;
  
    return (
      <LanguageContext.Provider value={{ language, changeLanguage, t }}>
        {children}
      </LanguageContext.Provider>
    );
  };
  