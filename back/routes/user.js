import express from "express"
import {signUp, getMenu, validateUser, createUser, getOrders} from "../controllers/users.js"


export const userRouter = express.Router();

userRouter.post('/create', createUser);  // when come here then cal create user function
userRouter.post('/validate', validateUser)
userRouter.post('/signup', signUp)
userRouter.get('/get-menu', getMenu)
userRouter.post('/get-orders', getOrders)
// userRouter.post('/get-my-orders', getMyOrders)
// 


// userRouter.post('/change-password', changePassword) 
// userRouter.get('/get-trades', getAllTrades)
// userRouter.post('/get-user-trades', getTradesByUser)
// userRouter.post('/create-trade', createTrade) 
// userRouter.post('/add-cash', addCash)
  

