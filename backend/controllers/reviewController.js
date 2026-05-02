const Review = require('../models/Review');
const Book = require('../models/Book');

// @desc    Get all reviews for a book (newest first)
// @route   GET /api/reviews/:bookId
exports.getReviewsByBook = async (req, res, next) => {
  try {
    const { bookId } = req.params;

    // Verify the book exists
    const bookExists = await Book.findById(bookId);
    if (!bookExists) {
      const error = new Error('Book not found');
      error.status = 404;
      return next(error);
    }

    const reviews = await Review.find({ book: bookId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
};

// @desc    Add a review for a book
// @route   POST /api/reviews/:bookId
exports.addReview = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { user, rating, comment } = req.body;

    // Verify the book exists
    const bookExists = await Book.findById(bookId);
    if (!bookExists) {
      const error = new Error('Book not found');
      error.status = 404;
      return next(error);
    }

    const review = await Review.create({
      book: bookId,
      user,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (err) {
    next(err);
  }
};
