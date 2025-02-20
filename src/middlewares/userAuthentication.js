import jwt from "jsonwebtoken"
import ApiError from "../utils/ApiError.js"
import User from "../models/user.models.js"

const authencticateUser=async(req,_,next)=>{
    const accesstoken=req.cookies?.accesstoken || req.header?.authorization?.split(" ")[1];
    if(!accesstoken){
        throw new ApiError("Please login to continue")
    }
    const decodedToken=jwt.verify(accesstoken,process.env.JWT_SECRET);
    // if(!decodedToken){
    //     throw new Error("Invalid token")
    // }
    const user=await User.findById(decodedToken._id).select("-password -refreshToken");
    if(!user){
        throw new Error("Invalid token")
    }
    req.user=user;
    next();
}

export  {authencticateUser};