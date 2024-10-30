import { useEffect } from "react";
import Upload from "../components/Upload Page/Upload"
export default function UploadPage(){

    useEffect(() => {
        document.title = 'Gau Sampurna';
      }, []);
    return(
        <div className='flex flex-col min-h-screen overflow-x-hidden'>

            <Upload />
            {/* Footer Images */}
            <div className="relative  mb-0 w-full large:mt-10"> 
                {/* Footer Grass Image */}
                <img
                src="./footer-grass.png"
                className="bottom-0 small:h-40 h-80 w-full"
                />

                {/* Cow Image */}
                <img
                src="./cow.png"
                className="absolute bottom-0 right-0 z-2 small:h-40 h-[25vw]"
                />
            </div> 
    
        </div>
    )

}