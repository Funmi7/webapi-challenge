const express = require('express');
const actionModelDb = require('../data/helpers/actionModel');

const actionRouter = express.Router();

function validateActionId(req, res, next) {
  actionModelDb.get(req.params.id)
  .then(action => {
    if (action) {
      req.action = action
      next()
    } else {
      res.status(400).json({
        message: 'Invalid action ID'
      })
    }
  })
  .catch(error => {
    res.status(500).json({
      error: `Can't load the action id ${error.message}`
    })
  })
}

function validateAction(req, res, next) {
  if(!Object.keys(req.body).length) {
    res.status(400).json({
      message: 'Missing project data'
    })
  } else if(!req.body.description || !req.body.notes) {
    res.status(400).json({
      message: 'Input field required'
    })
  } else {
    next()
  }
}

// CRUD operations

actionRouter.post('/:id/actions', [validateAction, validateActionId], (req, res) => {
  const postInfo = { project_id: req.params.id, ...req.body}
  actionModelDb.insert(postInfo)
  .then(newAction => {
    res.status(210).json(newAction)
  })
  .catch(error => {
    res.status(500).json({
      error: `Error adding Action ${error.message}`
    });
  });
});

actionRouter.get('/:id/actions/:id', validateActionId, (req, res) => {
  res.json(req.action)
});


actionRouter.put('/:id/actions/:id', [validateAction, validateActionId], (req, res) => {
  actionModelDb.update(req.action.id, req.body)
  .then(updatedAction => {
    res.status(200).json(updatedAction)
  })
  .catch(error => {
    res.status(500).json({
      error: `Error updating action ${error}`
    });
  });
});

actionRouter.delete('/:id/actions/:id', validateActionId, (req, res) => {
  actionModelDb.remove(req.action.id)
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

module.exports = actionRouter;