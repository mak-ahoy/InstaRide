import mongoose from "mongoose"
 
export const connectDB = async () => {
    try {
        console.log("Connecting to DB...");
        const data = await mongoose.connect(process.env.DB_URI);
        console.log("Connected sucessfully!")
        setTimeout(()=>{}, 1000)

    } catch (error) {
        // console.log(error)
        console.log("Failed to connect to DB!")
        console.log("Trying to connect again.")
        connectDB();
    }
}
//can create a fucntion to pint hello world to test the connection
export const helloWorld = async () => {
    console.log("Hello World!")
}