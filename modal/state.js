var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/examapp");

var stateSchema = new mongoose.Schema({
        state1: {
            type: String
        },
    },
    {
        usePushEach:true
    });



var state = mongoose.model('state', stateSchema);
module.exports = {state};

