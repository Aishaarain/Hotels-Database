import mongoose from "mongoose";

// define menu schema
const menuSchema =new mongoose.Schema({
    name:{
    type:String,
    required:true
    },
    price:{
        type:Number,
        required:true 
    },
    taste:{
        type:String,
        enum:['spicy','sweet','sour'],
        required:true
    },
    is_drink:{
        type:Boolean,
        default:false  //if not specified by client, it will be false
    },
    ingredients:{
        type:[String],
        default:[]
    },
     num_sales:{
        type:Number,
        default:0    //if new menu item is added it will obviously defautly zero to prevent undefined
     },
     id:{
        type:Number,
        
     }
})

const Menu = mongoose.model('Menu',menuSchema,'menu'); // 'menuItems' is the collection name in the database

export default Menu;  