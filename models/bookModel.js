const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  ISBN: { type: String, unique: true, required: true },
  availableCopies: { type: Number, required: true, default: 1 },
  totalCopies: { type: Number, required: true },
  genre: { type: String, required: true },
  borrowedCount: { type: Number, default: 0 }, // Tracks how many times it has been borrowed
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;