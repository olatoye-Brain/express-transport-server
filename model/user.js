const mongoose = require('mongoose');

const expressCardSchema = mongoose.Schema({
   
})

const userSchema = new mongoose.Schema({
  username: { 
      type: 'string',
      required: true
  },
  password: {
      type: 'string',
      required: true
     },
  bookTrips: [],
  expressCards: {
    cardNumber: 'number',
    cardName: 'string',
    cardPin: 'string',
    credit: 'number'
  }
});


module.exports = mongoose.model('user', userSchema)