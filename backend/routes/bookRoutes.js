const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  updateExchange,
  deleteBook,
} = require('../controllers/bookController');

// GET    /api/books         — all books (supports ?genre=, ?search=, ?exchange=true)
// POST   /api/books         — create new listing
router.route('/').get(getAllBooks).post(createBook);

// PATCH  /api/books/:id/exchange — update exchange fields only
// (must be defined BEFORE /:id to avoid route conflict)
router.patch('/:id/exchange', updateExchange);

// GET    /api/books/:id     — single book with populated exchangeWith
// PUT    /api/books/:id     — full update
// DELETE /api/books/:id     — remove listing
router.route('/:id').get(getBookById).put(updateBook).delete(deleteBook);

module.exports = router;
