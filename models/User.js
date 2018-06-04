const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
const {Schema} = mongoose; //ES2015 destructuring 

const userSchema = new Schema({
    googleID: String
});

mongoose.model('users', userSchema);