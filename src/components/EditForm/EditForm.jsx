import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

function EditForm(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const editWorkout = useSelector((store) => store.editWorkout);

    function handleSubmit(){
        dispatch({type: 'SAVE_UPDATES', payload: editWorkout});
        history.push('/workout');
    }

    function handleChange(event) {
        event.preventDefault();
        console.log('handle change', event.target.value);
        dispatch({
            type: 'EDIT_ONCHANGE',
            payload: { property: 'github_name', value: event.target.value }
        })
    }
    return (
        <>
            <h2>Edit Student</h2>
            <p>This is the student we're editing: {editStudent.github_name}</p>
            <form onSubmit={handleSubmit}>
                <input
                onChange={(event) => handleChange(event)}
                placeholder='GitHub username'
                />

                <input type='submit' value='Update Student' />
            </form>
        </>
    );
}

export default EditForm;