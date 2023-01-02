const mongoose = require('mongoose');

const addBusinessPointSchema = new mongoose.Schema({
    businessPointTrip: {
        type: 'string',
        required: true
    }
})


module.exports = mongoose.model('businessPoint', addBusinessPointSchema)

