import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function AddWorkout() {
    const genres = useSelector( store => store.genres );
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');
    const [notes, setNotes] = useState('');
    const [weight, setWeight] = useState('');
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        if (id) { // Return false if id is undefined
            axios.get(`/api/workout`).then(response => {
                const workout = response.data;
                setReps(workout.reps);
                setWeight(workout.sets);
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
            dispatch({ type: 'EDIT_WORKOUT', payload: { reps, sets, weight,notes, id }, history });
        } else {
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

    return (
        <div>
            {/* <h1>{getTitle()}</h1> */}
            {id ? <h1>Edit Workout</h1> : <h1>Add Workout</h1> }
            <h3>{id}</h3>
            <form onSubmit={submitForm}>
                <p>Reps: <input value={reps} onChange={(e) => setReps(e.target.value)} /></p>
                <p>Sets: <input value={sets} onChange={(e) => setSets(e.target.value)}  /></p>
                <p>Weight: <input value={weight} onChange={(e) => setWeight(e.target.value)}  /></p>
                <p>Notes: <input value={notes} onChange={(e) => setNotes(e.target.value)}  /></p>
                {/* <select
                    value={selectedOption}
                    onChange={e => setSelectedOption(e.target.value)}>
                    {genres.map(o => (
                        <option key={o.id} value={o.id}>{o.name}</option>
                    ))}
                </select> */}
                <input type="submit" />
            </form>
        </div>
    )
}

export default AddWorkout;