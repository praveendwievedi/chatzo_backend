import mongoose  from "mongoose";

const connectToDb = async(db_name)=>{
    try {
        const connectionInstances=await mongoose.connect(`${process.env.MONGO_URL}/${db_name}`);
        console.log("Database connected successfully to host : ",
                connectionInstances.connection.host);
    } catch (error) {
        console.log("Error connecting to databse",error.message);
        
    }
    
}

export default connectToDb