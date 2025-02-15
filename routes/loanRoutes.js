const express = require('express');
const router = express.Router();
const { borrowBook, returnBook, getUserLoans } = require('../controllers/loanControllers');

router.post('/borrow', borrowBook);
router.post('/return', returnBook);
router.get('/my-loans', getUserLoans);

module.exports = router;