import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './AddWorkout.css'

function AddWorkout(props) {
    const workouts = useSelector( store => store.workouts.exercisesReducer );
    const exercises = useSelector(store => store.exercises)
    const [workoutDate, setWorkoutDate] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [notes, setNotes] = useState('');
    const [weight, setWeight] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const Exercise_Type  = props.exercises;

    


    // useEffect(() => {
    //     dispatch({ type: 'FETCH_EXERCISES', payload: props.exercises });
    // }, [props.exercises]);
    // console.log('is exercise type showing up' ,exercises.Exercise_Type)

    useEffect(() => {
        if (id) { // Return false if id is undefined
            axios.get(`/api/workout/`).then(response => {
                const workout = response.data;
                setReps(workout.reps);
                setSets(workout.sets);
                setNotes(workout.notes);
                setWeight(workout.weight)
                setWorkoutDate(workout.workoutDate)
             
         
              

            }).catch(error => {
                console.log(error);
                alert('Something went wrong!');
            })
        } // ese do nothing
    }, [id]);



    const submitForm = (e) => {
        e.preventDefault();
        if (id) {
            // EDIT AN EXISTING MOVIE
        //     dispatch({ type: 'EDIT_WORKOUT', payload: { reps, sets, weight,notes, id }, history });
        // } else {
            // ADD A MOVIE
            // Pass history with our dispatch so that the saga can redirect
            dispatch({ type: 'ADD_WORKOUT', payload: { workoutDate,reps, sets, weight, notes },history });
           
        }

    }

    const getTitle = () => {
        if (id) {
            return 'Edit Movie';
        } else {
            return 'Add Movie';
        }
    }
   

    return (
        <div>
           <div class="container">
  <h1>Add Workout</h1>
  <form class="form" onSubmit={submitForm}>
    <div class="form-group">
      <label for="workoutDate">Workout Date:</label>
      <input type="date" class="form-control" id="workoutDate" value={workoutDate} onChange={(e) => setWorkoutDate(e.target.value)} />
    </div>
    <div class="form-group">
      <label for="reps">Reps:</label>
      <input type="number" class="form-control" id="reps" value={reps} onChange={(e) => setReps(e.target.value)} />
    </div>
    <div class="form-group">
      <label for="sets">Sets:</label>
      <input type="number" class="form-control" id="sets" value={sets} onChange={(e) => setSets(e.target.value)} />
    </div>
    <div class="form-group">
      <label for="weight">Weight:</label>
      <input type="number" class="form-control" id="weight" value={weight} onChange={(e) => setWeight(e.target.value)} />
    </div>
    <div class="form-group">
      <label for="notes">Notes:</label>
      <textarea class="form-control" id="notes" rows="3" value={notes} onChange={(e) => setNotes(e.target.value)}></textarea>
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
  </form>
</div>
               
               
                {workouts.map((workout) => (
  <div key={workout.id}>
    <p>{workout.WorkoutDate}</p>
    <p>{workout.Exercise_Type}</p>
    <p>{workout.Reps}</p>
    <p>{workout.Sets}</p>
    <p>{workout.Weight}</p>
    <p>{workout.Notes}</p>
  </div>
))}

               
           
        </div>
    )
}

export default AddWorkout;