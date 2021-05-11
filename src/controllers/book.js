const Book = require('../models/book');
const { validationResult } = require('express-validator');

module.exports = {
    // Esto podría ser por medio de callbacks también
    // pero no es recomendado porque genera el callback hell 
    index: async (req, res, next) => {
        try{
            const queries = Object.keys(req.query);
            
            if(queries.length === 0){
                const books = await Book.find({});
                return res.status(200).json(books); 
            }

            const { title, author, year, tags } = req.query;
            const books = await Book.find({$or:[{title: title},{author: author}, {year: year},{tags: tags}]});
            const filteredBooks = books.filter(book => queries.every(val => String(book[val]) === req.query[val]));
        
            return res.status(200).json(filteredBooks); 

        } catch(e){
            return res.status(500).send('Server error');
        }
    },

    newBook: async (req, res, next) => {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array() });
            }
            const newBook = new Book(req.body);
            const isBookDuplicated = await Book.find({ title : newBook.title, author: newBook.author, year: newBook.year});
            
            if(isBookDuplicated.length > 0){
                return res.status(409).send({
                    message: 'Book is already on DB'
                })
            }
            
            await newBook.save();
            res.status(200).json(newBook);
        } catch(e){
            return res.status(500).send({
                error: 'Server error'
            })
        }
    },

    // método GET
    getBook: async (req, res, next) => {
        try{
            const { bookId } = req.params;
            const book = await Book.findById(bookId);
            res.status(200).json(book);
        } catch(e){
            return res.status(404).send({
                message: 'Book not found'
            })
        }
    },

    // método PUT
    replaceBook: async (req, res, next) => {
        try{
            const errors = validationResult(req);
            
            if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array() });
            }

            const { bookId } = req.params;
            const newBook = req.body;

            const oldBook = await Book.findByIdAndUpdate(bookId, newBook);
            res.status(200).json({success: true});
        } catch(e){
            if(e.name === 'CastError'){
                return res.status(404).send({
                    message: 'Book not found',
                })
            }

            return res.status(500).send({
                error: 'Server Error'
            })
        }
        
    },

    // método PATCH
    updateBook: async (req, res, next) => {
        const { bookId } = req.params;
        const newBook = req.body;
        const oldBook = await Book.findByIdAndUpdate(bookId, newBook);
        res.status(200).json({success: true});
    },

    // método DELETE
    deleteBook: async (req, res, next) => {
        try{
            const { bookId } = req.params;
            await Book.findByIdAndRemove(bookId);
            res.status(200).json({success: true});
        } catch(e){
            return res.status(404).send({
                message: 'Book not found'
            })
        }
    },

    /*getUserCars: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('cars');
        res.status(200).json(user);
    },

    newUserCar: async (req, res, next) => {
        const { userId } = req.params;
        const newCar = new Car(req.body);
        const user = await User.findById(userId);
        newCar.seller = user;
        await newCar.save();
        user.cars.push(newCar);
        await user.save();
        res.status(201).json(newCar);
    }*/
};