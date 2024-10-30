import { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, Link, redirect } from "react-router-dom";
import FileUploadSection from "../Upload Page/FileUploadSection";
import Nav from "../Nav/Nav";
import Login from "../Login/Login";
import Loader from "../../assets/Loader";

export default function Home(){
    const {user, dispatch}=useAuthContext()


    const loginRef = useRef(null); // Create a ref for the login dialog

    const handleClickOutside = (event) => {
        // Check if the clicked element is outside the login dialog
        if (loginRef.current && !loginRef.current.contains(event.target)) {
            setShowLogin(false); // Close the dialog
        }
    };

    useEffect(() => {
        // Attach the event listener
        document.addEventListener('mousedown', handleClickOutside);
        
        // Cleanup the event listener on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    
    const navigate=useNavigate()
    
   
    const [showLogin, setShowLogin]=useState(false)
    const [loading, setLoading]=useState(false)
   
    // const [uploadReady, setUploadReady]=useState(false)
    return(
        <div className="flex grow max-w-screen flex-col overflow-x-hidden bg-repeat" style={{ backgroundImage: `url('/clouds.png')` }}>

            <Nav setShowLogin={setShowLogin} />
            <div className={`h-full w-full  flex flex-col justify-center items-center small:justify-start mt-20`}>
                
                <div className={`flex flex-col relative large:max-w-[70vw] small:max-w-[80vw]`}>
                    
                    <div className="font-roboto text-[#02A44F] font-bold text-8xl small:text-3xl">
                        AI Scanner
                    </div>
                    
                   
                    <div className="flex flex-col">

                        <div className="font-roboto text-lg small:text-sm" style={{ whiteSpace: "pre-line" }}>
                        Cristiano Ronaldo dos Santos Aveiro GOIH ComM (Portuguese pronunciation: ; born 5 February 1985) {"\n"}
                        is a Portuguese professional footballer who plays as a forward for and captains both Saudi Pro League club {"\n"}
                        Al Nassr and the Portugal national team. Widely regarded as one of the greatest players of all time, Ronaldo {"\n"}
                        set numerous records for individual accolades won throughout his professional footballing career, such as five {"\n"}
                        Ballon d'Or awards, a record three UEFA Men's Player of the Year Awards, four European Golden Shoes, and was {"\n"}
                        named five times the world's best player by FIFA,[note 3] the most by a European player.{"\n"}
                        </div>

                        <div className="mt-5">   
                            <Link to="/upload"><button className="bg-[#02A44F] text-xl font-roboto p-4 small:p-2 text-white rounded-md shadow-xl hover:scale-105 focus:outline-none">Scan Now</button></Link>

                        </div>
                    </div>

                    {showLogin && 
                    
                    <div className="absolute h-full w-full flex justify-center items-center">
                        <Login setShowLogin={setShowLogin} loginRef={loginRef}/>
                    </div>
                    }
                   
                </div>
            
            </div>

        </div>
    )
}