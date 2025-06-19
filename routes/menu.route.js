import express from 'express';
import { Router } from 'express';
import Menu from '../Models/Menu.model.js';
const router = Router();

router.get('/',async(req,res)=>{

  try{
    const data=await Menu.find();
if(!data || data.length===0){
  console.log('menu items not found');
   res.status(404).json({error:"menu items not found"});
}

    console.log('menu data fetched');
    res.status(200).json(data);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
})

router.get('/:taste',async(req,res)=>{
    const taste =req.params.taste;
try{
 
    if(taste =='spicy' || taste =='sweet' || taste =='sour'){
        const tastes= await Menu.find({taste:taste});
        console.log('menu item found');
        res.status(200).json(tastes);
    }
    else{
      res.status(404).json({error:'menu item not found'});
    }
}catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
})

router.post('/',async(req,res)=>{
  try{
    const data =req.body;
    const newMenu=new Menu(data);
    const response = await newMenu.save();
    console.log('menu item added');
    res.status(201).json(response);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
})

router.put('/:Id',async(req,res)=>{
  try{
    const Id=req.params.Id;

    const updatedData=req.body;
    const response=await Menu.findByIdAndUpdate(Id,updatedData,{
      new:true,
      runValidators:true
    })
    if(!response){
      console.log('menu item not found');
      return res.status(404).json({error:'menu item not found'});
    }
    console.log('menu item updated');

    res.status(200).json(`menu item updated successfully ${response}`);
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
})

router.delete('/:Id',async (req,res)=>{
  try{
    const Id=req.params.Id;
    const response=await Menu.findByIdAndDelete(Id);
    if(!response){
      console.log('menu item not found');
      return res.status(404).json({error:'menu item not found'});
    }
    console.log('menu item deleted');
    res.status(200).json({message:'menu item deleted successfully', deletedData:response});
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
})
export default router;
// comment for 2nd version