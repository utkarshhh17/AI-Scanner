import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LanguageContext } from "../../context/LanguageContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import MenuIcon from "../../assets/MenuIcon";

import SearchIcon from "../../assets/SearchIcon";
import CartIcon from "../../assets/CartIcon";
import UserIcon from "../../assets/UserIcon";
import AboutUsIcon from "../../assets/AboutUsIcon";

export default function Nav({setShowLogin}){

    const {user, dispatch}=useContext(AuthContext)
    const { t, changeLanguage } = useContext(LanguageContext);


    const [showMenu, setShowMenu]=useState(false)
    const [showUserOptions, setShowUserOptions]=useState(false)

    const toggleUser=()=>{
        setShowUserOptions(prevState=>!prevState)
    }

    const handleSignIn=()=>{
        setShowUserOptions(false);
        setShowLogin(true);
    }

    const handleLogout=()=>{
        localStorage.removeItem('ai-scanner-user');
        dispatch({type:'LOGOUT'});

    }
    const handleShowMenu=()=>{
        console.log(1)
        setShowMenu(prevState=>!prevState)
    }

    const location=useLocation();

    const navItems = [
        { name: t('Home'), path: "/" },
        { name: t('Dairy Fortune'), path: "/dairy-fortune" },
        { name: t('About Us'), path: "/about" },
        { name: t('Blogs'), path: "/blogs" },
        { name: t('Contact Us'), path: "/contact" },
    ];


    return(
        <div className="flex justify-between w-full">

           <Link to="/"> <img src='./logo.png' className="mt-2 ml-2 h-20 small:h-[4rem]"></img></Link>

            <div className="small:hidden mid:hidden h-10 flex mt-7 ml-[25vw] font-roboto text-lg">
                {navItems.map((item, index) => (
                
                    <Link 
                        to={item.path} 
                        key={index} 
                        className={`ml-20 cursor-pointer ${
                            location.pathname === item.path ? 'border-b-4 border-[#02A44F]' : ''
                        }`}
                    >
                        {item.name}
                    </Link>
                ))}

            </div>

            <div className="small:hidden mid:hidden h-10 flex mt-7 mr-10 font-roboto text-lg">
                <div className="cursor-pointer"><SearchIcon height="2.5rem" width="2.5rem"/></div>
                <div className="ml-10 cursor-pointer"><CartIcon height="2.5rem" width="2.5rem" /></div>
                
                <div className="flex flex-col">
                    <button onClick={toggleUser} className="ml-10 cursor-pointer"><UserIcon height="2.5rem" width="2.5rem" /></button>
                    {showUserOptions && !user && 
                            <div onClick={handleSignIn} className="cursor-pointer absolute ml-5 bg-gray-200 border-[1px] border-gray-400 p-2 top-20 ">
                                {t('Login')}
                            </div>  
                    }
                    {showUserOptions && user && 
                            <div onClick={handleLogout} className="cursor-pointer absolute ml-5 bg-gray-200 border-[1px] border-gray-400 p-2 top-20 ">
                                Log Out
                            </div>  
                    }
               
                </div>

            </div>

            <div className="large:hidden absolute top-8 right-4 " onClick={handleShowMenu}>
                <MenuIcon/>
            </div>
            {showMenu && (
                    <div className="fixed w-[40vw] h-full right-0 flex flex-col bg-[#c1efd7] opacity-100 z-50 font-roboto">
                        <div className="bg-[#02A44F] p-2 text-white flex">
                            <div>User</div>
                            <div className="absolute right-2" onClick={handleShowMenu}>X</div>
                        </div>
                        <div className="flex flex-col w-full p-2">
                            <div className="border-b-[0.2px] border-black py-2">Dairy Fortune</div>
                            <div className="flex justify-start items-center border-b-[0.2px] border-black py-2">
                                <AboutUsIcon height="25" width="25" />
                                <div className="ml-2">{t('About Us')}</div>
                            </div>
                            <div className="border-b-[0.2px] border-black py-2">Blogs</div>
                            {user && 
                                <div onClick={()=>{if(user){handleLogout();}}} className="flex justify-start items-center border-b-[0.2px] border-black py-2">
                                    <UserIcon height="25" width="25" />
                                    <div className="ml-2">Account</div>
                                </div>
                            }
                            <div className="flex justify-start items-center border-b-[0.2px] border-black py-2">
                                <CartIcon height="25" width="25" />
                                <div className="ml-2">Cart</div>
                            </div>
                        </div>

                    </div>
            
                )}
        </div>
    )

}