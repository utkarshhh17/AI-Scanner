import { useEffect, useState } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useNavigate, Link } from "react-router-dom";
import FileUploadSection from "./FileUploadSection";
import Nav from "../Nav/Nav";
import Login from "../Login/Login";

export default function Home(){

    // const {user}= useAuthContext()
    const user=false
    const [showLogin, setShowLogin]=useState(true)

    const css=user?"":"mt-20"
    const [formData, setFormData] = useState({
        "front-img": null,
        "rear-img": null,
        "side-img": null,
        "video": null,
        "lang":'',
    });
    const [errors, setErrors] = useState({  "front-img": null, "rear-img": null, "side-img": null, "video": null, "launguage":null });
    const [selectedLanguage, setSelectedLanguage] = useState("");

    const handleLanguageChange = (e) => {
        const selectedLang = e.target.value;
        setFormData((prevFormData) => ({
        ...prevFormData,
        lang: selectedLang,
        }));
    };

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
        if (!formData.lang) {
            setErrors((prevErrors) => ({
              ...prevErrors,
              lang: "Please select a language",
            }));
            return;
        }

        // Create a FormData object
        const dataToSend = new FormData();

        // Append files to FormData
        for (const key in formData) {
            if (formData[key]) {
                dataToSend.append(key, formData[key]);
            }
        }

        console.log(dataToSend);
        try {
            // Send the POST request to your Spring Boot server
            const response = await fetch("http://localhost:8081/api/upload", {
                method: "POST",
                body: dataToSend,
            });
    
            if (!response.ok) {
                throw new Error("Network response was not ok " + response.statusText);
            }

            setFormData(({
                "front-img": null,
                "rear-img": null,
                "side-img": null,
                "video": null,
                "lang":'',
            }))
    
            // Get the response data (PDF)
            const pdfBlob = await response.blob();
            // Create a new Blob URL
            const pdfUrl = URL.createObjectURL(pdfBlob);

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
            // Handle any errors that occur during the upload
        }
    };
        

    // const [uploadReady, setUploadReady]=useState(false)
    return(
        <div className="flex max-w-screen flex-col overflow-x-hidden bg-repeat" style={{ backgroundImage: `url('/clouds.png')` }}>

            <Nav />
            <div className="h-full w-full flex flex-col justify-center items-center small:justify-start mb-20">
                
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
                                <button className="bg-[#02A44F] p-4 small:p-2 text-white rounded-md shadow-xl hover:scale-105 focus:outline-none">Scan Now</button>

                            </div>
                        </div>
                    }
                    {user && 
                        <div className="w-full flex flex-col items-center">
                            <FileUploadSection handleFileUpload={handleFileUpload} errors={errors} formData={formData} />
                            
                            <div className="mt-4 z-20">
                                {errors["language"] && (
                                    <div className="text-red-500 mb-2">{errors["language"]}</div>
                                )}
                                <label className="font-roboto small:text-sm">Select Language:</label>
                                <select
                                value={formData["lang"]}
                                onChange={handleLanguageChange}
                                className="border p-2 small:text-xs rounded-md ml-2"
                                >
                                    <option value="" disabled>
                                        Select a language
                                    </option>
                                    <option value="English">English</option>
                                    <option value="Hindi">Hindi</option>
                                    <option value="Kannada">Kannada</option>
                                </select>
                            </div>
                            <button onClick={handleSubmit} className="focus:outline-none rounded-md shadow-md z-20 large:mr-20 w-60 bg-[#0B3D23] p-2 text-white mt-10">Upload</button> 
                        </div>
                    }
                </div>
            </div>

            {showLogin && (
                <div className="absolute h-full w-full flex justify-center items-center"> 
                    <Login />
                  
                </div>

            )}
            

            
            

        </div>
    )
}