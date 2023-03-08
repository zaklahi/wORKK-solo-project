const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
console.log('user is', req.user)
  const query = `SELECT  "UserWorkout".*, "Exercise"."Exercise_Type", "Workout_Exercises"."Reps", "Workout_Exercises"."Sets", "Workout_Exercises"."Weight"
  FROM "UserWorkout"
  JOIN "Workout_Exercises" ON "UserWorkout"."WorkoutId" = "Workout_Exercises"."WorkoutId"
  JOIN "Exercise" ON "Workout_Exercises"."Exercise_Id" = "Exercise"."Exercise_Id"
  WHERE "UserWorkout"."user_id"  = $1;
  ;`;
  pool.query(query, [req.user.id])
    .then( result => {
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
  const sqlParams = [userId, entry.reps, entry.sets, entry.weight, entry.notes]
  
  const sqlText = `INSERT INTO "Workout_Exercises" ( "WorkoutId", "Reps", "Sets", "Weight", "Notes") 
  VALUES ($1, $2, $3, $4, $5)
  RETURNING "WorkoutId";`
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

router.delete('/:id', (req, res) => {
  console.log('req.body', req.params.id);
  // allow to DELETE if the user is authenticated
  if (req.isAuthenticated()){
    let id = req.params.id;
    const queryText = `
    DELETE FROM "Workout_Exercises"
    WHERE id = $1;`;
    pool
      .query(queryText, [id])
      .then((result) => {
        console.log('delete router: ', result);
        res.sendStatus(202);
      })
      .catch((error) => {
        console.log('router.delete idea error: ', error);
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
