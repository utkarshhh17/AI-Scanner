import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import MenuIcon from "../../assets/MenuIcon";

import SearchIcon from "../../assets/SearchIcon";
import CartIcon from "../../assets/CartIcon";
import UserIcon from "../../assets/UserIcon";
import AboutUsIcon from "../../assets/AboutUsIcon";

export default function Nav({setShowLogin}){

    const {user, dispatch}=useAuthContext()

    const [showMenu, setShowMenu]=useState(false)
    const [showLogOut, setShowLogOut]=useState(false)

    const toggleUser=()=>{
        setShowLogOut(prevState=>!prevState)
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
        { name: "Home", path: "/" },
        { name: "Dairy Fortune", path: "/dairy-fortune" },
        { name: "About Us", path: "/about" },
        { name: "Blogs", path: "/blogs" },
        { name: "Contact Us", path: "/contact" },
    ];


    return(
        <div className="flex justify-between w-full">

            <img src='./logo.png' className="mt-2 ml-2 small:h-20"></img>

            <div className="small:hidden h-10 flex mt-7 ml-[25vw] font-roboto text-lg">
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

            <div className="small:hidden h-10 flex mt-7 mr-10 font-roboto text-lg">
                <div className="cursor-pointer"><SearchIcon /></div>
                <div className="ml-10 cursor-pointer"><CartIcon height="38" width="38" /></div>
                
                <div className="flex flex-col">
                    <button onClick={toggleUser} className="ml-10 cursor-pointer"><UserIcon height="40" width="40" /></button>
                    {showLogOut && user && 
                            <div onClick={handleLogout} className="cursor-pointer absolute ml-5 bg-gray-200 border-[1px] border-gray-400 p-2 top-20 ">
                                Log Out
                            </div>  
                    }
                    {showLogOut && !user && 
                            <div onClick={()=>{setShowLogOut(false);setShowLogin(true);}} className="cursor-pointer absolute ml-5 bg-gray-200 border-[1px] border-gray-400 p-2 top-20 ">
                                Sign In
                            </div>  
                    }
                </div>

            </div>

            <div className="large:hidden mid:hidden absolute top-8 right-4 " onClick={handleShowMenu}>
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
                                <div className="ml-2">About Us</div>
                            </div>
                            <div className="border-b-[0.2px] border-black py-2">Blogs</div>
                            <div onClick={()=>{if(user){handleLogout();} else{setShowMenu();setShowLogin(true);}}} className="flex justify-start items-center border-b-[0.2px] border-black py-2">
                                <UserIcon height="25" width="25" />
                                <div className="ml-2">Account</div>
                            </div>
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