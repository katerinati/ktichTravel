const {Schema, model} = require('mongoose');


const PropertySchema = new Schema({
    propertyId: {type: Number, required: true},
    title: {type: String, required: true},
    description: {type: String},
    price: {type: Number, required: true},
    rating: {type: Number},
    superhost: {type: Boolean, default: false},
    location: {type: String, required: true},
    capacity: {type: {people: {type: Number}, bedroom: {type: Number}}},
    image: {type: String, required: true},
})
module.exports = model('Property', PropertySchema)