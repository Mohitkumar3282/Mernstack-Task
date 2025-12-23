const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company"
  },
  likes: {
  type: Number,
  default: 0
},

  name: String,
  subject: String,
  review: String,
  rating: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Review", reviewSchema);
