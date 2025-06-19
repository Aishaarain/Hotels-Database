import mongoose from "mongoose";

// define person schema

const personSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true, //means name is required
    },
    age:{
        type:Number,
    },
    work:{
        type:String,
        enum:['chef','manager','waiter'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true //email should be unique
    }
,address:{
    type:String,
},
salary:{
type:Number,
required:true
}
})
//create person model
const Person=mongoose.model('person',personSchema);

export default Person;