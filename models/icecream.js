const mongoose = require("mongoose")
const iceCreamSchema = mongoose.Schema({
cone: String,
flavour: String,
price: Number
})
module.exports = mongoose.model("icecream",
iceCreamSchema)