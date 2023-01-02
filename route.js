const { Router } = require('express')
const businessController = require('./controller/business-controller')
const accountController = require('./controller/account-controller')

const router = Router()


//BusinessController
router.post('/add-location', businessController.addLocation )
router.post('/add-vehicle', businessController.addVehicle)
router.post('/add-businesspoint', businessController.addBusinessPoint)
router.post('/add-trip', businessController.addTrip)
router.get('/', businessController.getAllTrips)
router.get('/vehicles', businessController.getAllVehicle)
router.get('/business-points', businessController.getAllBusinessPoint)
router.get('/locations', businessController.getAllLocation)
router.get('/trip/:id', businessController.getOneTrip)
router.delete('/delete-vehicle/:id', businessController.deleteVehicle)
router.delete('/delete-location/:id', businessController.deleteLocation)
router.delete('/delete-business-point/:id', businessController.deleteBusinessPoint)
router.delete('/delete-trip/:id', businessController.deleteTrip)
router.put('/book-user/:id', businessController.bookUserInTrip)
router.post('/user-payment', businessController.userPaymentCard)
router.post('/pay-with-express', businessController.payWithExpressCard)

//user-loggin
router.post('/admin-setup', accountController.createSuperAdminAccount)
router.post('/update-super-user-account', accountController.updateSuperAdminAccount)
router.get('/super-admin', accountController.getSuperAdmin)
router.post('/admin-login', accountController.adminLogin )
router.post('/signup', accountController.createAccount )
router.post('/signin', accountController.userLogin )
router.get('/users', accountController.getAllUsers)
router.delete('/delete-user/:id', accountController.deleteUser)
router.put('/book-trip/:id', accountController.bookTrip)
router.put('/remove-booktrip/:id', accountController.removeUserBookedTrip)
router.post('/trip-status', accountController.updateTripStatus)
router.post('/trip-cancel', accountController.cancelListedTrip)
router.post('/launch-trip', accountController.launchTrip)
module.exports = router

