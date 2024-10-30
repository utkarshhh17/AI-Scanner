import { motion } from "framer-motion";
export default function Register({loginInput, handleInputChange, handleRegister}){

    const slideRightIn = {
        initial: { x: 100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 100, opacity: 0 }
    };

    return(
        <motion.div variants={slideRightIn} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }} className="flex flex-col">
            <div className="italic mt-2">Enter your Name</div>
            <input type="text" name="name" value={loginInput.name} onChange={handleInputChange} 
            className="large:min-w-[30vw] small:min-w-[60vw] focus:outline-none p-1 border-[0.05px] border-[#737775] rounded-sm"></input>

            <div className="italic mt-2">Your Phone Number</div>
            <input type="text" name="phoneNumber" value={loginInput.phoneNumber} onChange={handleInputChange} 
            className="large:min-w-[30vw] small:min-w-[60vw] focus:outline-none p-1 border-[0.05px] border-[#737775] rounded-sm"></input>

            <div className="italic mt-2">Enter your City</div>
            <input type="text" name="city" value={loginInput.city} onChange={handleInputChange} 
            className="large:min-w-[30vw] small:min-w-[60vw] focus:outline-none p-1 border-[0.05px] border-[#737775] rounded-sm"></input>

            <label className="font-roboto small:text-sm">Select Language:</label>
            <select
            name="lang"
            value={loginInput.lang}
            onChange={handleInputChange}
            className="border p-2 small:text-xs rounded-md ml-2"
            >
                <option value="" disabled>
                    Select a language
                </option>
                <option value="en">English</option>
                <option value="hi">Hindi</option>
                <option value="kn">Kannada</option>
            </select>

            <button onClick={handleRegister} className="py-2 mt-5 bg-[#02A44F] text-white rounded-lg shadow-lg z-40">Register</button>                    

            
        </motion.div>
    )
}