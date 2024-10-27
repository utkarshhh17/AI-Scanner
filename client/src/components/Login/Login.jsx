import { useState } from "react";
import {motion, AnimatePresence} from "framer-motion";
import axios from "axios";
import Otp from "./Otp";
import Register from "./Register";
export default function Login(){

    const [loginInput, setLoginInput]=useState({"Name":"","Phone Number":"", "Language":""})
    const [loginStage, setLoginStage]=useState("login")
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
        const dataToSend={phoneNumber:loginInput["Phone Number"] }
        try {
            const response = await axios.post("http://localhost:8000/api/check-user", dataToSend);

            if (response.status === 200) {
                setLoginStage("otp"); // Move to OTP verification step
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError("Looks like you are not registered. Please Register.");
                setLoginStage("register");
            } else {
                console.error("An error occurred:", error);
            }
        }

    };

    const handleOtpChange = (e) => {
        setOtp(e.target.value)
    };

    const otpVerification=()=>{

    }

    const slideLeftOut = {
        initial: { x: 10, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: -100, opacity: 0 }
    };

   

    return(
    <div className="flex flex-col items-center bg-[#d1f4e2] large:min-w-[45vw] small:min-w-[80vw] font-roboto text-lg rounded-lg small:text-sm p-10 z-20">
            <div className="text-3xl small:text-xl font-black"> Login</div>
            <div>Login to enjoy all the services</div>
            {/* <div> without any ads for free!</div> */}
            {error && 
                <div className="text-red-500 mt-2">{error}</div>
            }
            <AnimatePresence mode="wait">

                {loginStage==='login' && 
                    <motion.div key="name-phone-form" variants={slideLeftOut} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }} className="flex flex-col">

                        <div className="italic mt-2">Enter your Phone Number</div>
                        <input type="text" name="Phone Number" value={loginInput["Phone Number"]} onChange={handleInputChange}
                        className="large:min-w-[30vw] small:min-w-[60vw] focus:outline-none p-1 border-[0.05px] border-[#737775] rounded-sm"></input>
                        
                        <button onClick={handleLogin} className="py-2 mt-5 bg-[#02A44F] text-white rounded-lg shadow-lg z-40">Login</button>                    
                    </motion.div>
                }

                {loginStage==='otp' && 
                    <Otp handleOtpChange={handleOtpChange} otp={otp}/>
                }

                {loginStage==='register' &&
                    <Register />
                }

                        
            </AnimatePresence>

    </div>
    )
}