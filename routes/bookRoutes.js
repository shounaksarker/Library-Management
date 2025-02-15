const express = require('express');
const  { addBook, getBooks, getFilteredBook } = require('../controllers/bookControllers');
const router = express.Router();

router.get('/', getBooks);
router.get('/filtered', getFilteredBook);
router.post('/add', addBook);

module.exports = router;