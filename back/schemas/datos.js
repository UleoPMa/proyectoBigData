const Mongoose = require('mongoose');

const datos = new Mongoose.Schema({
    id:{
        type: String
    },
    description: {
        type: String
    },
    amount: {
        type: Number
    },
    user: {
        type: String
    }
});

const Datos = Mongoose.model('datos',datos);

module.exports = {Datos};