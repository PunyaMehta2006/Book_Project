const Book = require('../models/Book');

// @desc    Get all books (with optional filtering)
// @route   GET /api/books
exports.getAllBooks = async (req, res, next) => {
  try {
    const { genre, search, exchange } = req.query;
    const filter = {};

    if (genre)    filter.genre = genre;
    if (exchange) filter.exchangeAvailable = true;
    if (search) {
      filter.$or = [
        { title:  { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } },
      ];
    }

    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json(books);
  } catch (err) {
    next(err);
  }
};

// @desc    Get a single book by ID
// @route   GET /api/books/:id
exports.getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id).populate(
      'exchangeWith',
      'title author image'
    );

    if (!book) {
      const error = new Error('Book not found');
      error.status = 404;
      return next(error);
    }

    res.json(book);
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new book listing
// @route   POST /api/books
exports.createBook = async (req, res, next) => {
  try {
    const {
      title,
      author,
      genre,
      price,
      exchangeAvailable,
      exchangeWith,
      description,
      image,
      seller,
    } = req.body;

    const book = await Book.create({
      title,
      author,
      genre,
      price,
      exchangeAvailable,
      exchangeWith: exchangeWith || null,
      description,
      image,
      seller,
    });

    res.status(201).json(book);
  } catch (err) {
    next(err);
  }
};

// @desc    Update all fields of a book listing
// @route   PUT /api/books/:id
exports.updateBook = async (req, res, next) => {
  try {
    const {
      title,
      author,
      genre,
      price,
      exchangeAvailable,
      exchangeWith,
      description,
      image,
      seller,
    } = req.body;

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      {
        title,
        author,
        genre,
        price,
        exchangeAvailable,
        exchangeWith: exchangeWith || null,
        description,
        image,
        seller,
      },
      { new: true, runValidators: true }
    );

    if (!book) {
      const error = new Error('Book not found');
      error.status = 404;
      return next(error);
    }

    res.json(book);
  } catch (err) {
    next(err);
  }
};

// @desc    Update exchange fields only
// @route   PATCH /api/books/:id/exchange
exports.updateExchange = async (req, res, next) => {
  try {
    const { exchangeAvailable, exchangeWith } = req.body;
    const update = {};

    if (exchangeAvailable !== undefined) {
      update.exchangeAvailable = exchangeAvailable;
    }

    // Check key existence explicitly to allow setting null
    if ('exchangeWith' in req.body) {
      update.exchangeWith = exchangeWith || null;
    }

    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true, runValidators: true }
    ).populate('exchangeWith', 'title author image');

    if (!book) {
      const error = new Error('Book not found');
      error.status = 404;
      return next(error);
    }

    res.json(book);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a book listing
// @route   DELETE /api/books/:id
exports.deleteBook = async (req, res, next) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);

    if (!book) {
      const error = new Error('Book not found');
      error.status = 404;
      return next(error);
    }

    res.json({ message: 'Book listing deleted successfully' });
  } catch (err) {
    next(err);
  }
};
