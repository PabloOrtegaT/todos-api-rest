const { check } = require('express-validator');

const validateTodo = () => { 
    return [ 
    check('name').exists().withMessage(`Name field is required`)
    .bail().notEmpty().withMessage(`Name can't be empty`)
    .bail().isString().withMessage(`Name must be a string`),

    check('description').exists().withMessage(`Author field is required`)
    .bail().isString().withMessage(`Author must be a string`),

    check('importance').exists().withMessage(`Importance field is required`)
    .bail().isNumeric().withMessage(`Year must be a number`),

    /*check('dateAdded').exists().withMessage(`Year field can't be empty`)
    .bail().isNumeric().withMessage(`Year must be a number`),

    check('lastUpdate').exists().withMessage(`Year field can't be empty`)
    .bail().isNumeric().withMessage(`Year must be a number`),

    /*check('tags').exists().withMessage(`Tags field can't be empty`)
    .bail().isArray().withMessage(`Tags must be an array`)
    .bail().custom((arr) => arr.length > 0).withMessage(`Array length can't be 0`)
    .bail().custom((arr) => arr.every(item => typeof item === 'string')).withMessage(`Tags must be an array of strings`)*/
    ]
}

module.exports = {
    validateTodo
}