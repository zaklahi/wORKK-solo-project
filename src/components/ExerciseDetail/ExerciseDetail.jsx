import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './ExerciseList.css'

function ExercisesDetail(props) {

  const dispatch = useDispatch();
  const history = useHistory();
  const { exercise_Id, exercise_type, poster } = props.exercise;
  const { exerciseId } = useParams();



  useEffect(() => {
    dispatch({ type: 'FETCH_EXERCISES', payload: exerciseId });
}, [exerciseId]);


  function handleEditClick(exercise){
    const id = exercise_Id
    console.log("in handle click, student: ", props.exercise);
    dispatch({ type: 'FETCH_EXERCISES', payload: props.exercise});
    history.push(`/workout/${exercise_Id}`);
  }

  return (
    <>
  
    <tr>
        
    
      <td>{exercise_type} </td>
        </tr>
       <>
         <button onClick={handleEditClick}>SELECT</button>
       </>
      
       
    
    
    
    </>
    
      
   
  );
}

export default ExercisesDetail;

