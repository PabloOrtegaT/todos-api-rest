const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    todos: [{
        type: Schema.Types.ObjectId,
        ref: 'todo'
    }]
});

module.exports = mongoose.model('user', userSchema);