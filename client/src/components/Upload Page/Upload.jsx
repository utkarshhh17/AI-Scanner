import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { LanguageContext } from "../../context/LanguageContext";
import FileUploadSection from "./FileUploadSection";
import Nav from "../Nav/Nav";
import Login from "../Login/Login";
import Loader from "../../assets/Loader";

export default function Upload(){
    
    const {user, dispatch}=useContext(AuthContext)
    const { t, changeLanguage, langauge } = useContext(LanguageContext);


    const [loading, setLoading]=useState(false)
    const loadingCss=loading===true?'opacity-50':''

    const css=user?"":""
    const [formData, setFormData] = useState({
        front: null,
        rear: null,
        side: null,
        video: null
    });
    const [uploadErrors, setUploadErrors] = useState({  front: null, rear: null, side: null, video: null});
    const [previews, setPreviews] = useState({ front: null, rear: null, side: null, video: null,});


    const [pdfUrl, setPdfUrl] = useState(null);
    const [showDownloadButton, setShowDownloadButton] = useState(false);


    
    const handleFileUpload = (e, type) => {
        const file = e.target.files[0];
        if (file) {

            const isImage = file.type.startsWith("image/");
            const isVideo = file.type.startsWith("video/");

            // File type validation
            if ((type !== "video" && !isImage) || (type === "video" && !isVideo)) {
                setUploadErrors((prevErrors) => ({
                    ...prevErrors,
                    [type]: type === "video"
                        ? "Please upload a video file for the video field."
                        : "Please upload an image file for this field.",
                }));
                return;
            }

            // Validate file size
            if (file.size > 25 * 1024 * 1024) {
                setUploadErrors((prevErrors) => ({
                    ...prevErrors,
                    [type]: "File size must be less than 25MB",
                }));
                return;
            }
    
            // Remove error if file is valid
            setUploadErrors((prevErrors) => ({
                ...prevErrors,
                [type]: null,
            }));
        
            // Save file in the state
            setFormData((prevFiles) => ({
                ...prevFiles,
                [type]: file,
            }));

            const previewUrl = URL.createObjectURL(file);
            console.log(previewUrl)
            setPreviews(prevPreviews => ({
                ...prevPreviews,
                [type]: previewUrl
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
        dataToSend.append("lang",langauge)

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
                "front": null,
                "rear": null,
                "side": null,
                "video": null,
            }))
            
            // Get the response data (PDF)
            const pdfBlob = await response.blob();
            // Create a new Blob URL
            const pdfUrl = URL.createObjectURL(pdfBlob);

            setLoading(false)

            
            setPdfUrl(pdfUrl);
            setShowDownloadButton(true); // Show download button after PDF is generated

            // Open PDF in a new tab
            window.open(pdfUrl, '_blank');
        } catch (error) {
            console.error("Error uploading files:", error);
            setLoading(false)

            //// window.location.reload();

            // Handle any errors that occur during the upload
        }
    };
        
    const handleRestartSession = () => {
        // Reset state to start a new session
        setShowDownloadButton(false);
        setPdfUrl(null);
    };

    // const [uploadReady, setUploadReady]=useState(false)
    return(
        <div className="flex max-w-screen grow flex-col overflow-x-hidden bg-repeat" style={{ backgroundImage: `url('/clouds.png')` }}>

            <Nav />
            <div className={`h-full w-full flex flex-col justify-center items-center small:justify-start ${loadingCss}`}>
                
                <div className={`flex mt-10 flex-col relative large:max-w-[70vw] ${css} small:max-w-[80vw] large:relative`}>
                    
                    <div className="font-roboto text-[#02A44F] font-bold text-8xl small:text-3xl">
                        {t('AI Scanner')}
                    </div>
                    {user && !showDownloadButton && 
                        <div className="w-full flex flex-col items-center">
                            <FileUploadSection previews={previews} handleFileUpload={handleFileUpload} errors={uploadErrors} formData={formData} />
                            
                            <button onClick={handleSubmit} className="focus:outline-none rounded-md shadow-md z-20 large:mr-20 w-60 bg-[#0B3D23] p-2 text-white mt-10">{t('Upload')}</button> 
                        </div>
                    }

                    {user && showDownloadButton && (
                        <div className="w-full flex flex-col items-center mt-10 mb-10">
                            <button className="flex justify-center focus:outline-none rounded-md shadow-md z-20 large:mr-20 w-60 bg-[#0B3D23] p-2 text-white mt-10" onClick={() => window.open(pdfUrl, '_blank')}>
                                {t('View PDF Report')}
                            </button>
                            <a href={pdfUrl} className="flex justify-center focus:outline-none rounded-md shadow-md z-20 large:mr-20 w-60 bg-[#0B3D23] p-2 text-white mt-10" download="response.pdf">
                                {t('Download PDF Report')}
                            </a>
                            <button className="flex justify-center focus:outline-none rounded-md shadow-md z-20 large:mr-20 w-60 bg-[#0B3D23] p-2 text-white mt-10" onClick={handleRestartSession}>
                                {t('Restart Session/Upload More Images')}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {loading && 
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <Loader />
                </div>
            }

            {!user && (
                <div  className="absolute h-full w-full flex justify-center items-center"> 
                    <Login/>
                  
                </div>

            )}

       
            

            
            

        </div>
    )
}