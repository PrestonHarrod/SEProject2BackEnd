var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var offset;
  var limit;
  if (req.query.page == null) offset = 0;
  else offset = parseInt(req.query.page);
  if (req.query.per_page == null) limit = 20;
  else limit = parseInt(req.query.per_page);
  res.locals.connection.query(
    "SELECT * FROM courses LIMIT ? OFFSET ?",
    [limit, offset],
    function(error, results, fields) {
      if (error) {
        res.status(500);
        res.send(JSON.stringify({ status: 500, error: error, response: null }));
        //If there is error, we send the error in the error section with 500 status
      } else {
        res.status(200);
        res.send(JSON.stringify(results));
        //If there is no error, all is good and response is 200OK.
      }
      res.locals.connection.end();
    }
  );
});

module.exports = router;