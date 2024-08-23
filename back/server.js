import { Socket, Server } from "socket.io";
import http from "http";
import { app } from "./app.js";
import { config } from "dotenv";
import { connectDB } from "./utils/db.js";

config({
  path: "./config.env",
});

const offers = [
  {
    user: "Sam",
    from: "123 Elm Street, Springfield",
    to: "456 Oak Avenue, Springfield",
    amount: "$25.00"
  },
  {
    user: "Alex",
    from: "789 Maple Road, Springfield",
    to: "101 Pine Street, Springfield",
    amount: "$30.00"
  },
  {
    user: "Jordan",
    from: "202 Birch Boulevard, Springfield",
    to: "303 Cedar Lane, Springfield",
    amount: "$22.50"
  },
  {
    user: "Taylor",
    from: "404 Walnut Street, Springfield",
    to: "505 Cherry Drive, Springfield",
    amount: "$27.75"
  }
];



const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
 

io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);
  
  
 socket.on("message", (message)=>{
  console.log("recieved: ", message)
 })

 socket.on("send_offers", ()=>{
  console.log("request recieved")
  socket.emit("offers", offers)
 })


});

server.listen(8000, () => {
  console.log("Server is running on port 8000");
});  


connectDB();  