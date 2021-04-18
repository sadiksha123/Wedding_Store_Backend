const mongoose=require('mongoose');

const Pet=mongoose.model('Pet',{
    pet_name:{
        type : String,
        required : true
    },
    pet_species:{
        type:String,
        required : true
    },
    pet_gender:{
        type:String,
        required : true
    },
    pet_img:{
        type:String,
        required : true
    },
    pet_bd:{
        type : String,
        required : true
    },
    pet_fee:{
        type : String,
        required : true
    },
    pet_location:{
        type : String,
        required : true
    },
    pet_contactno:{
        type : String,
        required : true
    },
    pet_info:{
        type : String,
        // required : true
    },
})
module.exports=Pet;