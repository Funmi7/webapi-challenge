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

router.get('/', validateProjectId, (req, res) => {
  // projectModelDb.get(req.body)
  // .then(posts => {
  //   res.status(200).json(posts)
  // })
  // .catch(error => {
  //   res.status(500).json({
  //     error: `Error fetching projects ${error.message}`
  //   });
  // });
  res.json(req.project)
});

module.exports = router;


