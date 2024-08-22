const express = require('express');
const Todo = require('../../models/Task');
const router = express.Router();



// Create a new task
router.post('/', async (req, res) => {
    
        const taskObject = {
            task: req.body.task,
            description: req.body.description,
            completed: req.body.completed || false
        };
        const todo = new Todo(taskObject);
        await todo.save();
        res.status(201).json(todo);
   });

// Get all tasks
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.json(todos);
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Get a task by ID
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo) {
            res.json(todo);
        } else {
            return res.status(404).json({
                message: 'Task not found'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

// Update a task by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id, {
                task: req.body.task,
                description: req.body.description,
                completed: req.body.completed,
            }, {
                new: true
            }
        );
        if (updatedTodo) {
            res.json(updatedTodo);
        } else {
            return res.status(404).json({
                message: 'Task not found'
            });
        }
    } catch (err) {
        res.status(400).json({
            message: err.message
        });
    }
});

// Delete a task by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (deletedTodo) {
            res.json({
                message: 'Task deleted'
            });
        } else {
            return res.status(404).json({
                message: 'Task not found'
            });
        }
    } catch (err) {
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;