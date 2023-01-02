const User = require('../model/user')
const Trip = require('../model/trip')
const { validateUser, validateAdmin, validateAdminLogin } = require('../middleware/validate')
const Admin = require('../model/admin')



module.exports.createSuperAdminAccount = async (req , res) => { 

        const dataAdmin = { 
            username : process.env.SUPER_ADMIN_USERNAME,
            password: process.env.SUPER_ADMIN_PASSWORD,
            role: 'superadmin'
        }
        const findRoleExist = await Admin.findOne({role: dataAdmin.role})
        if(findRoleExist) {
            res.status(200).json({success: true, message: 'super admin already exists'})
            return
        }
            

    try { 
         const { details } = await validateAdmin(dataAdmin)
        if(!details){
            
            const data = await  Admin.create({...dataAdmin})
            res.status(201).json({success: true, message: 'User created successfully', data: data })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, message: err})
    }
}
  
//get super admin to avoid setup
//Get All Trip
module.exports.getSuperAdmin = async (req, res) => {
    try {
        const data = await Admin.findOne({role: 'superadmin'})
        if(data){
            res.status(200).json({ success: true, data: data })
        }else{
            res.status(200).json({ success: false })
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
}

//update super admin Account
module.exports.updateSuperAdminAccount = async (req, res) => { 
    const { superAdminDetails } = req.body
    console.log(superAdminDetails)
    const superAdmin = await Admin.findOne({role: "superadmin"})

    if(!superAdmin){
        res.status(200).json({success: true, message: 'super admin already exists'})
        return
    }
    
    try{
        superAdmin.username = superAdminDetails.username;
        superAdmin.password = superAdminDetails.password;
        const response = await superAdmin.save()
        res.status(201).json({ success: true, message: 'Admin account created successfullly', data: response })
    }catch(err){
        console.log(err)
        res.status(500).json({ success: false })
    }
}

//Admin_Login
module.exports.adminLogin = async (req, res) => {
    // {res.status(200).json({success: true, user: true})}
    const { adminDetails } = req.body
    const data = await Admin.findOne({username: adminDetails.username})
    console.log(`DATA: ${data}`)
    if(!data){
        res.status(200).json({success: false, message: "Incorrect username or password"})
        return
    }
    if(data?.password !== adminDetails.password){
        res.status(200).json({success: false, message: "Incorrect username or password"})
        return
    }
    // if(data.role === 'superadmin') adminDetails.role = 'superadmin'
    //validate input form
   try{ 
       const { details } = await validateAdminLogin(adminDetails)
        if(!details){
            console.log(data)
            res.status(201).json({success: true, message: 'Admin loggin successfully', data: data })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, message: err})
    }
}

//User_Login
module.exports.userLogin = async (req, res) => {
    // {res.status(200).json({success: true, user: true})}
    const { userDetails } = req.body
    const data = await User.findOne({username: userDetails.username})
    console.log(`DATA: ${data}`)
    if(!data){
        res.status(200).json({success: false, message: "Incorrect username or password"})
        return
    }
    if(data?.password !== userDetails.password){
        res.status(200).json({success: false, message: "Incorrect username or password"})
        return
    }
    // if(data.role === 'superadmin') adminDetails.role = 'superadmin'
    //validate input form
   try{ 
       const { details } = await validateUser(userDetails)
        if(!details){
            console.log(data)
            res.status(201).json({success: true, message: 'User loggin successfully', data: data })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, message: 'Incorrect username or password'})
    }
}

//create Account
module.exports.createAccount = async (req, res) => { 
    const { userDetails } = req.body
    console.log(userDetails)

    try { 
         const { details } = await validateUser(userDetails)
        if(!details){
            const data = await  User.create({...userDetails})
            res.status(201).json({success: true, message: 'User created successfully', data: data })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({success: false, message: 'Incorrect username or password'})
    }
}

//Get All Trip
module.exports.getAllUsers = async (req , res) => {
    try {
        const users = await User.find()
        res.status(200).json({ success: true, users: users})
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
}

//delete User
module.exports.deleteUser = async (req, res) => {
    const { id } = req.params
    console.log(req.params)
    try {
        // const more = await Vehicle.findOne({_id: id})
        const data = await User.deleteOne({_id: id})
        res.status(201).json({ success: true, message: 'User deleted successfully', data: data })
    } catch (err) {
        console.log(err)
        res.status(500).json({ success: false })
    }
}

//bookedTrip
module.exports.bookTrip = async (req, res) => {
    const { id } = req.params
    const { bookedTrip : {book}} = req.body
    console.log(book)
    console.log( id )
     try{
        const data = await User.updateOne({_id: id}, { $addToSet: {  bookTrips: book } } )
        res.status(201).json({ success: true, message: 'Trip booked successfully', data: book })
    }catch(err){
        res.status(500).json({ success: false })
    }
}

//UserBooked
//decrease order quantity
module.exports.removeUserBookedTrip = async (req, res) => { 
    const { id } =  req.params
    console.log(req.params)
    const { seatNumber } = req.body
    console.log(seatNumber)
    try { 
        const resp = await User.findById(id)
        resp.bookTrips = resp.bookTrips.filter( book => book.seat !== seatNumber.seat)
        const response = await resp.save()
        res.status(201).json({ success: true, message: 'Trip removed successfully' })
    // console.log(resp)
    }catch(err){
        console.log(err)        
        res.status(500).json({ success: false })

    }
}

//update Trip status
module.exports.updateTripStatus = async (req, res) => { 
    console.log(req.body)
    const { tripId }  = req.body
    try { 
        let resp = await Trip.findById(tripId)
        resp.completed = !resp.completed;
        if (resp.completed === true) { resp.cancelled = false }        
        const response  = await resp.save()
        console.log(response)
        res.status(201).json({ success: true, message: 'Trip status updated successfully' })
    // console.log(resp)
    }catch(err){
        console.log(err)        
        res.status(500).json({ success: false })
    }
}

//cancel trip (invalid)
module.exports.cancelListedTrip = async (req, res) => { 
    console.log(req.body)
    const { tripId }  = req.body
    try { 
        let resp = await Trip.findById(tripId)
        resp.cancelled = !resp.cancelled;
        if (resp.cancelled === true) { resp.completed = false }        
        const response  = await resp.save()
        console.log(response)
        res.status(201).json({ success: true, message: 'Trip status updated successfully' })
    // console.log(resp)
    }catch(err){
        console.log(err)        
        res.status(500).json({ success: false })
    }
}

//cancel trip (invalid)
module.exports.launchTrip = async (req, res) => { 
    console.log(req.body)
    const { tripId }  = req.body
    try { 
        let resp = await Trip.findById(tripId)
        resp.tripStarted = !resp.tripStarted;
         if (resp.cancelled === true) { resp.cancelled = false }
        const response  = await resp.save()
        console.log(response)
        res.status(201).json({ success: true, message: 'Trip has started successfully' })
    // console.log(resp)
    }catch(err){
        console.log(err)        
        res.status(500).json({ success: false })
    }
}





