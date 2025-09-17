import mongoose from 'mongoose'

export const connectDB = async () => {
    try{
      const conn =   await mongoose.connect(process.env.MONGO_URI)
        console.log("data base connected:",conn.connection.host);
        
    }
    catch(error){
        console.log("Error connection to mongoDB",error)
        process.exit(1) //1 means fail , 0 means fail
    }
}
