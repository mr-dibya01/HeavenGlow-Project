import express from "express";
import wrapAsync from "../utils/asyncWrap.js";
import { userLogin, userRegister, adminLogin } from "../controllers/userController.js";
import { verifyAdmin } from "../middlewares/auth.js"

const userRouter = express.Router();


// Register 
userRouter.post('/register', wrapAsync(userRegister));

// Login  
userRouter.post('/login', wrapAsync(userLogin)); 
  
// adminLogin
userRouter.post('/admin', verifyAdmin, wrapAsync(adminLogin));



export default userRouter;