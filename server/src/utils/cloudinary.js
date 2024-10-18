import {v2 as cloudinary} from "cloudinary"

import fs from "fs"


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

const uploadOnCloudinary = async(localFilePath) => {
    try {
        if(!localFilePath){
            console.log("invalid local file path");
            return null;
        }

        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        

        fs.unlinkSync(localFilePath)
        return response;
        
    } catch (error) {
        console.log("err uploading on cloudinary "+error)
        fs.unlinkSync(localFilePath)
        return null;
    }
}

const deleteFromCloudinary = async(url, resource_type) => {
                                                                                                                                 
 try {
       if(!(url?.trim !== "")){
           console.log("invalid url")
           return null
       }
       const slashSepArr = url.split("/")
       const public_id = slashSepArr[slashSepArr.length - 1].split(".")[0]
       const response = await cloudinary.uploader.destroy(public_id, {resource_type})
       return response
 } catch (error) {
    console.log("err deleting file from cloudinary ", error)
    return null
 }
}

export { uploadOnCloudinary, deleteFromCloudinary }