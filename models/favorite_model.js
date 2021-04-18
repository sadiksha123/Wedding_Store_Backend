const mongoose = require('mongoose');
const Schema = mongoose.Schema

const favoriteSchema = new Schema({
    user_id: {
        type: String,
        required: true
    },
    pet_id: {
        type: Schema.Types.ObjectId,
        required: true,
        ref:"Pet"
    }
})
const Favorite = new mongoose.model('Favorite', favoriteSchema)
module.exports = Favorite;