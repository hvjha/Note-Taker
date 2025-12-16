import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        mongoose.connection.on('connected',()=>{
            console.log('Database is connected')
        })
        await mongoose.connect(`${process.env.MONGO_URI}/note-app`)
    } catch (error) {
        console.log("MongoDb connection error",error);
        
    }
}

export default connectDB