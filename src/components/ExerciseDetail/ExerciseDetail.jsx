import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import React, {useEffect} from 'react';
import { useParams } from 'react-router-dom';
import './ExerciseList.css'

function ExercisesDetail(props) {

  const dispatch = useDispatch();
  const history = useHistory();
  const { Exercise_Id, Exercise_Type, poster } = props.exercise;
  const { exerciseId } = useParams();



  useEffect(() => {
    dispatch({ type: 'FETCH_EXERCISES', payload: exerciseId });
}, [exerciseId]);


  function handleEditClick(exercise){
    const id = Exercise_Id
    console.log("in handle click, student: ", props.exercise);
    dispatch({ type: 'FETCH_EXERCISES', payload: props.exercise});
    history.push(`/workout/${Exercise_Id}`);
  }

  return (
    <>
  
    <tr>
        
    
      <td>{Exercise_Type} </td>
        </tr>
       <>
         <button onClick={handleEditClick}>SELECT</button>
       </>
      
       
    
    
    
    </>
    
      
   
  );
}

export default ExercisesDetail;

