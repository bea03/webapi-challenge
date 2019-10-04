const express = require('express');
const actionModel = require('../data/helpers/actionModel.js');
const projectModel = require('../data/helpers/projectModel.js');

const router = express.Router();

//endpoints

//working
router.get('/:id', (req, res) => {
    const id = req.params.id;
    actionModel.get(id)
        .then(action => {
            if(!action) {
                res.status(404).json({ message: "ID not found" });
            }
            res.status(200).json(action);
        })
        .catch(err => {
            res.status(500).json({ error: "Action could not be retrieved" });
        });
});

//working
router.delete('/:id', validateActionID, (req, res) => {
    const id = req.params.id;
    actionModel.remove(id)
        .then(value => {
            res.status(200).json(value);
        })
        .catch(err => {
            res.status(500).json({ error: "Could not be deleted" });
        });
});

//working
router.post('/', validateAction, validatePostID, (req, res) => {
    actionModel.insert(req.body)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            res.status(500).json({ error: "Could not be added to database" });
        });
});

//working
router.put('/:id', validateActionID, validatePostID, validateAction, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    actionModel.update(id, changes)
    .then(action => {
        res.status(200).json(action);
    })
    .catch(err => {
        res.status(500).json({ error: "Unable to update action" });
    });
});

//custom middleware
function validateActionID(req, res, next) {
    const id = req.params.id;
    actionModel.get(id)
        .then(action => {
            if(!action) {
                res.status(404).json({ message: "ID not found" });
            } else {
                next();
            }
        })
        .catch(err => {
            res.status(500).json({ error: "Action could not be retrieved" });
        });
}

function validateAction(req, res, next) {
    const actionBody = req.body;
    if(!actionBody || !actionBody.project_id || !actionBody.description || !actionBody.notes){
        res.status(404).json({ message: "Please include a project id, description, and notes for the action" });
    } else if(actionBody.description.length > 128) {
        res.status(400).json({message: "Action description must be under 128 characters"});
    } else{
        next();
    }
}

function validatePostID(req, res, next) {
    const project_id = req.body.project_id;
    projectModel.get(project_id)
    .then(project => {
        if(!project){
            res.status(404).json({ message: "Project ID not found" });
        } else {
            next();
        }
    })
    .catch(err => {
        res.status(500).json({ error: "Project could not be retrieved" });
    });
}

module.exports = router;