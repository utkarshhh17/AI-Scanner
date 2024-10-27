import { useEffect, useState, useRef } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";
import FileUploadSection from "./FileUploadSection";
import Nav from "../Nav/Nav";
import Login from "../Login/Login";
import Loader from "../../assets/Loader";

export default function Home(){

    const loginRef = useRef(null); // Create a ref for the login dialog

    

    const {user, dispatch}=useAuthContext()
   
    const [showLogin, setShowLogin]=useState(false)
    const [loading, setLoading]=useState(false)
    const loadingCss=loading===true?'opacity-50':''

    const css=user?"":"mt-20"
    const [formData, setFormData] = useState({
        "front-img": null,
        "rear-img": null,
        "side-img": null,
        "video": null
    });
    const [errors, setErrors] = useState({  "front-img": null, "rear-img": null, "side-img": null, "video": null});


    const handleClickOutside = (event) => {
        console.log(event)
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

    
    const handleFileUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {
          // Validate file size
          if (file.size > 25 * 1024 * 1024) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              [type]: "File size must be less than 25MB",
            }));
            return;
          }
    
          // Remove error if file is valid
          setErrors((prevErrors) => ({
            ...prevErrors,
            [type]: null,
          }));
    
          // Save file in the state
          setFormData((prevFiles) => ({
            ...prevFiles,
            [type]: file,
          }));
        }
      };

    const handleSubmit = async () => {
        

        // Create a FormData object
        const dataToSend = new FormData();

        // Append files to FormData
        for (const key in formData) {
            if (formData[key]) {
                dataToSend.append(key, formData[key]);
            }
        }

        setLoading(true)

        console.log(dataToSend);
        try {
            console.log("header is: "+user)
            // Send the POST request to your Spring Boot server
            const response = await fetch("http://localhost:8081/api/upload", {
                method: "POST",
                body: dataToSend,
                headers:{
                    "Session-ID":user
                }
            });
    
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }

            setFormData(({
                "front-img": null,
                "rear-img": null,
                "side-img": null,
                "video": null,
            }))
            
            // Get the response data (PDF)
            const pdfBlob = await response.blob();
            // Create a new Blob URL
            const pdfUrl = URL.createObjectURL(pdfBlob);

            setLoading(false)

            window.location.reload();

            // Open the PDF in a new tab
            window.open(pdfUrl, '_blank');
            // Optionally, create a link to download the PDF
            // const url = window.URL.createObjectURL(pdfBlob);
            // const a = document.createElement("a");
            // a.href = url;
            // a.download = "response.pdf"; // Specify the file name
            // document.body.appendChild(a);
            // a.click();
            // a.remove();
            // window.URL.revokeObjectURL(url); // Clean up the URL object
        } catch (error) {
            console.error("Error uploading files:", error);
            setLoading(false)

            window.location.reload();

            // Handle any errors that occur during the upload
        }
    };
        

    // const [uploadReady, setUploadReady]=useState(false)
    return(
        <div className="flex max-w-screen flex-col overflow-x-hidden bg-repeat" style={{ backgroundImage: `url('/clouds.png')` }}>

            <Nav setShowLogin={setShowLogin} />
            <div className={`h-full w-full flex flex-col justify-center items-center small:justify-start mb-20 ${loadingCss}`}>
                
                <div className={`flex flex-col relative large:max-w-[50vw] ${css} small:max-w-[80vw] large:relative large:right-80`}>
                    
                    <div className="font-roboto text-[#02A44F] font-bold text-8xl small:text-3xl">
                        AI Scanner
                    </div>
                    
                    {!user && 
                        <div className="flex flex-col">

                            <div className="font-roboto text-lg small:text-xs" style={{ whiteSpace: "pre-line" }}>
                            Cristiano Ronaldo dos Santos Aveiro GOIH ComM (Portuguese pronunciation: ; born 5 February 1985) {"\n"}
                            is a Portuguese professional footballer who plays as a forward for and captains both Saudi Pro League club {"\n"}
                            Al Nassr and the Portugal national team. Widely regarded as one of the greatest players of all time, Ronaldo {"\n"}
                            set numerous records for individual accolades won throughout his professional footballing career, such as five {"\n"}
                            Ballon d'Or awards, a record three UEFA Men's Player of the Year Awards, four European Golden Shoes, and was {"\n"}
                            named five times the world's best player by FIFA,[note 3] the most by a European player.{"\n"}
                            </div>

                            <div className="mt-5">   
                                <button onClick={()=>setShowLogin(true)} className="bg-[#02A44F] p-4 small:p-2 text-white rounded-md shadow-xl hover:scale-105 focus:outline-none">Scan Now</button>

                            </div>
                        </div>
                    }
                    {user && 
                        <div className="w-full flex flex-col items-center">
                            <FileUploadSection handleFileUpload={handleFileUpload} errors={errors} formData={formData} />
                            
                            <button onClick={handleSubmit} className="focus:outline-none rounded-md shadow-md z-20 large:mr-20 w-60 bg-[#0B3D23] p-2 text-white mt-10">Upload</button> 
                        </div>
                    }
                </div>
            </div>

            {loading && 
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Loader />
                </div>
            }

            {showLogin && (
                <div  className="absolute h-full w-full flex justify-center items-center"> 
                    <Login loginRef={loginRef} setShowLogin={setShowLogin}/>
                  
                </div>

            )}
            

            
            

        </div>
    )
}