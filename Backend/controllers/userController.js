import bcryptjs from "bcryptjs"
import User from "../model/userModel.js"
import httpStatus from "http-status";
import jwt from 'jsonwebtoken'
// import validator from "valida"



const userRegister =async (req,res) => { 
    // console.log("userRegister:------",req.body);
    let { name,password,email } = req.body; 
    let existingUser = await User.findOne({ email });

    if(existingUser){
        return res.status(httpStatus.FOUND).json({error: `Email ${email} already registered`});
    }

    let hashPassword = await bcryptjs.hash(password,10);
    let user = new User({ 
        name, 
        password: hashPassword, 
        email
    });
    await user.save();
    if(user._id) {
        let token = jwt.sign({id:user._id}, process.env.JWT_SECRET, {expiresIn: '7d' });
        console.log(token);
        res.status(httpStatus.OK).json({success: true, message: 'User successfully registered',token});
    } else {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json({success: false, message: 'Something went wrong!'}); 
    }
}

const userLogin = async  (req,res) => {
    // console.log(req.body);
    let { email, password } = req.body;
    let isFound = await User.findOne({ email });
    // console.log(isFound);
    if(!isFound) {
        return res.status(httpStatus.NOT_FOUND).json({error: 'User not found'});
    }
   
    let isMatch =await bcryptjs.compare(password, isFound.password);
    // console.log(isMatch)
    if(!isMatch) {
        return res.status(httpStatus.UNAUTHORIZED).json({error: 'password is wrong'})
    }
    let token=jwt.sign( {id: isFound._id}, process.env.JWT_SECRET, {expiresIn: '7d' });
    res.status(httpStatus.OK).json({success: true, message: 'User successfully logged in', token})
}

const adminLogin =async (req,res) => {

    try {
        let { email, password } = req.body;
        // console.log(req.body);
        let token = jwt.sign(email+password, process.env.JWT_SECRET);
        // console.log(token);
        res.status(httpStatus.OK).json({token: token});
    } catch (err) {
        console.log(err);
    }
    
} 

export { userRegister, userLogin, adminLogin };