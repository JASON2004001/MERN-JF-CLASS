import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    },
    passwordVerificationToken:{
        type: String,
    },
    passwordVerificationTokenExpiry :{
        type: Date
    },
    refreshToken:{
        type: String
    }

}, {timestamps: true,});

userSchema.pre("save", async function(){
    if(!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.isPasswordCorrect = function(password){
    return bcrypt.compare(password, this.password);
}


export const User = mongoose.model("User", userSchema);