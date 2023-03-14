const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();



// Handles Ajax request for user information if user is authenticated
router.get('/', (req, res) => {
console.log('user is', req.user)
  const query = `SELECT  "Workout_Exercises".*, "Exercise"."Exercise_Type"
  FROM "Exercise"
  JOIN "Workout_Exercises" ON "Workout_Exercises"."Exercise_Id" = "Exercise"."Exercise_Id"
  
  JOIN "user" ON "Workout_Exercises"."user_id" = "user"."id"
  WHERE "user"."id"  = $1;`;
  pool.query(query, [req.user.id])
    .then( result => {
      res.send(result.rows);
    })
    .catch(err => {
      console.log('ERROR: Get all exercises', err);
      res.sendStatus(500)
    })

});

router.get('/', (req, res) => {
  console.log('user is', req.user)
    const query = `SELECT  "Workout_Exercises".*, "Exercise"."Exercise_Type"
    FROM "Exercise"
    JOIN "Workout_Exercises" ON "Workout_Exercises"."Exercise_Id" = "Exercise"."Exercise_Id"
    
    JOIN "user" ON "Workout_Exercises"."user_id" = "user"."id"
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
  const sqlParams = [userId,  entry.WorkoutDate, entry.reps, entry.sets, entry.weight, entry.notes]
  
  const sqlText = ` INSERT INTO "Workout_Exercises" ( "user_id"  , "WorkoutDate", "Reps", "Sets", "Weight", "Notes") 
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

router.put('/', (req, res) => {
  // Update this single student
  const userId = req.user.id
  const entry = req.body;
  const sqlParams = [userId, entry.reps, entry.sets, entry.weight, entry.notes, req.params.id]
  const sqlText = `UPDATE "Workout_Exercises" SET "Reps" = $1, "Sets" = $2, "Weight" = $3, "Notes" = $4 
  WHERE "WorkoutId" = $5;`;
  pool.query(sqlText, [sqlParams, sqlText])
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
    DELETE FROM "Workout_Exercises"
    WHERE WorkoutId = $1;`;
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
