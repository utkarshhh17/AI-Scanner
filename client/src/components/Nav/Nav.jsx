import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, Link, useLocation } from "react-router-dom";


export default function Nav(){

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
                            location.pathname === item.path ? 'border-b-4 border-green-500' : ''
                        }`}
                    >
                        {item.name}
                    </Link>
                ))}

            </div>

            <div className="small:hidden h-10 flex mt-7 ml-[10vw] font-roboto text-lg">
            

            </div>
        </div>
    )

}