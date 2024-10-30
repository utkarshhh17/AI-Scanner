// FileUploadSection.js
import { useEffect, useContext } from "react";
import { LanguageContext } from "../../context/LanguageContext";

function FileUploadSection({previews, handleFileUpload, errors, formData }) {
  const { t, changeLanguage } = useContext(LanguageContext);

  useEffect(() => {
    console.log(previews)
     
  }, [previews]);
  return (
      <div className="flex w-full flex-wrap font-roboto">

        {["front", "rear", "side", "video"].map((label, index) => (
          <div key={label} className="flex flex-col ml-10 mt-10">
            
          <div className="font-bold">{label === "video" ? t("Rumination Video") : `${t(label.charAt(0).toUpperCase() + label.slice(1))} ${t("Image")}`}</div>
            
              <label htmlFor={`${label}-upload`} className="cursor-pointer">
                <div className="small:w-48 h-48 w-[35rem] border-2 border-dashed border-gray-400 flex flex-col items-center justify-center text-gray-600 hover:bg-gray-100">
                  
                  {!formData[label] && (
                      <div className="w-full flex flex-col items-center justify-center">
                        <img src="./file-upload.png" alt="upload icon" />
                        <div className=" text-center">{t('Click to Upload')}</div>
                      </div>
                    )}
                  
                  {previews[label] && (
                      <img src={previews[label]} alt={`${label} preview`} className="h-full w-auto" />
                      
                      //{/* <div className="text-green-500 mt-2 w-full text-center flex justify-center">Picture uploaded successfully!</div> */}
                  )}
                </div>
              </label>
            <input
              type="file"
              id={`${label}-upload`}
              className="hidden"
              accept={label === "video" ? "video/*" : "image/*"}
              onChange={(e) => handleFileUpload(e, label)}
            />
            {errors[`${label}`] && <div className="text-red-500 mt-2 text-center">{errors[`${label}`]}</div>}
          </div>
        ))}
      </div>
  );
}

export default FileUploadSection;
