import { User  } from '../models/user.js'
import { generateTokenAndSetCookie } from '../utils/generateTokenAndSetCookie.js'
import bcrypt from 'bcryptjs'
 
export const login = async (req, res) => {
  const {username, password} = req.body

  try {
    if (!username || !password) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    const userIndatabase = await User.findOne({username})

    if (!userIndatabase) {
      return res.status(400).json({success: false, message: "User doesn't exist"})
    }

    const checkPassword = await bcrypt.compare(password, userIndatabase.password)

    if(!checkPassword){
      return res.status(401).json({success: false, message: "wrong password"})
    }

    generateTokenAndSetCookie(res, userIndatabase._id)

    const lastLogin = new Date()
    await userIndatabase.save()

    res.status(200).json({success: true,              message:"User logged in successfully",
    user: {
      ...userIndatabase._doc,
      password: undefined
    }
    })
    
  } catch (error) {
    console.log('error', error)
  }
}

export const signup = async (req, res) => {
  const {username, password, name} = req.body

  try {
    if (!username || !password || !name) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }
    
    const userAlreadyExist = await User.findOne({username})

    if (userAlreadyExist) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

  
    const hashPassword = await bcrypt.hash(password, 10)

    const user = new User({
      username,
      password:hashPassword,
      name
    })
    await user.save()

    generateTokenAndSetCookie(res, user._id)  
    res.status(201).json({
      success: true, 
      message: "user created successfully",
      user: {
        ...user._doc,
        password: undefined
      }
    })

  } catch (error) {
    console.log('error', error)
    res.status(400).json({success: false, message: error.message})
  }
}

export const logout = (req, res) => {
  res.clearCookie("token")
  res.status(200).json({success: true, message:"log ged out successfully"})
}

