const Todo = require('../models/todo');
const User = require('../models/users');
const { validationResult } = require('express-validator');

module.exports = {

    index: async (req, res, next) => {
		const myUser = await User.find({});
        if(!myUser){
            const newUser = new User(req.body);
            const user = await newUser.save();
            res.status(201).json(user)
        }
		res.status(200).json(myUser);
	},

    newUser: async (req, res, next) => {
        try{
            const newUser = new User(req.body);
            const user = await newUser.save();
            res.status(201).json(user);
        } catch(e){
            return res.status(500).send({
                error: 'Server error'
            })
        }
    },

    getUser: async (req, res, next) => {
		const { userEmail } = req.params;
		const user = await User.find({ name : decodeURI(`${userEmail}`) });
        if(user.length==0){
            const fakeDataUser = { name : decodeURI(`${userEmail}`), todos : [] };
            const newUser = new User( fakeDataUser );
            const user = await newUser.save();
            return res.status(201).json(user);
        }
		res.status(200).json(user);
	},

    deleteUser: async (req, res, next) => {
        try{
            const { userEmail } = req.params;
		    const user = await User.find({ name : decodeURI(`${userEmail}`) });
            await User.findByIdAndRemove(user[0]._id);
            const users = await User.find({});
            res.status(200).json(users);
        } catch(e){
            return res.status(404).send({
                message: 'User not found'
            })
        }
    },

    getUserTodos: async (req, res, next) => {
		const { userEmail } = req.params;
		const user = await User.find({ name : decodeURI(`${userEmail}`) });
        if(user.length==0){
            const fakeDataUser = { name : decodeURI(`${userEmail}`), todos : [] };
            const newUser = new User( fakeDataUser );
            const user = await newUser.save();
            return res.status(201).json(user.todos);
        }

        const { userId } = req.params;
		const todos = await User.find({ name : decodeURI(`${userEmail}`) }).populate('todos');

		res.status(200).json(todos[0].todos);
	},

	newUserTodo: async (req, res, next) => {
        const { userEmail } = req.params;
		const myUser = await User.find({ name : decodeURI(`${userEmail}`) });

		const newTodo = new Todo(req.body);
		const user = await User.findById(myUser[0]._id);
		newTodo.owner = myUser[0]._id;
		await newTodo.save();
        
        user.todos.push(newTodo);
		await user.save();
		res.status(201).json(newTodo);
	},

    deleteUserTodo: async (req, res, next) => {
        try{
            const { todoId } = req.params;
            const { userEmail } = req.params;
            await Todo.findByIdAndRemove(todoId);
            await User.updateOne(
                { "name": userEmail },
                { "$pull": { "todos": todoId } }
            )
            const todos = await User.find({ name : decodeURI(`${userEmail}`) }).populate('todos');
            res.status(200).json(todos);
        } catch(e){
            return res.status(404).send({
                message: 'Todo not found'
            })
        }
    },

    updateUserTodo: async (req, res, next) => {
        try{
            const { todoId } = req.params;
            const newTodo = req.body;
            newTodo.id = todoId;
            newTodo.lastUpdate = new Date();
            const oldTodo = await Todo.findByIdAndUpdate(todoId, newTodo);
            res.status(200).json(newTodo);

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


    /*newTodo: async (req, res, next) => {
        try{
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return res.status(400).json({ errors: errors.array() });
            }

            const newTodo = new Todo(req.body);
            newTodo.dateAdded = new Date();
            newTodo.lastUpdate = new Date();

            await newTodo.save();
            res.status(200).json(newTodo);

        } catch(e){
            return res.status(500).send({
                error: 'Server error'
            })
        }
    },*/

    // método PUT
    // updateTodo: async (req, res, next) => {
    //     try{
    //         const errors = validationResult(req);
            
    //         if(!errors.isEmpty()){
    //             return res.status(400).json({ errors: errors.array() });
    //         }

    //         const { todoId } = req.params;
    //         const newTodo = req.body;
    //         newTodo.id = todoId;
    //         newTodo.lastUpdate = new Date();
    //         const oldTodo = await Todo.findByIdAndUpdate(todoId, newTodo);
    //         res.status(200).json(newTodo);

    //     } catch(e){
    //         if(e.name === 'CastError'){
    //             return res.status(404).send({
    //                 message: 'Todo not found',
    //             })
    //         }

    //         return res.status(500).send({
    //             error: 'Server Error'
    //         })
    //     }
        
    // },

    // deleteTodo: async (req, res, next) => {
    //     try{
    //         const { todoId } = req.params;
    //         await Todo.findByIdAndRemove(todoId);
    //         const todos = await Todo.find({});
    //         res.status(200).json(todos);
    //     } catch(e){
    //         return res.status(404).send({
    //             message: 'Todo not found'
    //         })
    //     }
    // },
};