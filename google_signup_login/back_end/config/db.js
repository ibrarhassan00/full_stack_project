import mongoose from "mongoose";


const connectMongoDatabase = ()=>{
    mongoose.connect(process.env.DB_URI)
    .then((res)=>{console.log("MongoDB Connect");
    })
    .catch((error)=>{
    console.log(error.message);
    })
} 

export default connectMongoDatabase;