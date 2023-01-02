const User = require('../model/user')
const Location = require('../model/location')
const BusinessPoint = require('../model/businessPoint')
const Trip = require('../model/trip')
const Vehicle = require('../model/vehicle')
const Product = require('../model/location')
const { validateLocation, validateBusinessPoint, validateVehicle, validateTrip } = require('../middleware/validate')

//Add Business Point Desitination
//user account


module.exports.addLocation = async (req, res) => { 
    const { newLocation } = req.body
    // console.log(req)
    console.log(newLocation)
    
    console.log(newLocation)
    try{
        const { details } = await validateLocation(newLocation)
        if(!details){
            const data = await Location.create({...newLocation})
            res.status(201).json({success: true, message: 'Location added successfully', data: data})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, message: err})
    }
}
//Add Business Point Location
module.exports.addBusinessPoint = async (req, res) => {
    const { newBusinessPoint } = req.body
    try{
        const { details } = await validateBusinessPoint(newBusinessPoint)
        if(!details){
            const data = await BusinessPoint.create({...newBusinessPoint})
            res.status(201).json({success: true, message: 'BusinessPoint added successfully', data: data})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, message: err})
    }
}


//Add Vehicle
module.exports.addVehicle = async (req, res) => {
    const { newVehicle } = req.body
    try{
        const { details } = await validateVehicle(newVehicle)
        if(!details){
            const data = await Vehicle.create({...newVehicle})
            res.status(201).json({success: true, message: 'Vehicle added successfully', data: data})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, message: err})
    }
}

//Add Trip
module.exports.addTrip = async (req, res) => {
    const { newTrip } = req.body
    try{
        const { details } = await validateTrip(newTrip)
        if(!details){
            const data = await Trip.create({...newTrip})
            res.status(201).json({success: true, message: 'Trip added successfully', data: data})
        }
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, message: err})
    }
}

//Get All Trip
module.exports.getAllTrips = async (req, res) => {
    try {
        const data = await Trip.find()
        res.status(200).json({ success: true, data: data })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
}

//find one Trip
module.exports.getOneTrip = async (req, res) => {
    // const { tripId: { id } } = req.body
    const { id } = req.params
    console.log(id)
    try {
        const data = await Trip.findOne({_id: id})
        res.status(200).json({ success: true, data: data })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
}

//Get all Vehicles
module.exports.getAllVehicle = async (req, res) => {
    try {
        const data = await Vehicle.find()
        res.status(200).json({ success: true, data: data })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
}

//Get all BusinessPoint
module.exports.getAllBusinessPoint = async (req, res) => {
    try {
        const data = await BusinessPoint.find()
        res.status(200).json({ success: true, data: data })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
}

//Get all Locations
module.exports.getAllLocation = async (req, res) => {
    try {
        const data = await Location.find()
        res.status(200).json({ success: true, data: data })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
}



//delete trip
module.exports.deleteTrip = async (req, res) => {
    const { id }  = req.params
    console.log(req.params)
    try {
        const data = await Trip.deleteOne({ _id: id })
        res.status(201).json({ success: true, message: 'Vehicle deleted successfully', data: data })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
}

//delete Vehicle
module.exports.deleteVehicle = async (req, res) => {
    const { id } = req.params
    console.log(req.params)
    try {
        // const more = await Vehicle.findOne({_id: id})
        const data = await Vehicle.deleteOne({_id: id})
        res.status(201).json({ success: true, message: 'Vehicle deleted successfully', data: data })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
}

//delete businessPoint
module.exports.deleteBusinessPoint = async (req, res) => {
        const { id } = req.params

    try {
        const data = await BusinessPoint.deleteOne({ _id: id })
        res.status(201).json({ success: true, message: 'Vehicle deleted successfully', data: data })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
}

//delete location
module.exports.deleteLocation = async (req, res) => {
        const { id } = req.params
    try {
        const data = await Location.deleteOne({ _id: id })
        res.status(201).json({ success: true, message: 'Vehicle deleted successfully', data: data })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
}

//get all trips
module.exports.products = async (req, res) => {
    try{
        const data = await Product.find()
        res.status(200).json(data)
    }catch(err){
        console.log(err)
    }
}

//book a passenger
module.exports.bookUserInTrip = async (req, res) => {
    const { id } = req.params
    const { bookedTrip : {book}} = req.body
    console.log(book)
    console.log(`trip Id: ${id} `)
    
     try{
        const data = await Trip.updateOne({_id: id}, { $addToSet: {  bookings: book } } )
        res.status(201).json({ success: true, message: 'Trip booked successfully', data: book })
    }catch(err){
        console.log(err)
        res.status(500).json({ success: false })
    }
}


//update user payment on expressCards using paystack
module.exports.userPaymentCard = async (req, res) => { 
    // const { id, amount } = req.body
    const { userDetails: { id, amount} }  = req.body
    console.log(req.body)

    try { 
        let resp = await User.findById(id)
        console.log(typeof(resp.expressCards.credit))
        console.log(typeof(amount))
        resp.expressCards.credit += parseInt(amount)
        const response  = await resp.save()
        console.log(response)
        res.status(201).json({ success: true, message: 'Account credited successfully', data: response })
    // console.log(resp)
    }catch(err){
        console.log(err)        
        res.status(500).json({ success: false })
    }
}

//update user payment on expressCards using paystack
module.exports.payWithExpressCard = async (req, res) => { 
    // const { id, amount } = req.body
    const { userDetails: { id, amount} }  = req.body
    console.log(req.body)

    try { 
        let resp = await User.findById(id)
        console.log(typeof(resp.expressCards.credit))
        console.log(typeof(amount))
        resp.expressCards.credit -= parseInt(amount)
        const response  = await resp.save()
        console.log(response)
        res.status(201).json({ success: true, message: 'Payment made was successfull', data: response })
    // console.log(resp)
    }catch(err){
        console.log(err)        
        res.status(500).json({ success: false })
    }
}