import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
});
import connectToDb from "./db/connectToDb.js";
import { db_name } from "./constant.js";
import app from "./app.js";

// PORT=process.env.PORT || 4000;

connectToDb(db_name)
.then(()=>{
    app.listen(process.env.PORT || 4000,()=>{
        console.log(`⚙️ server started at port : ${process.env.PORT || 4000}`);
    });
    
})
.catch(error => console.log("we got some error in connecting to database"))