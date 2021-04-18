const express=require('express');
const router=express.Router();
const Favorite=require('../models/favorite_model');
const{check, validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');




router.post('/favorite/insert',
auth.verifyUser, 
function(req,res){
    const errors = validationResult(req)
    if(errors.isEmpty()){
        const user_id=req.body.user_id;
        const pet_id= req.body.pet_id;
            const data=new Favorite(
                {
                    user_id:user_id,
                    pet_id:pet_id
                }
            );
            data.save()
            .then(function(result){
                res.status(201).json({message : "Added to Favorites!!"})
            
            })
            .catch(function(err){
                res.status(500).json({error : err})
            })
                }
        else{
            // res.send(errors.array())
            res.status(400).json(errors.array());
        }   
        })


router.get('/favorite/show/',function(req,res){
    Favorite.find().populate("pet_id").then(function(data){
        res.json({
            success : true,
            data  : data
        })
    })
})

router.delete('/favorite/delete/:id',
auth.verifyUser,
 function(req,res){
    const id22=req.params.id;
    Favorite.deleteOne({_id:id22})
    .then(function(){
        res.send("deleted!!");
    })
    .catch(function(e){
        res.status(500).json({error:e})
    })
})




router.get('/favorite/singleshow/:userid',
auth.verifyUser,  
async function(req,res){
    const fav_user_id = req.params.userid;
    console.log(fav_user_id)
    await Favorite.find({user_id:fav_user_id}).populate("pet_id")
    .then(function(data){ 
        res.status(200).json({data:data})
        console.log(data)
    }).catch(function(e){
        res.status(500).json({error : e})
    })
})



router.get('/favorite/check/:userid/:petid',
auth.verifyUser,  
async function(req,res){
    const fav_user_id = req.params.userid;
    const fav_pet_id = req.params.petid;
    await Favorite.find({pet_id:fav_pet_id, user_id:fav_user_id})
    .then(function(data){ 
        res.status(200).json({data:data})
        console.log(data)
    }).catch(function(e){
        res.status(500).json({error : e})
    })
})


module.exports=router;