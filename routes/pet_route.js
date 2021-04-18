const express=require('express');
const router=express.Router();
const Pet=require('../models/pet_model');
const{check, validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth')
const upload = require('../middleware/fileupload')

router.post('/pet/insert', upload.single('pet_img'),
auth.verifyUser, auth.verifyAdmin, 
[
    check('pet_name','Pet name is required').not().isEmpty(),
    check('pet_species','Species is required').not().isEmpty(),
    check('pet_gender','Gender is required').not().isEmpty(),
    check('pet_bd','Birth date is required').not().isEmpty(),
    check('pet_fee','Adoption fee is required').not().isEmpty(),
    check('pet_location','Location is required').not().isEmpty(),
    check('pet_contactno','Contact no is required').not().isEmpty(),
    // check('pet_img','Image is required').not().isEmpty(),
],
function(req,res)
{
    if(req.file==undefined){
        return res.status(400).json({
            message: "Invalid file format" 
        })
    }
    const errors = validationResult(req)
    
    if(errors.isEmpty()){
        const pet_name=req.body.pet_name;
        const pet_species= req.body.pet_species;
        const pet_gender=req.body.pet_gender;
        const pet_bd=req.body.pet_bd;
        const pet_fee=req.body.pet_fee;
        const pet_location=req.body.pet_location;
        const pet_contactno=req.body.pet_contactno;
        const pet_info=req.body.pet_info;
        const pet=new Pet(
        {
            pet_name:pet_name,
            pet_species:pet_species,
            pet_gender:pet_gender,
            pet_bd:pet_bd,
            pet_fee:pet_fee,
            pet_location:pet_location,
            pet_contactno:pet_contactno,
            pet_img:"/pictures/"+req.file.filename,
            pet_info:pet_info
        });
    pet.save()
    .then(function(result){
        res.status(201).json({message : "Pet Registered Successfully!!"})
    
    })
    .catch(function(err){
        res.status(500).json({error : err})
    })
    }
else{
     res.send(errors.array())
    // res.status(400).json(errors.array());
}   
})


router.delete('/pet/delete/:id',  
auth.verifyUser, auth.verifyAdmin,
function(req,res){
    const id=req.params.id;
    Pet.deleteOne({_id:id})
    .then(function(){
        res.send("deleted!!");
    })

})


// router.put('pet/update/:id',function(req,res){
//     const id=req.params.id;
//     Pet.updateOne({_id:id},req.body).then(function(){
//         res.status(200).json({
//             success : true,
//             message:"Success"
//         })    
//     }).catch((error)=>{
//         res.status(404).json({
//             error:"error"
//         })
//     })

// })


router.put('/pet/update/:id', 
auth.verifyUser, auth.verifyAdmin,
function(req,res){
    const pet_name = req.body.pet_name
    const pet_species = req.body.pet_species
    const pet_gender = req.body.pet_gender
    const pet_bd = req.body.pet_bd
    const pet_fee = req.body.pet_fee
    const pet_location = req.body.pet_location
    const pet_contactno = req.body.pet_contactno
    const pet_info = req.body.pet_info
    const pet_id = req.params.id

    Pet.updateOne({_id : pet_id},
        {pet_name : pet_name, pet_species:pet_species, pet_gender: pet_gender, pet_bd:pet_bd, pet_fee: pet_fee,pet_location : pet_location, pet_contactno:pet_contactno, pet_info: pet_info}
        )
        .then(function(){
            res.status(200).json({message:"Updated"})
        })
        .catch(function(e){
            res.status(500).json({error:e})
        })
})

router.get('/pet/show',function(req,res){
    Pet.find()
    .then(function(data){
        res.json({
            success : true,
            data  : data
        })
    })
})

router.get('/pet/singleshow/:id',
//auth.verifyUser,
function(req,res){
    const pet_id = req.params.id;
    Pet.findOne({_id:pet_id}).then(function(data){
        res.status(200).json(
            {
                success:true,data:[data]
            }
        )
    }).catch(function(e){
        res.status(500).json({error : e})
    })
})

module.exports=router;