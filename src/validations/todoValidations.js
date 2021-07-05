const { check } = require('express-validator');

const validateTodo = () => { 
    return [ 
    /*check('title').exists().withMessage(`Title field is required`)
    .bail().isString().withMessage(`Title must be a string`),

    check('completed').exists().withMessage(`Completed field is required`)
    .bail().isBoolean().withMessage(`Completed must be a boolean`),*/

    check('todos').exists().withMessage(`Todos field can't be empty`)
    .bail().isArray().withMessage(`Todos must be an array`)
    .bail().custom((arr) => arr.length > 0).withMessage(`Todos length can't be 0`)
    ]
}

module.exports = {
    validateTodo
}