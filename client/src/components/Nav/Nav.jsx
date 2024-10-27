import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";
import MenuIcon from "../../assets/MenuIcon";


export default function Nav(){

    const [showMenu, setShowMenu]=useState(false)

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
        <div className="flex w-full">

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

            <div className="small:hidden h-10 flex mt-7 ml-[10vw] font-roboto text-lg">
            

            </div>

            <div className="large:hidden mid:hidden absolute top-8 right-4 " onClick={handleShowMenu}>
                <MenuIcon/>
            </div>
            {showMenu && (
                    <div className="fixed w-[40vw] h-full right-0 flex flex-col bg-[#c1efd7] opacity-100 z-10 font-roboto">
                        <div className="bg-[#02A44F] p-2 text-white flex">
                            <div>User</div>
                            <div className="absolute right-2" onClick={handleShowMenu}>X</div>
                        </div>
                        <div className="flex flex-col w-full p-2">
                            <div className="border-b-[0.2px] border-black py-2">Dairy Fortune</div>
                            <div className="border-b-[0.2px] border-black py-2">About Us</div>
                            <div className="border-b-[0.2px] border-black py-2">Blogs</div>
                            <div className="border-b-[0.2px] border-black py-2">Account</div>
                            <div className="border-b-[0.2px] border-black py-2">Cart</div>
                        </div>

                    </div>
            
                )}
        </div>
    )

}