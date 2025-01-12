import mongoose,{Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const chatSchema=new Schema({
    message:{
        type:String,
    },
    sender:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    receiver:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{timestamps:true})

chatSchema.plugin(mongooseAggregatePaginate);

export const Chat=new mongoose.model("Chat",chatSchema);