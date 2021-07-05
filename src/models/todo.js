const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        trim: true
    },
    completionDate:{
        type: Date
    },
    completed: {
        type: Boolean
    },
    dateAdded: {
        type: Date
    },
    lastUpdate: {
        type: Date
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('todo', todoSchema);