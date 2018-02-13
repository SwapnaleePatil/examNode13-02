var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/examapp");

var citySchema = new mongoose.Schema({
        city: {
            type: String
        },
        state1: {
            type: String
        },

    },
    {
        usePushEach:true
    });



var city = mongoose.model('city', citySchema);
module.exports = {city};

