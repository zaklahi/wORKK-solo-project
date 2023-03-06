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

router.post('/new', (req, res) => {
/// this query will return an id and create a workout
});

router.post('/exercise', (req, res) => {

});
// Handles POST request with new user data
// The only thing different from this and every other post we've seen
// is that the password gets encrypted before being inserted

module.exports = router;
