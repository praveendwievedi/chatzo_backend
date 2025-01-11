import mongoose  from "mongoose";

const connectToDb = async(db_name)=>{
    const connectionInstances=await mongoose.connect(`process.env.MONGO_URL/${db_name}`);
}

export default connectToDb