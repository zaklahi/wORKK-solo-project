import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function AddWorkout(props) {
    const workouts = useSelector( store => store.workouts );
    const exercises = useSelector(store => store.exercises)
    
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [notes, setNotes] = useState('');
    const [weight, setWeight] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();
    const Exercise_Type  = props.exercises;

    


    useEffect(() => {
        dispatch({ type: 'FETCH_EXERCISES', payload: props.exercises });
    }, [props.exercises]);
    console.log('is exercise type showing up' ,exercises.Exercise_Type)

    useEffect(() => {
        if (id) { // Return false if id is undefined
            axios.get(`/api/workout`).then(response => {
                const workout = response.data;
                setReps(workout.reps);
                setSets(workout.sets);
                setWeight(workout.weight);
                setNotes(workout.notes);

            }).catch(error => {
                console.log(error);
                alert('Something went wrong!');
            })
        } // else do nothing
    }, [id]);

    const submitForm = (e) => {
        e.preventDefault();
        if (id) {
            // EDIT AN EXISTING MOVIE
        //     dispatch({ type: 'EDIT_WORKOUT', payload: { reps, sets, weight,notes, id }, history });
        // } else {
            // ADD A MOVIE
            // Pass history with our dispatch so that the saga can redirect
            dispatch({ type: 'ADD_WORKOUT', payload: { reps, sets, weight, notes }, history });
        }

    }

    const getTitle = () => {
        if (id) {
            return 'Edit Movie';
        } else {
            return 'Add Movie';
        }
    }
    const deleteWorkout = (workouts) => {
        dispatch({
          type: 'DELETE_WORKOUT',
          payload: {
            id: workouts.id
          }
        })
      }

    return (
        <div>
            {/* <h1>{getTitle()}</h1> */}
            {id ? <h1>Edit Workout</h1> : <h1>Add Workout</h1> }
            
            <h3>{exercises.Exercise_Type}</h3>
            <form onSubmit={submitForm}>
                <p>Reps: <input value={reps} onChange={(e) => setReps(e.target.value)} /></p>
                <p>Sets: <input value={sets} onChange={(e) => setSets(e.target.value)}  /></p>
                <p>Weight: <input value={weight} onChange={(e) => setWeight(e.target.value)}  /></p>
                
                <p>Notes: <input value={notes} onChange={(e) => setNotes(e.target.value)}  /></p>
                <button onClick={() => deleteWorkout(workouts)}>Delete</button>
               
                <tbody>
                {
                    exercises.map(genreToDisplay => <li>{genreToDisplay.Exercise_Type}</li>)
                }
                </tbody>
                <input type="submit" />
            </form>
        </div>
    )
}

export default AddWorkout;