const express = require('express');
const router = express.Router();
const {
  getReviewsByBook,
  addReview,
} = require('../controllers/reviewController');

// GET  /api/reviews/:bookId — all reviews for a book, newest first
// POST /api/reviews/:bookId — add a review to a book
router.route('/:bookId').get(getReviewsByBook).post(addReview);

module.exports = router;
