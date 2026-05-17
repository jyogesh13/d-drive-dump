import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

// Define the User schema with all necessary fields and validation
const userSchema = new Schema(
  {
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        index: true // For faster search
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    fullName:{
        type: String,
        required: true,
        trim: true,
        index: true,  // For faster search
    },
    avatar:{
        type: String, //cloudinary url
        required: true,
    },
    coverImage:{
        type: String, //cloudinary url
    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            ref: "Video" // Reference to Video model
        }
    ],
    password:{
        type: String,
        required: [true, "Password is required"]
    },
    refreshToken:{
        type: String // Stores the refresh token for the user
    }
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);


// Pre-save hook to hash password before saving user document
userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();
    

    // Hash the password with a salt round of 10
    this.password = bcrypt.hash(this.password, 10);
    next()
})

// Instance method to compare entered password with hashed password
userSchema.methods.isPasswordCorrect = async function (password){
    return await bcrypt.compare(password, this.password)
}

// Instance method to generate JWT access token for the user
userSchema.methods.generateAccessToken = function(){
    jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// Instance method to generate JWT refresh token for the user
userSchema.methods.generateRefreshToken = function (){
    jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

// Export the User model
export const User = mongoose.model("User", userSchema);
