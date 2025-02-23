import User from "../models/user.models.js"
import {asyncHandler,ApiResponse,ApiError} from '../utils/index.utils.js'

const generateToken=async(userId)=>{
    if(userId){
        throw new ApiError(500,"User Id is required")
    }
    try {
        const user=await User.findById(userId);
        const refreshToken=await user.generateRefreshToken();
        const accessToken=await user.generateAccessToken();
        user.refreshToken=refreshToken;
        await user.save();
        return {accessToken,refreshToken}
    } catch (error) {
        throw new ApiError(500,"Token generation failed")
    }
}

const createUser=asyncHandler(async(req,res)=>{
    const {userName,email,fullName,password,} = req.body;
    if(!(userName&& email&&fullName&&password)){
        throw new ApiError(400,"All fields are required")
    }
    const registeredUser=await User.findOne({
        $or:[{userName},{email}]
    });
    if(registeredUser){
        throw new ApiError(400,"User already exists")
    }
    const avatarLocalPath=req.file?.avatar;
    const userCreated=await User.create({
        userName,
        email,
        fullName,
        password,
        avatar:avatarLocalPath || process.env.DEFAULT_USER_IMAGE
    })
    const token = await generateToken(userCreated._id);
    res.cookie("accessToken",token.accessToken,{
        httpOnly:true,
        secure:true
    })
    res.status(201)
        .json(
            new ApiResponse(
                201,
                userCreated.toJSON(),
                "User created successfully"
            )
        )
})

export {createUser}