const express = require('express')
const Apartment = require('../models/apartment');

const router = express.Router()

//Apartment Registration 
router.post('/apartment', async(req, res)=>{
  try{
    const apartment = new Apartment({...req.body})
    await apartment.save()
    res.status(200).send({msg : 'Successfully Submitted', apartment})
  }catch(e){
    res.status(400).send(e.message)
  }
})

// Fetch all apartment
router.get('/apartment', async(req, res)=>{
  try{
    const apartments = await Apartment.find()
    res.status(200).send(apartments)
  }catch(e){
    res.status(400).send(e)
  }
})


//Apartment Deletion
router.post('/apartment/del/:id', async(req, res)=>{
  try{
    await Apartment.findByIdAndDelete(req.params.id)
    res.status(200).send({msg : 'Successfully Deleted'})
  }catch(e){
    res.status(400).send(e)
  }
})


//Apartment Modification By id
router.post('/apartment/edit/:id', async(req, res)=>{

  const updates = Object.keys(req.body)
  const allowedUpdates = ['apartNo', 'apartName', 'floorNo', 'buildingName',
  'address', 'city', 'apartAreaSqFeet', 'noOfRooms', 'balcony' ]

  const isValidOperation = updates.every((update)=> allowedUpdates.includes(update) )
  if(!isValidOperation){
    return res.send(404).send({error: 'Invalid updates'})
  }

  try{
    const apartment =await Apartment.findByIdAndUpdate({_id: req.params.id}, req.body)
    res.status(200).send({apartment , msg : 'Successfully Modified'})
  }catch(e){
    res.status(400).send(e.message)
  }

})

module.exports = router;