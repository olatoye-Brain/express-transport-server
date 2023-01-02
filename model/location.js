const mongoose = require('mongoose');

const addLocationSchema = new mongoose.Schema({
  location: {
      type: 'string',
      required: true
  }
})


module.exports = mongoose.model('location', addLocationSchema)
 
