import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react'
import axios from 'axios';
import './EditForm.css'

function EditForm(action) {
    const history = useHistory();
    const dispatch = useDispatch();
    const workouts = useSelector(store => store.workouts)
    const [reps, setReps] = useState(0);
    const [sets, setSets] = useState(0);
    const [notes, setNotes] = useState('');
    const [weight, setWeight] = useState('');
    const { id } = useParams();

  useEffect(() => {
    if (id) {
      axios.get(`/api/workout/${id}`).then(response => {
        console.log("THE WORKOUT: ", response.data[0])
        const workout = response.data[0]
        setReps(workout.reps);
        setSets(workout.sets);
        setNotes(workout.notes);
        setWeight(workout.weight);
      }).catch(error => {
        console.log(error);
      })
    }
  }, [id]); 

  function handleSubmit(e) {
    e.preventDefault();
        console.log('this is the reps, ect values',reps, sets, weight,notes)
        dispatch({type: 'EDIT_WORKOUT', payload: {reps,sets,notes,weight, id}, history});
    
    }

    // function editReps(event) {
    //     event.preventDefault();
    //     console.log('handle change', event.target.value);
    //     dispatch({
    //         type: 'EDIT_REPS_ONCHANGE',
    //         payload: { property: 'reps', value: event.target.value }
    //     })
    // }
    // const editSets = (event) => {
    //     console.log('updated style: ', event.target.value);
    //     dispatch({
    //         type: "EDIT_SETS_ONCHANGE",
    //         payload: {property: 'sets', value: event.target.value}
    //     });
    // } 
    // const editWeight = (event) => {
    //     console.log('updated style: ', event.target.value);
    //     dispatch({
    //         type: "EDIT_WEIGHT_ONCHANGE",
    //         payload: {property: 'weight', value: event.target.value}
    //     });
    // } 
    // const editNotes = (event) => {
    //     console.log('updated style: ', event.target.value);
    //     dispatch({
    //         type: "EDIT_NOTES_ONCHANGE",
    //         payload: {property: 'notes', value: event.target.value}
    //     });
    // } 
//  console.log('this is editWorkouts console.log ', )
    return (
        <>
          <h2>Edit Workout</h2>
          <div className="edit">
            <div className="input-container">
              <form onSubmit={handleSubmit}>  
                <input
                  onChange={(event) => setReps(event.target.value)} 
                  value={reps} 
                />
                <input
                  onChange={(event) => setSets(event.target.value)}
                  value={sets} 
                />
                <input
                  onChange={(event) => setWeight(event.target.value)}
                  value={weight} 
                />
                <input
                  onChange={(event) => setNotes(event.target.value)}
                  value={notes} 
                />
                <input type='submit' />
              </form>
            </div>
          </div>
        </> 
    );
}

export default EditForm;