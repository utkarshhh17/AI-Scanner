// LanguagePage.js
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../context/LanguageContext";

function LanguagePage() {
    const { changeLanguage } = useContext(LanguageContext);

    const navigate = useNavigate();

    const handleLanguageSelect = (selectedLanguage) => {
        // Change language in context and store in localStorage
        changeLanguage(selectedLanguage);
        
        // Navigate to the main page (or home page)
        navigate('/');
      };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="bg-white rounded-lg p-8 shadow-lg w-80 text-center">
            <h2 className="text-lg font-bold mb-4">Select Your Language</h2>
            
            <button className="w-full bg-[#0B3D23] text-white py-2 px-4 rounded mb-2" onClick={() => handleLanguageSelect("en")}>
                English
            </button>
            <button className="w-full bg-[#0B3D23] text-white py-2 px-4 rounded mb-2" onClick={() => handleLanguageSelect("hi")}>
                हिंदी
            </button>
            <button className="w-full bg-[#0B3D23] text-white py-2 px-4 rounded" onClick={() => handleLanguageSelect("kn")}>
                ಕನ್ನಡ
            </button>
        </div>
        </div>
    );
}

export default LanguagePage;
