const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {

  const queryText = 'SELECT * FROM "Exercise" ;';
  pool.query(queryText ).then((result) => {
    console.log(result.rows);
    res.send(result.rows);
  }).catch((err) => {
    console.log('err w get request', err);
    res.sendStatus(500);
  });
});

router.get('/:id', (req, res) => {

  const query = `SELECT * FROM "Exercise" WHERE "id"=$1`;
  pool.query(query, [req.params.id])
    .then(result => {
      // Return the first item in the array (which is an Object)
      res.send(result.rows[0]);
    })
    .catch(err => {
      console.log('ERROR: Get all movies', err);
      res.sendStatus(500)
    })

});


router.post("/", (req, res) => {
  // post that will post onto dom   
      let sqlQuery = `
          INSERT INTO "Exercise" 
            ("user_id", "Exercise_Type",  )
          VALUES 
            ($1, $2)
        `;
      const sqlValue = [
        req.user.id,
        req.body.Exercise_Type,
        
        
      ];
      pool
        .query(sqlQuery, sqlValue)
        .then((result) => {
          res.sendStatus(201);
          console.log(sqlValue)
          console.log(req.body)
        })
        .catch((error) => {
          console.log(`Error in post  `, error);
          res.sendStatus(500);
        });
    });



// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted

module.exports = router;
