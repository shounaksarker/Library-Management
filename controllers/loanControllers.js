const Loan = require('../models/loanModel');
const User = require('../models/userModel');
const Book = require('../models/bookModel');
const { LOAN_PERIOD, STATUS } = require('../constant');

const borrowBook = async (req, res) => {
  const userId = req.user;
  const { bookId } = req.body;

  try {
    const book = await Book.findById(bookId);

    if(!book || book.availableCopies < 1) {
      return res.status(404).send({
        success: false,
        message: 'This book is not available.',
      });
    }

    const returnDate = new Date();
    returnDate.setDate(returnDate.getDate() + LOAN_PERIOD);

    const newLoan = new Loan({
      book: bookId,
      user: userId,
      returnDate,
    });
    await newLoan.save();

    book.availableCopies -= 1;
    book.borrowedCount += 1;
    await book.save();

    await User.findByIdAndUpdate(userId, {
      $push: { loans: newLoan._id }
    });

    res.status(201).send({
      success: true,
      message: 'Book borrowed successfully.',
      data: newLoan,
    });

  } catch (error) {
    return res.status(400).send({
      success: false,
      message: 'Error Borrowing book',
      error
    });
  }
};

const returnBook = async (req, res) => {
  const { loanId } = req.body;

  try {
    const loan = await Loan.findById(loanId).populate('book', 'title author availableCopies genre');

    if(!loan || loan.status === STATUS.RETURNED) {
      return res.status(404).send({
        success: false,
        message: 'Invalid Loan Request',
      });
    }

    loan.returnDate = new Date();
    loan.status = STATUS.RETURNED;
    await loan.save();

    loan.book.availableCopies += 1;
    await loan.book.save();

    res.status(200).send({
      success: true,
      message: 'Book returned successfully.',
      data: loan,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: 'Error Returning book',
      error
    });
  }
};

const getUserLoans = async (req, res) => {
  const userId = req.user;

  try {
    const loans = await Loan.find({ user: userId }).populate('book', 'title author');

    res.status(200).send({
      success: true,
      message: 'User Loans fetched successfully.',
      data: loans,
    });
  } catch (error) {
    return res.status(400).send({
      success: false,
      message: 'Error fetching user loans',
      error
    });
  }
};

module.exports = { borrowBook, returnBook, getUserLoans };