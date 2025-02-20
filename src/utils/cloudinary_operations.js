import {v2 as cloudinary} from "cloudinary"
import {asyncHandler} from "../utils/asyncHandler.js"
import fs from "fs"
import ApiError from './ApiError.js'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const uploadOnCloud=asyncHandler(async(localPath,userId)=>{
    const folderPath=`${process.env.CLOUD_FOLDER_NAME}/users/${userId}`
    const cloudUploadResult=await cloudinary.uploader.upload(
        localPath,
    {
        resource_type:"auto",
        folder:folderPath
    }
    );
    
    try {
        fs.unlinkSync(localPath);
    } catch (error) {
        throw new ApiError(500,"failed in uploading the file")
    }
    if(cloudUploadResult){
        return {secure_url:cloudUploadResult.secure_url,
            public_id:cloudUploadResult.public_id,
    }
    }
    else{
        throw new ApiError(500,"failed in uploading the file")
    }
})

const getResourceFromCloud=asyncHandler(async(public_id,userId)=>{
    const folderPath=`${process.env.CLOUD_FOLDER_NAME}/users/${userId}`
        const resourceFromCloud=await cloudinary.api.resource(public_id,{
            type:"upload",// this will help to filter properly. but this will be done by default
            prefix:folderPath // this will look for the folder as the url for resources will have this foldername in them
        })
        if(resourceFromCloud){
            return {secure_url:resourceFromCloud.secure_url,
                    public_id:resourceFromCloud.public_id
            }
        }
        else{
            throw new ApiError(404,"resource not found")
        }
})

const deleteResourceFromCloud=asyncHandler(async(userId,file_public_id,resource_type="image")=>{
    const public_id=`${process.env.CLOUD_FOLDER_NAME}/users/${userId}/${file_public_id}`
    const deletedACK=await cloudinary.uploader.destroy(
        public_id,
        {resource_type:resource_type}
    )
    if(deletedACK.result==="ok"){
        return {message:"file deleted successfully"}
    }
    else{
        throw new ApiError(500,"failed in deleting the file")
    }
})

export {uploadOnCloud,getResourceFromCloud,deleteResourceFromCloud}