import { useEffect, useState, useRef, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link, redirect } from "react-router-dom";
import Nav from "../Nav/Nav";
import Login from "../Login/Login";
import { LanguageContext } from '../../context/LanguageContext';


export default function Home(){
    const {user, dispatch}=useContext(AuthContext)

    const { t, changeLanguage } = useContext(LanguageContext);

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
            <div className={`h-full w-full  flex flex-col justify-center items-center mt-20`}>
                
                <div className={`flex flex-col relative large:max-w-[50vw] small:max-w-[80vw]`}>
                    
                    <div className="font-roboto text-[#02A44F] font-bold text-8xl small:text-3xl">
                        {t('AI Scanner')}
                    </div>
                    
                   
                    <div className="flex flex-col">

                        <div className="font-roboto text-xl small:text-md" style={{ whiteSpace: "pre-line" }}>
                        {t('Landing Page Message')}
                        </div>

                        <div className="mt-5">   
                            <Link to="/upload"><button className="bg-[#0B3D23] text-xl font-roboto p-4 small:p-2 text-white rounded-md shadow-xl hover:scale-105 focus:outline-none">{t('Scan Now')}</button></Link>

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