const router = require('express-promise-router')();

const {
    validateTodo
} = require('../validations/todoValidations')

const {
    index,
    newTodo,
    replaceTodo,
    deleteTodo,
} = require('../controllers/todo');

// endpoints
router.get('/', index);
router.post('/', validateTodo(), newTodo);
//router.get('/:bookId', getBook);
router.put('/:todoId', validateTodo(), replaceTodo);
router.delete('/:todoId', deleteTodo);

/*router.get('/:userId/cars', getBookCars);
router.post('/:userId/cars', newBookCar);*/

module.exports = router;