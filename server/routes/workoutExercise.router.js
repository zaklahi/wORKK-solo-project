const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
console.log('user is', req.user)
  const query = `SELECT  "workout_exercises".*, "exercise"."exercise_type"
  FROM "exercise"
  RIGHT JOIN "workout_exercises" ON "workout_exercises"."exercise_Id" = "exercise"."exercise_Id"
  JOIN "user" ON "workout_exercises"."user_id" = "user"."id"
  WHERE "user"."id"  = $1`;
  pool.query(query, [req.user.id])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all exercises', err);
      res.sendStatus(500)
    })

});

router.get('/:id', (req, res) => {
  const query = `SELECT  "workout_exercises".*, "exercise"."exercise_type"
  FROM "exercise"
  RIGHT JOIN "workout_exercises" ON "workout_exercises"."exercise_Id" = "exercise"."exercise_Id"
  JOIN "user" ON "workout_exercises"."user_id" = "user"."id"
  WHERE "workout_exercises"."id"  = $1`;
  pool.query(query, [req.params.id])
    .then(result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all exercises', err);
      res.sendStatus(500)
    })

});

router.get('/', (req, res) => {
  console.log('user is', req.user)
    const query = `SELECT  "workout_exercises".*, "exercise"."exercise_type"
    FROM "exercise"
    JOIN "workout_exercises" ON "workout_exercises"."exercise_Id" = "exercise"."exercise_Id"
    
    JOIN "user" ON "workout_exercises"."user_id" = "user"."id"
    WHERE "user"."id"  = $1;`;
    pool.query(query, [req.user.id])
      .then( result => {
        console.log('heres the workouts result rows', result.rows)
        res.send(result.rows);
      })
      .catch(err => {
        console.log('ERROR: Get all exercises', err);
        res.sendStatus(500)
      })
  
  });
/// this query will return an id and create a workout
router.post('/', (req, res) => {
  console.log(req.body)
  const userId = req.user.id
  const entry = req.body;
  const sqlParams = [userId,  entry.workoutDate, entry.reps, entry.sets, entry.weight, entry.notes]
  
  const sqlText = ` INSERT INTO "workout_exercises" ( "user_id"  , "workoutDate", "reps", "sets", "weight", "notes") 
  VALUES ($1, $2, $3, $4, $5, $6 )
  RETURNING "user_id";`
  pool.query(sqlText, sqlParams)
      .then((result) => {
          console.log(`Added creature to the database`, entry, userId);
          res.sendStatus(201);
      })
      .catch((error) => {
          console.log(`Error making database query ${sqlText}`, error);
          res.sendStatus(500); // Good server always responds
      })
})

router.post('/exercise', (req, res) => {
// where the databse data will be

});

router.put('/:id', (req, res) => {
console.log('this is req.body from router', req.body)
  const entry = req.body;
  const sqlParams = [ entry.reps, entry.sets, entry.weight, entry.notes, entry.id]
  const sqlText = `UPDATE "workout_exercises" SET "reps" = $1, "sets" = $2, "weight" = $3, "notes" = $4 
  WHERE "id" = $5;`;
  pool.query(sqlText, sqlParams )
      .then((result) => {
          res.sendStatus(200);
      })
      .catch((error) => {
          console.log(`Error making database query ${sqlText}`, error);
          res.sendStatus(500);
      });
});


router.delete('/:id', (req, res) => {
  console.log('req.body', req.params.id);
  // allow to DELETE if the user is authenticated
  if (req.isAuthenticated()){
    let id = req.params.id;
    const queryText = `
    DELETE FROM "workout_exercises"
    WHERE id = $1;`;
    pool
      .query(queryText, [id])
      .then((result) => {
        console.log('delete route: ', result);
        res.sendStatus(202);
      })
      .catch((error) => {
        console.log('route workout  error: ', error);
        res.sendStatus(500);
      })
  } else {
    res.sendStatus(403);
  }
});
// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted

module.exports = router;
