const express = require('express');
const projectModel = require('../data/helpers/projectModel.js');

const router = express.Router();

//endpoints

//working
router.get('/:id', (req, res) => {
    const id = req.params.id;
    projectModel.get(id)
        .then(project => {
            if(!project){
                res.status(404).json({ message: "ID not found" });
            }
            res.status(200).json(project);
        })
        .catch(err => {
            res.status(500).json({ error: "Project could not be retrieved" });
        });
});

//working
router.post('/', validateProject, (req, res) => {
    projectModel.insert(req.body)
        .then(project => {
            res.status(201).json(project);
        })
        .catch(err => {
            res.status(500).json({ error: "Could not be added to database" });
        });
});

//working
router.delete('/:id', validateProjectID, (req, res) => {
    const id = req.params.id;
    projectModel.remove(id)
        .then(value => {
            res.status(200).json(value);
        })
        .catch(err => {
            res.status(500).json({ error: "Could not be deleted from database"});
        });
});

//working
router.put('/:id', validateProjectID, validateProject, (req, res) => {
    const id = req.params.id;
    const changes = req.body;
    projectModel.update(id, changes)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            res.status(500).json({ error: "Unable to update project" });
        });
});

//custom middleware

//working
function validateProject(req, res, next) {
    const projectBody = req.body;
    if(!projectBody.name || !projectBody.description || !projectBody) {
        res.status(404).json({ message: "Please include a name and description of project" });
    } else {
        next();
    }
}

//working
function validateProjectID(req, res, next) {
    const id = req.params.id;
    projectModel.get(id)
        .then(project => {
            if(!project){
                res.status(404).json({ message: "ID not found" });
            } else {
                next();
            }
        })
        .catch(err => {
            res.status(500).json({ error: "Project could not be retrieved" });
        });
}

module.exports = router;