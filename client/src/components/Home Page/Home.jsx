import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";

import Nav from "../Nav/Nav";


export default function Home(){

    

    return(
        <div className="flex w-screen h-screen flex-col overflow-x-hidden bg-repeat" style={{ backgroundImage: `url('/clouds.png')` }}>

            <Nav />
            <div className="h-full w-full flex flex-col justify-center items-center small:mt-20 mb-20">
                <div className="flex flex-col relative bottom-20 large:max-w-[50vw] small:max-w-[80vw] large:relative large:right-80">
                    <div className="font-roboto text-[#02A44F] text-5xl small:text-2xl">
                        AI Scanner
                    </div>

                    <div className="font-roboto text-lg small:text-xs" style={{ whiteSpace: "pre-line" }}>
                    Cristiano Ronaldo dos Santos Aveiro GOIH ComM (Portuguese pronunciation: ; born 5 February 1985) {"\n"}
                    is a Portuguese professional footballer who plays as a forward for and captains both Saudi Pro League club {"\n"}
                    Al Nassr and the Portugal national team. Widely regarded as one of the greatest players of all time, Ronaldo {"\n"}
                    set numerous records for individual accolades won throughout his professional footballing career, such as five {"\n"}
                    Ballon d'Or awards, a record three UEFA Men's Player of the Year Awards, four European Golden Shoes, and was {"\n"}
                    named five times the world's best player by FIFA,[note 3] the most by a European player.{"\n"}
                    </div>

                    <div className="mt-5">   
                        <Link className="bg-[#02A44F] p-4 small:p-2 text-white rounded-md shadow-xl hover:scale-105 focus:outline-none">Scan Now</Link>

                    </div>
                </div>
            </div>


            <img src='./footer-grass.png' className="absolute bottom-0 small:h-40 h-80 w-full" />
            <img src='./cow.png' className="absolute bottom-0 right-0 z-2 small:h-40 h-[25vw]" /> 
        </div>
    )
}