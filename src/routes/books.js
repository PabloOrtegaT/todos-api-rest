const router = require('express-promise-router')();

const {
    validateBook
} = require('../validations/bookValidations')

const {
    index,
    newBook,
    getBook,
    replaceBook,
    deleteBook,
} = require('../controllers/book');

// endpoints
router.get('/', index);
router.post('/', validateBook(), newBook);
router.get('/:bookId', getBook);
router.put('/:bookId', validateBook(), replaceBook);
router.delete('/:bookId', deleteBook);

/*router.get('/:userId/cars', getBookCars);
router.post('/:userId/cars', newBookCar);*/

module.exports = router;