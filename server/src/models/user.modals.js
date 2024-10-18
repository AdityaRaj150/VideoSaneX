import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
  {
    
    userName: {
      type: String,
      unique: true,
      required: true,
      lowerCase: true,
      trim: true,
      index: true,
    },

    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],

    email: {
      type: String,
      unique: true,
      required: true,
      lowerCase: true,
    },

    password: {
      type: String,
      required: [true, "password is required"],
    },

    fullName: {
      type: String,
      unique: true,
      required: true,
      lowerCase: true,
      trim: true,
      index: true,
    },

    avatar: {
      type: String,
    },

    coverImage: {
      type: String,
    },

    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function(next){
  if(!this.isModified("password")) next()

  this.password = await bcrypt.hash(this.password, 8)
  next()
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
  return jwt.sign({
    _id: this._id,
    userName: this.userName,
    fullName: this.fullName,
    email: this.email
  },
  process.env.ACCESS_TOKEN_SECRET,
  {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY
  }
)
}

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};

export const User = mongoose.model("User", userSchema);
