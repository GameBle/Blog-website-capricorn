const mongoose = require('mongoose');
Schema=mongoose.Schema;

const commentSchema = mongoose.Schema({
    blog:{
        type: Schema.Types.ObjectId,
        ref: 'Blog'
    },
    message:{
        type:String,
        required:true,
    },
    sendBy:{
        type:String,
        required:true,
    },
    reply:[{
        message:{
            type:String
        },
        sendBy:{
            type:String
        },
    }]
},{
    timestamp:true,
})

const Comment = mongoose.model('Comment',commentSchema);
module.exports = Comment;