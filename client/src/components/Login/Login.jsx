import { useState, useContext } from "react";
import {motion, AnimatePresence} from "framer-motion";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { LanguageContext } from "../../context/LanguageContext";
import Otp from "./Otp";
import Register from "./Register";
export default function Login({loginRef}){

    const {user, dispatch}=useContext(AuthContext)
    const { t, changeLanguage } = useContext(LanguageContext);

    const [loginInput, setLoginInput]=useState({name:"",phoneNumber:"", city:"", lang:""})
    const [loginStage, setLoginStage]=useState("Login")
    const [otp, setOtp]=useState("")
    
    const [error, setError]=useState("")

    const handleInputChange = (e) => {
        const { name, value } = e.target;

      
            setLoginInput(prevState => ({
                ...prevState,
                [name]: value
            }));
        
    };

    const handleLogin=async ()=>{
        const dataToSend="91"+loginInput.phoneNumber 
        console.log("Phone Number is: " +dataToSend)
        try {
            const response = await axios.post("http://localhost:8081/auth/send-otp", dataToSend, {
                headers: {
                    'Content-Type': 'text/plain' // Send as plain text
                }
            });

            if (response.status === 200) {
                console.log("positive")
                setLoginStage("OTP Verification"); // Move to OTP verification step
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError("Looks like you are not registered. Please Register.");
                setLoginStage("Register");
            } else {
                console.error("An error occurred:", error);
            }
        }

    };

    const handleRegister=async()=>{

        try {
            const dataToSend = {
                ...loginInput, // Spread the existing properties
                phoneNumber: "91"+loginInput.phoneNumber, // Modify the phone number with country code '91'
            };

           
            const response = await axios.post("http://localhost:8081/auth/register", dataToSend);

            if (response.status === 201) {
                // console.log(response.data)
               
                setLoginStage("OTP Verification"); // Move to OTP verification step
            }
        } catch (error) { 
            console.error("An error occurred:", error);
            
        }
    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value)
    };


    const otpVerification=async ()=>{

        const dataToSend={otp:otp, phoneNumber:"91"+loginInput.phoneNumber}
        console.log(dataToSend);
        try {
            const response = await axios.post("http://localhost:8081/auth/verify-otp", dataToSend);

            if (response.status === 201) {
                setLoginInput({name:"", city:"",phoneNumber:"", lang:""})
                console.log(response.data)
                localStorage.setItem('ai-scanner-user', JSON.stringify(response.data))                       
                dispatch({type: 'LOGIN', payload: response.data})
         

                
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    }

    const slideLeftOut = {
        initial: { x: 10, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -100, opacity: 0 }
    };

   

    return(
    <div ref={loginRef} className="flex flex-col items-center bg-[#d1f4e2] large:min-w-[45vw] small:min-w-[80vw] font-roboto text-lg rounded-lg small:text-sm p-10 z-20">
        
            <div className="text-3xl small:text-xl font-black"> {t('Login')}</div>
            <div>{t('Login to enjoy all the services')}</div>
            {/* <div> without any ads for free!</div> */}
            {error && 
                <div className="text-red-500 mt-2">{error}</div>
            }
            <AnimatePresence mode="wait">

                {loginStage==='Login' && 
                    <motion.div key="name-phone-form" variants={slideLeftOut} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} className="flex flex-col">

                        <div className="italic mt-2">{t('Enter your Phone Number')}</div>
                        <input type="text" name="phoneNumber" value={loginInput.phoneNumber} onChange={handleInputChange}
                        className="large:min-w-[30vw] small:min-w-[60vw] focus:outline-none p-1 border-[0.05px] border-[#737775] rounded-sm"></input>
                        
                        <button onClick={handleLogin} className="py-2 mt-5 bg-[#0B3D23] text-white rounded-lg shadow-lg z-40">{t('Login')}</button>                    
                    </motion.div>
                }

                {loginStage==='OTP Verification' && 
                    <Otp handleOtpChange={handleOtpChange} otp={otp} handleVerification={otpVerification}/>
                }

                {loginStage==='Register' &&
                    <Register loginInput={loginInput} handleInputChange={handleInputChange} handleRegister={handleRegister} />
                }

                        
            </AnimatePresence>

    </div>
    )
}