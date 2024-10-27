// FileUploadSection.js
import React from "react";

function FileUploadSection({ handleFileUpload, errors, formData }) {
  return (
      <div className="flex flex-wrap font-roboto">

        {["front", "rear", "side", "video"].map((label, index) => (
          <div key={label} className="flex flex-col ml-10 mt-10">
            <div className="font-bold">{label === "video" ? "Rumination Video" : label.charAt(0).toUpperCase() + label.slice(1)}</div>
            <label htmlFor={`${label}-upload`} className="cursor-pointer">
              <div className="small:w-48 h-48 w-80 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center text-gray-600 hover:bg-gray-100">
                <img src="./file-upload.png" alt="upload icon" />
                Click to Upload
                {formData[`${label}-img`] && (
                    <div className="text-green-500 mt-2 w-full flex justify-center">Picture uploaded successfully!</div>
                )}
              </div>
            </label>
            <input
              type="file"
              id={`${label}-upload`}
              className="hidden"
              accept={label === "video" ? "video/*" : "image/*"}
              onChange={(e) => handleFileUpload(e, `${label}-img`)}
            />
            {errors[`${label}-img`] && <div className="text-red-500 mt-2">{errors[`${label}-img`]}</div>}
          </div>
        ))}
      </div>
  );
}

export default FileUploadSection;
