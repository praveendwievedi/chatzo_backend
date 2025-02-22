import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema=new Schema({
    userName:{
        type:String,
        required:true,
        unique:true,
        toLowerCse:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        // toLowerCse:true,
        trim:true,
        // index:true
    },
    fullName:{
        type:String,
        required:true,
        // unique:true,
        // toLowerCse:true,
        trim:true,
        // index:true
    }
    ,
    // phoneNumber:{
    //     type:Number,
    //     required:true,
    //     index:true
    // },
    password:{
        type:String,
        required:[true,"password required"],
    },
    bio:{
        type:String,
        default:""
    },
    avatar:{
        type:String
    },
    friends:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    refreshToken:{
        type:String,
    }
},{timestamps:true})

userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        return next();
    }
    this.password=await bcrypt.hash(this.password,12);
    next();
})

userSchema.methods.isPasswordCorrect=async function(password){
    return await bcrypt.compare(password,this.password);
}

userSchema.methods.generateRefreshToken=function(){
    return jwt.sign(
        {
            _id:this._id,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}
userSchema.methods.generateAccessToken=function(){
    return jwt.sign(
        {
            _id:this._id,
            userName:this.userName,
            email:this.email,
        },
        process.env.JWT_SECRET,
        {
            expiresIn:process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.toJSON= function(){
    const {email,userName,fullName,avatar,bio}=this.toObject();
    return {email,userName,fullName,avatar,bio}
}
export const User=new mongoose.model("User",userSchema)

