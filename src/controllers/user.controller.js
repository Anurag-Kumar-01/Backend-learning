import {asyncHandler} from '../utils/asyncHandler.js'
import {apiError} from '../utils/apiError.js'
import {User} from '../models/user.model.js'
import {uploadOnCloudinary} from '../utils/cloudinary.js'
import { apiResponse } from '../utils/apiResponse.js';

const registerUser  = asyncHandler( async (req,res)=>{
   
   // get user details from frontend
   const {username,fullName,email,password} = req.body
   console.log("email : ",email);
   
   // validation - no empty fields
   if(fullName === ""){
      throw new apiError(400,"fullName is required...")
   }
   if(
      [email,username,password].some((field)=> field?.trim() === "")
   ){
      throw new apiError(400,"these fields are required ...")
   }
   // check if user already exists : username,email
   const existedUser = await User.findOne({
      $or : [{email},{username}]
   })
   if(existedUser){
      throw new apiError(409,"user with username or email already exists")
   }
   // check for images : avatar 
   const avatarPath = req.files?.avatar[0]?.path
   //const coverImagePath = req.files?.coverImage[0]?.path
   let coverImagePath;
   if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
      coverImagePath = req.files.coverImage[0].path;
   }

   if(!avatarPath){
      throw new apiError(400,"avatar is required ...")
   }
   // upload them on cloudnary , avatar 
   const avatar =  await uploadOnCloudinary(avatarPath)
   const coverImage = await uploadOnCloudinary(coverImagePath)

   if(!avatar){
      throw new apiError(400,"avatar file is required ...")
   }
   // create user object on db 
   const user = await User.create({
      fullName,
      avatar : avatar.url,
      coverImage : coverImage?.url || "",
      email,
      password,
      username : username.toLowerCase()
   })

   // remove password and refresh token field from response
   const createdUser = await User.findById(user._id).select("-password -refreshToken") 
   if(!createdUser){
      throw new apiError(500,"something went wrong while registering the user")
   }
   // return response 

   return res.status(201).json(
      new apiResponse(200,createdUser,"user registered successfully")
   )
   

})

export {registerUser}