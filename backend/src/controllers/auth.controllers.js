import User from "../model/User.js"
import bcrypt from "bcryptjs"
import { generateToken } from "../lib/utils.js"
import 'dotenv/config';
import { sendWelcomeEmail } from "../emails/emailHandlers.js";
import cloudinary from "../lib/cloudinary.js";


export const signup = async(req,res)=>{
    const{fullName,email,password} = req.body
    try {
        if(!fullName || !email || !password){
            return res.status(400).json({message:"All fields are required"})
        }
        
        if(password.length<6){
            return res.status(400).json({message:"Password should be at least 6 characters"})
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const user = await User.findOne({email})
        if(user) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            fullName,
            email,
            password: hashedPassword,
        })

        const savedUser = await newUser.save()
        
        const token = generateToken(res, savedUser._id)
        
        res.status(201).json({
            _id: savedUser._id,
            fullName: savedUser.fullName,
            email: savedUser.email,
            profilePic: savedUser.profilePic,
            token
        });

        // sending an welcome email
        try {
        await sendWelcomeEmail(savedUser.email, savedUser.fullName, process.env.CLIENT_URL);
      } catch (error) {
        console.error("Failed to send welcome email:", error);
      }


    } catch (error) {
        console.error("Error in signup controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      // If no user found, invalid credentials
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // never tell the client which one is incorrect: password or email
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // generate token
    const token = generateToken(res, user._id);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      token,
    });
  } catch (error) {
    console.error("Error in login controller:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logout = (_, res) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({ message: "Logged out successfully" });
};

export const updateProfile = async (req,res)=>{
  try {
    const {profilePic} = req.body
    if (!profilePic) return res.status(400).json({ message: "Profile pic is required" });
    const userId = req.user._id;
    const uploadResponse = await cloudinary.uploader.upload(profilePic)

   const updatedUser =  await User.findByIdAndUpdate(
       userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    )
    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("Error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}