const mongoose = require('mongoose')

const addVehicleSchema = new mongoose.Schema({
    brand: { 
        type: 'string',
        required: true
    },
    model: { 
        type: 'string',
        required: true
    },
    color: {
        type: 'string',
        required: true
    },
    seats: { 
        type: 'string',
        required: true
    },
    plate: {
        type: 'string',
        required: true
    },
    type: {
        type: 'string',
        required: true
    }
})

module.exports = mongoose.model('vehicle', addVehicleSchema)