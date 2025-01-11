import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
});

import connectToDb from "./db/connectToDb.js";
import { db_name } from "./constant.js";

connectToDb(db_name)
.then(()=>{
    console.log("now we can connect listen on some port");
    
})
.catch(error => console.log("we got some error in connecting to database"))