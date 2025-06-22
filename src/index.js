import connectDB from './db/index.js'
import 'dotenv/config'

// dotenv.config({
//     path : './env'
// })

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`app is listening at port ${process.env.PORT}`);
        
    })
})
.catch((err)=>{
    console.log("Mongo Db connection error ",err);
    
})














// import express from 'express'

// const app = express()


// (async ()=>{
//  try {
//     await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
//     app.on("error",(error)=>{
//         console.log("Error : not connected to database",error);
//         throw error;
//     })
//     app.listen(process.env.PORT,()=>{
//         console.log(`app listening to ${process.env.PORT}`)
//     })
//  } catch (error) {
//     console.log("Error : ",error);
//     throw error;
//  }
// })()