import express from "express";
const app=express();
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path'

app.use(cors({
    origin:process.env.CLIENT_URL,
    credentials:true,
}));
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(express.static('public'));



export default app;