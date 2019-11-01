const express = require('express');
const projectModelDb = require('../data/helpers/projectModel');

const router = express.Router();


//middlewares
function validateProjectId(req, res, next) {
  projectModelDb.get(req.params.id)
  .then(project => {
    if(project) {
      req.project = project
      next()
    } else {
      res.status(400).json({
        message: 'Invalid user ID'
      })
    }
  })
  .catch(error => {
    res.status(500).json({
      error: `Can't load the user id ${error.message}`
    })
  })
}

function validateProject(req, res, next) {
  if(Object.keys(req.body).length) {
    next();
  } else if(!req.body.name || !req.body.description) {
    res.status(400).json({
      message: 'Missing required input field'
    })
  } else {
    res.status(400).json({
      message: 'Missing project data'
    })
  }
}

// CRUD operations

router.get('/', validateProjectId, (req, res) => {
  res.json(req.project)
});

router.post('/', validateProject, (req, res) => {
  projectModelDb.insert(req.body)
  .then(project => {
    res.status(210).json(project)
  })
  .catch(error => {
    res.status(400).json({
      error: `Error adding project ${error.message}`
    });
  });
});

router.get('/:id', validateProjectId, (req, res) => {
  res.json(req.project)
});

router.put('/:id', [validateProjectId, validateProject], (req, res) => {
  projectModelDb.update(req.project.id, req.body)
  .then(updatedProject => {
    res.status(200).json(updatedProject)
  })
  .catch(error => {
    res.status(500).json({
      error: `Error updating project ${error}`
    });
  });
});

router.delete('/:id', validateProjectId, (req, res) => {
  projectModelDb.remove(req.project.id)
  .then(() => {
    res.status(200).json({
      message: 'The project has been deleted'
    })
  })
  .catch(error => {
    res.status(500).json({
      error: `Unable to delete project ${error.message}`
    });
  });
});

module.exports = router;


