var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.json({
  	empty: false,
  	tweets: [
  		{
  			text: "test1"
  		},
  		{
  			text: "test2"
  		}
  	]
  })
});

module.exports = router;
