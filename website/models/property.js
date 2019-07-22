const mongoose = require('mongoose')

// first we create the schema
const propertySchema = new mongoose.Schema({
    propertyName: String,
    propertyPrice: String,
    propertyAddress: String,
    tokenSymbol: String,
    totalSupply: String,
    ethPrice: String,
    propertyDescription: String,
    propertyImage: String
})
  
// then we add and export the model
module.exports = mongoose.model('Property', propertySchema)