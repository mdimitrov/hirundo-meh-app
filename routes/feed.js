var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.json({
  	empty: false,
  	tweets: [
  		{
  			author: "Pesho",
  			text: "Obicham chalga"
  		},
  		{
  			author: "Vladi",
  			text: "Bum bam #RealBolt"
  		}
  	]
  })
});

module.exports = router;
