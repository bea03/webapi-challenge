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
            res.status(500).json({ error: "Projects could not be retrieved" });
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

function validateProject(req, res, next) {
    const projectBody = req.body;
    if(!projectBody.name || !projectBody.description || !projectBody) {
        res.status(404).json({ message: "Please include a name and description of project" });
    } else {
        next();
    }
}

module.exports = router;