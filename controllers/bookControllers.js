const Book = require('../models/bookModel');

const addBook = async (req, res) => {
  const { title, author, ISBN, totalCopies, genre } = req.body;
  const newBook = new Book({ title, author, ISBN, totalCopies, availableCopies: totalCopies, genre });
  try {
    await newBook.save();
    res.status(201).send({
      success: true,
      message: 'Book added successfully',
      data: newBook
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: 'Could not add book',
      error
    });
  }
};

const getBooks = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).send({
      success: true,
      message: 'Books retrieved successfully',
      data: books
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: 'Could not retrieve books',
      error
    });
  }
};

const getFilteredBook = async (req, res) => {
  try {
    const { title, genre, author, borrowedCount } = req.query;
    let filter = {};

    if (title) {
      filter.title = { $regex: title, $options: 'i' }; // Case-insensitive search
    }
    if (genre) {
      filter.genre = { $regex: genre, $options: 'i' };
    }
    if (author) {
      filter.author = { $regex: author, $options: 'i' };
    }
    if (borrowedCount) {
      filter.borrowedCount = { $gte: Number(borrowedCount) }; // Get books borrowed at least X times
    }

    const books = await Book.find(filter);
    res.status(200).send({
      success: true,
      message: 'Filtered Books retrieved successfully',
      data: books
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addBook, getBooks, getFilteredBook };