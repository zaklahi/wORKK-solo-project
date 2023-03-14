import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './EditForm.css'

function EditForm(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const editWorkout = useSelector((store) => store.editWorkout);

    function handleSubmit(){
        dispatch({type: 'SAVE_UPDATES', payload: editWorkout});
        history.push('/history');
    }

    function handleChange(event) {
        event.preventDefault();
        console.log('handle change', event.target.value);
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: { property: 'reps', value: event.target.value }
        })
    }
    return (
        <>
            <h2>Edit Workout</h2>
            <p>This is the student we're editing: {editWorkout}</p>
            <form onSubmit={handleSubmit}>
                <input
                onChange={(event) => handleChange(event)}
                placeholder='reps'
                />
                 <input
                onChange={(event) => handleChange(event)}
                placeholder='sets'
                />
                 <input
                onChange={(event) => handleChange(event)}
                placeholder='weights'
                />
                 <input
                onChange={(event) => handleChange(event)}
                placeholder='notes'
                />
               

                <input type='submit' value='Update Student' />
            </form>
        </>
    );
}

export default EditForm;