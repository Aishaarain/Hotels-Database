import express from 'express';
import { Router } from 'express';
import Person from '../Models/person.model.js'
const router = Router();


router.get('/', async (req,res)=>{
try{
  const data = await Person.find();
  console.log('data fetched');
  res.status(200).json(data);
}catch(err){ 
  console.log(err);
  res.status(500).json({error:'internal server error'})
}
})

router.get('/:workType',async(req,res)=>
{
  try{
const workType=req.params.workType.trim().toLowerCase();

if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){

  const data =await Person.find({work:workType})
res.status(200).json(data);
  }

  console.log('invalid work type');
  res.status(404).json({error:'invalid work type'});
}
  catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
});


router.post('/', async (req,res)=>{
  try{
    const data=req.body;
    const newPerson = new Person(data);

    const response = await newPerson.save();
    console.log('data saved')

    res.status(201).json("data saved successfully",response);
  } catch(err){ 
  console.log(err);
  res.status(500).json({error:'internal server error'});
}
})

router.put('/:id',async(req,res)=>{
  try{
const personId = req.params.id;
const updatedData = req.body;

const response = await Person.findByIdAndUpdate(personId,updatedData,{
  new:true,   //retirn the updated document
  runValidators:true //run database validator to true
})
if(!response){
  return res.status(404).json({error:"person not found"})
}

console.log('data updated');
res.status(200).json(response);

  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
})

router.delete('/:id',async(req,res)=>{
  try{
    const personId = req.params.id;
    const response=await Person.findByIdAndDelete(personId);

    if(!response){
      res.status(404).json({error:'person not found'});
    }
    console.log('data deleted');
    res.status(200).json({message:'person deleted successfully', deletedData:response})
  }catch(err){
    console.log(err);
    res.status(500).json({error:'internal server error'});
  }
})

export default router;