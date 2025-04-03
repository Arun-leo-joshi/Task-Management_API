import mongoose from "mongoose";

const ConnectingToDB = async () => {
    try{
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB connected successfully");
    }catch(err){
        console.log("Error while connecting to DB",err.message);
        process.exit(1);
    }
}

export default ConnectingToDB;