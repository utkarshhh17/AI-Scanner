
import Home from '../components/Home Page/Home';
import { useEffect } from 'react'

const HomePage=()=>{
    useEffect(() => {
        document.title = 'Gau Sampurna';
      }, []);
    return(
        <div className='flex flex-col min-h-screen overflow-x-hidden'>

            <Home />
            {/* Footer Images */}
            <div className="relative w-full large:mt-10"> 
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

export default HomePage;