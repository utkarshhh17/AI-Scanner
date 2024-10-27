// import { AnimatePresence } from "framer-motion";
import { Route, Routes } from "react-router-dom";


import HomePage from "./Pages/HomePage";
// import LoginPage from "./components/Login Page/Login";
// import SignupPage from "./Pages/SignupPage";


function App() {
  
  return (
      <Routes>
        <Route path="/" element={<HomePage />} >
        </Route>
        {/* <Route path="/login" element={<LoginPage />} >
        </Route> */}

     
      </Routes>
 
  );
}

export default App;