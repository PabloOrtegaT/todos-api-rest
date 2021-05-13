const Todo = require('../models/todo');
const { validationResult } = require('express-validator');

module.exports = {
    // Esto podría ser por medio de callbacks también
    // pero no es recomendado porque genera el callback hell 
    index: async (req, res, next) => {
        try{
            const queries = Object.keys(req.query);
            
            if(queries.length === 0){
                const todos = await Todo.find({});
                return res.status(200).json(todos); 
            }

            const { title, author, year, tags } = req.query;
            const todos = await Todo.find({$or:[{title: title},{author: author}, {year: year},{tags: tags}]});
            const filteredTodos = todos.filter(todo => queries.every(val => String(todo[val]) === req.query[val]));
        
            return res.status(200).json(filteredTodos); 

        } catch(e){
            return res.status(500).send('Server error');
        }
    },

    newTodo: async (req, res, next) => {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array() });
            }
            const newTodo = new Todo(req.body);

            // const isTodoDuplicated = await Todo.find({ title : newTodo.title, author: newTodo.author, year: newTodo.year});
            // if(isTodoDuplicated.length > 0){
            //     return res.status(409).send({
            //         message: 'Todo is already on DB'
            //     })
            // }
            newTodo.dateAdded = new Date();
            newTodo.lastUpdate = new Date();

            await newTodo.save();
            res.status(200).json(newTodo);
        } catch(e){
            return res.status(500).send({
                error: 'Server error'
            })
        }
    },

    // método PUT
    replaceTodo: async (req, res, next) => {
        try{
            const errors = validationResult(req);
            
            if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array() });
            }

            const { todoId } = req.params;
            const newTodo = req.body;
            newTodo.lastUpdate = new Date();

            const oldTodo = await Todo.findByIdAndUpdate(todoId, newTodo);
            res.status(200).json({success: true});
        } catch(e){
            if(e.name === 'CastError'){
                return res.status(404).send({
                    message: 'Todo not found',
                })
            }

            return res.status(500).send({
                error: 'Server Error'
            })
        }
        
    },

    deleteTodo: async (req, res, next) => {
        try{
            const { todoId } = req.params;
            await Todo.findByIdAndRemove(todoId);
            res.status(200).json({success: true});
        } catch(e){
            return res.status(404).send({
                message: 'Todo not found'
            })
        }
    },

    // método PATCH
    // updateBook: async (req, res, next) => {
    //     const { bookId } = req.params;
    //     const newBook = req.body;
    //     const oldBook = await Book.findByIdAndUpdate(bookId, newBook);
    //     res.status(200).json({success: true});
    // },

    // método GET
    // getTodo: async (req, res, next) => {
    //     try{
    //         const { bookId } = req.params;
    //         const book = await Book.findById(bookId);
    //         res.status(200).json(book);
    //     } catch(e){
    //         return res.status(404).send({
    //             message: 'Book not found'
    //         })
    //     }
    // },

    // método DELETE
    // getUserCars: async (req, res, next) => {
    //     const { userId } = req.params;
    //     const user = await User.findById(userId).populate('cars');
    //     res.status(200).json(user);
    // },
    // newUserCar: async (req, res, next) => {
    //     const { userId } = req.params;
    //     const newCar = new Car(req.body);
    //     const user = await User.findById(userId);
    //     newCar.seller = user;
    //     await newCar.save();
    //     user.cars.push(newCar);
    //     await user.save();
    //     res.status(201).json(newCar);
    // }
};