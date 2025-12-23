const router = require("express").Router();
const Review = require("../models/rev");

// Add review
router.post("/", async (req, res) => {
  const review = await Review.create(req.body);
  res.json(review);
});

// Get reviews by company
router.get("/:companyId", async (req, res) => {
  const { sort } = req.query;

  let sortOption = { createdAt: -1 }; 

  if (sort === "rating") {
    sortOption = { rating: -1 };
  }

  const reviews = await Review
    .find({ companyId: req.params.companyId })
    .sort(sortOption);

  const avg =
    reviews.reduce((a, b) => a + b.rating, 0) /
    (reviews.length || 1);

  res.json({
    averageRating: avg.toFixed(1),
    totalReviews: reviews.length,
    reviews
  });
});

router.patch("/like/:id", async (req, res) => {
  const review = await Review.findById(req.params.id);
  review.likes += 1;
  await review.save();
  res.json({ likes: review.likes });
});



module.exports = router;
