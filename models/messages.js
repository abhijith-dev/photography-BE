const { Schema,model } = require('mongoose');

const MessagesSchema = new Schema({
    name : String,
    phone : String,
    msg : String,
    email: String
});

module.exports = model('message',MessagesSchema);