const router = require("express").Router();
const Company = require("../models/Company.js");
const Review=require("../models/rev.js")

// Add company
router.post("/", async (req, res) => {
  try {
    console.log("BODY:", req.body); // 👈 ye add karo
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (error) {
    console.error("ADD COMPANY ERROR:", error);
    res.status(500).json({ message: error.message });
  }
});


router.get("/", async (req, res) => {
  const { search, city } = req.query;

  let query = {};
  if (search) query.name = { $regex: search, $options: "i" };
  if (city) query.city = city;

  const companies = await Company.find(query);

  // attach avg rating
  const result = await Promise.all(
    companies.map(async c => {
      const reviews = await Review.find({ companyId: c._id });
      const avg =
        reviews.reduce((a, b) => a + b.rating, 0) /
        (reviews.length || 1);

      return { ...c._doc, avgRating: avg.toFixed(1), totalReviews: reviews.length };
    })
  );

  res.json(result);
});

module.exports = router;
