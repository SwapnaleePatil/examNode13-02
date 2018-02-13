var mongoose = require('mongoose');
var validator = require('validator');
const _ = require('lodash');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/examapp");

var userSchema = new mongoose.Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    email: {
        type: String,
        validate: {
            validator: validator.isEmail,
            message: '{Value} is not valid Email'
        }
    },
    state1: {
        type: String
    },
    city: {
        type: String
    },
    flag:{
        type:Boolean,
        default:true
    }
},
{
    usePushEach:true
});



var user = mongoose.model('user', userSchema);
module.exports = {user};

