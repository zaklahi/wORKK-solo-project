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

    
console.log('is workouts populating', workouts)

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
            {/* <h1>{getTitle()}</h1> */}
            { <h1>Add Workout</h1> }
            
            <h3>{}</h3>
            <form onSubmit={submitForm}>
            <p>Workout Date: <input value={workoutDate} onChange={(e) => setWorkoutDate(e.target.value)}  /></p>
                <p>Reps: <input value={reps} onChange={(e) => setReps(e.target.value)} /></p>
                <p>Sets: <input value={sets} onChange={(e) => setSets(e.target.value)}  /></p>
                <p>Weight: <input value={weight} onChange={(e) => setWeight(e.target.value)}  /></p>
                
                <p>Notes: <input value={notes} onChange={(e) => setNotes(e.target.value)}  /></p>
              
               
               
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

                <input type="submit" />
            </form>
        </div>
    )
}

export default AddWorkout;