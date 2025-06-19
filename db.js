import mongoose from "mongoose";
// localhost of mongoose database
const mongoUrl='mongodb://localhost:27017/hotels';

// to establish a connection to the Mongoose database
mongoose.connect(mongoUrl,{
    // useNewUrlParser: true,     //mandatory to establish connection and prevent errors
    // useUnifiedTopology: true
})

const db=mongoose.connection;


//event listener
db.on('connected',()=>{
    console.log('Mongodb server connected ');
})
db.on('error',(err)=>{
    console.log('mongodb connection error',err);
})
db.on('disconnected',()=>{
    console.log('Mongodb server disconnected');
})

// export databse connection
export default db;