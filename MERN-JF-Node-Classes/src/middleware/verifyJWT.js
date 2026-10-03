import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js";

const verifyJwt = async(req, res, next)=> {
    const token = req.cookies.token || req.header("Authorization").replace("Bearer ", "");

    if(!token){
        return res.status(400).json({message:"Unauthorised or Invalid Token"})
    }

    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);

    if(!decodedToken){
        return res.status(400).json({message:"Unauthorised or Invalid User"})
    }

    const user = await User.findById(decodedToken?.user_id);

    req.user = user;

    next();
}


const checkRole = async(req, res, next)=>{
    if(req.user.role !== "admin"){
        return res.status(403).json({message:"You are not authorized to access this route"});
    }
    next();
}

export {verifyJwt, checkRole};