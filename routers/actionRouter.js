const express = require('express');
const actionModelDb = require('../data/helpers/projectModel');

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
  } else if(!req,body.description || !req.body.notes) {
    res.status(400).json({
      message: 'Input field required'
    })
  } else {
    next()
  }
}
