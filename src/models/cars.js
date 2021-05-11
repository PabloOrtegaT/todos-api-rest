const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    make: String,
    model: String,
    year: Number,
    // Un auto puede pertenecer solo a un usuario
    // mientras que un usuario puede tener un array de autos
    seller: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    }
});

module.exports = mongoose.model('car', carSchema);