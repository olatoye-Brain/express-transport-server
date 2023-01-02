const Joi = require('joi')

const validateLocation =  data => {
    const JoiSchema = Joi.object({
        location: Joi.string().min(3).max(15).required()
    })
    return JoiSchema.validateAsync(data) 
}
const validateBusinessPoint =  data => {
    const JoiSchema = Joi.object({
        businessPointTrip: Joi.string().min(3).max(15).required()
    })
    return JoiSchema.validateAsync(data) 
}
const validateVehicle =  data => {
    const JoiSchema = Joi.object({
        brand: Joi.string().min(4).required(),
        model: Joi.string().min(4).required(),
        color: Joi.string().min(4).required(),
        plate: Joi.string().min(4).required(),
        seats: Joi.string().min(2).required(),
        type: Joi.string().min(2).required(),
    })

    return JoiSchema.validateAsync(data) 
}
const validateTrip =  data => {
    const JoiSchema = Joi.object({
        takeOffTime: Joi.string().min(4).required(),
        takeOffPoint: Joi.string().min(3).required(),
        takeOffDate: Joi.string().min(3).required(),
        destination: Joi.string().min(1).required(),
        vehicleToUse: Joi.string().min(1).required(),
        completed: Joi.boolean().default(false),
        cancelled: Joi.boolean().default(false),
        tripStarted: Joi.boolean().default(false),
        tripTimeAndDate: Joi.array().min(2).required(),
        price: Joi.string().min(4).required(),
    })

    return JoiSchema.validateAsync(data) 
}

const validateUser =  data => {
    const JoiSchema = Joi.object({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(4).required(),
        expressCards: {
            cardNumber: Joi.number().min(4).required(),
            cardName: Joi.string().min(4).required(),
            cardPin: Joi.number().min(4).required(),
            credit: Joi.number().min(4).required()
        }
    })

    return JoiSchema.validateAsync(data) 
}

const validateAdmin =  data => {
    const JoiSchema = Joi.object({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(4).required(),
        role: Joi.string().min(4).required()
    })

    return JoiSchema.validateAsync(data) 
}

const validateAdminLogin =  data => {
    const JoiSchema = Joi.object({
        username: Joi.string().min(4).required(),
        password: Joi.string().min(4).required(),
    })

    return JoiSchema.validateAsync(data) 
}

module.exports =  { validateLocation, validateBusinessPoint, validateVehicle, validateTrip, validateUser, validateAdmin, validateAdminLogin }

