const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true,
        required: true
    },
    importance: {
        type: Number,
        required: true
    },
    dateAdded: {
        type: Date,
        required: true
    },
    lastUpdate: {
        type: Date,
        required: true
    }
});

module.exports = mongoose.model('todo', todoSchema);