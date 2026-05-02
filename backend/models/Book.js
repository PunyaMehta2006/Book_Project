const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    genre: {
      type: String,
      required: [true, 'Genre is required'],
      enum: {
        values: ['Fiction', 'Non-fiction', 'Sci-fi', 'Romance', 'Academic', 'Self-help'],
        message: '{VALUE} is not a supported genre',
      },
    },
    price: {
      type: Number,
      default: null,
      min: [0, 'Price cannot be negative'],
    },
    exchangeAvailable: {
      type: Boolean,
      default: false,
    },
    exchangeWith: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      default: null,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    seller: {
      name: {
        type: String,
        required: [true, 'Seller name is required'],
        trim: true,
      },
      email: {
        type: String,
        required: [true, 'Seller email is required'],
        trim: true,
        lowercase: true,
      },
      phone: {
        type: String,
        trim: true,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
