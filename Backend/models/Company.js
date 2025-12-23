const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  city: String,
  foundedOn: String,
  logo: String
});

module.exports = mongoose.model("Company", companySchema);
