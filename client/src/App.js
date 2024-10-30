// import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import HomePage from "./Pages/HomePage";
import UploadPage from "./Pages/UploadPage";


function App() {
  useEffect(() => {
    function adjustFontSizeForBrowser() {
      const userAgent = navigator.userAgent;
      const screenWidth = window.innerWidth;
      let fontSize;

      if (window.navigator.brave) {
        // Set font size for Brave
        fontSize = '17px';
      } else if (userAgent.includes('Chrome')) {
        if (screenWidth <= 641) {
          // Small screen, Chrome browser
         
          document.documentElement.style.fontSize = '16px';
        } else {
          // Larger screen, Chrome browser
          document.documentElement.style.fontSize = '13px';
        }
      } else {
        if (screenWidth <= 641) {
          // Small screen, Chrome browser
         
          document.documentElement.style.fontSize = '16px';
        } else {
          // Larger screen, Chrome browser
          document.documentElement.style.fontSize = '13px';
        }
      }

      document.documentElement.style.fontSize = fontSize;
    }

    adjustFontSizeForBrowser();
  }, []);
  
  return (
      <Routes>
        <Route path="/" element={<HomePage />} >
        </Route>
        <Route path="/upload" element={<UploadPage />} >
        </Route>

     
      </Routes>
 
  );
}

export default App;