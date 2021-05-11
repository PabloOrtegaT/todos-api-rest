const { check } = require('express-validator');

const validateBook = () => { 
    return [ 
    check('title').exists().withMessage(`Title field can't be empty`)
    .bail().notEmpty().withMessage(`Title can't be empty`)
    .bail().isString().withMessage(`Title must be a string`),

    check('author').exists().withMessage(`Author field can't be empty`)
    .bail().isString().withMessage(`Author must be a string`),

    check('year').exists().withMessage(`Year field can't be empty`)
    .bail().isNumeric().withMessage(`Year must be a number`)
    .bail().custom((value) => value > 1454 && value <= new Date().getFullYear()).withMessage('Invalid year'),

    check('tags').exists().withMessage(`Tags field can't be empty`)
    .bail().isArray().withMessage(`Tags must be an array`)
    .bail().custom((arr) => arr.length > 0).withMessage(`Array length can't be 0`)
    .bail().custom((arr) => arr.every(item => typeof item === 'string')).withMessage(`Tags must be an array of strings`)
    ]
}

module.exports = {
    validateBook
}