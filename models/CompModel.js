const mongoose = require('mongoose');

const compSchema = mongoose.Schema({
    userid: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "users"
    },
    wno : {
        type : Number
    },
    title : {
        type : String,
        required : true
    },
    desc : {
        type : String,
        required : true
    },
    githublink : {
        type : String
    }
})

module.exports = mongoose.model('comps',compSchema)