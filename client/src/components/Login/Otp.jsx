import { motion } from "framer-motion"
export default function Otp({otp, handleOtpChange}){

    const slideRightIn = {
        initial: { x: 100, opacity: 0 },
        animate: { x: 0, opacity: 1 },
        exit: { x: 100, opacity: 0 }
    };

    return(
        <motion.div variants={slideRightIn} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }} className="flex flex-col">
            <div className="italic mt-2">Enter your Name</div>
            <input type="text" name="otp" value={otp} onChange={handleOtpChange} 
            className="large:min-w-[30vw] small:min-w-[60vw] focus:outline-none p-1 border-[0.05px] border-[#737775] rounded-sm"></input>
        </motion.div>
    )

}