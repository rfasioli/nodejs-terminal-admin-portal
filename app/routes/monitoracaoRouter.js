var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  next();
});

// define the home page route
router.get('/', function(req, res) {
	
});

module.exports = router;