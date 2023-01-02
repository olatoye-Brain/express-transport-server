const mongoose = require('mongoose')

const addTripSchema = new mongoose.Schema({
    destination:{
        type: 'string',
        required: true
    },
    takeOffTime: {
        type: 'string',
        required: true
    },
    takeOffPoint: {
        type: 'string',
        required: true
    },
    takeOffDate: {
        type: 'string',
        required: true
    },
    vehicleToUse: {
        type: 'string',
        required: true
    },
    completed: {
        type: 'boolean',
        required: true
    },
    cancelled: {
        type: 'boolean',
        required: true
    },
    price: {
        type: 'string',
        required: true
    },
    tripStarted: { 
        type: 'boolean',
        required: true
    },
    tripTimeAndDate: {
        type: 'array',
        required: true
    },
    bookings: []
})

module.exports = mongoose.model('trip', addTripSchema)