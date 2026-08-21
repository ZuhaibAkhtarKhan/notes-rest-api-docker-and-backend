const express = require('express');
const mongoose = require('mongoose');
const { Notebook } = require('./models');
const notebookRouter = express.Router();


// Create new notebooks: POST '/'
// Retrieve all notebooks: GET '/'
// Create or update a single notebook: PUT '/:id'
// get a single notebook: GET '/:id'
// delete a single notebook: DELETE '/:id'

const validateId = (req, res, next) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "Notebook not found."});
    }
    next();
}

notebookRouter.post('/', async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: "name field is required."});
        }

        const notebook = new Notebook({name, description});
        await notebook.save();

        res.status(201).json({data: notebook})

    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

notebookRouter.get('/', async (req, res) => {
    try {
        
        const notebooks = await Notebook.find();

        res.status(200).json({data: notebooks});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

notebookRouter.get('/:id',validateId, async (req, res) => {
    try {
        const notebook = await Notebook.findById(req.params.id);

        
        if (!notebook) {
            return res.status(404).json({ error: "Notebook not found."});
        }

        res.status(200).json({data: notebook});

    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

notebookRouter.put('/:id',validateId, async (req, res) => {
    try {
        const { name, description } = req.body;

        if (!name) {
            return res.status(400).json({ error: "name field is required."});
        }

        const notebook = await Notebook.findByIdAndUpdate(req.params.id, {
            name, description
        }, {new: true})

        if (!notebook) {
            return res.status(404).json({ error: "Notebook not found."});
        }

        res.status(201).json({data: notebook})

    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

notebookRouter.delete('/:id',validateId, async (req, res) => {
    try {
        const notebook = await Notebook.findByIdAndDelete(req.params.id);

        if (!notebook) {
            return res.status(404).json({ error: "Notebook not found."});
        }

        res.status(201).json({data: notebook})

    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = {
    notebookRouter,
};