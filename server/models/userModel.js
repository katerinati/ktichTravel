const {Schema, model} = require('mongoose');

const UserSchema = new Schema({
    id: {type: Schema.Types.ObjectId, ref: 'User'},
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    age: {type: String},
    dreamCountry: {type: String},
})
module.exports = model('User', UserSchema);