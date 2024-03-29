import { useDispatch, useSelector } from 'react-redux';
// import './StudentList.css';
import ExerciseDetail from '../ExerciseDetail/ExerciseDetail';
import React, {useEffect} from 'react';
import './ExerciseList.css'


function ExerciseList(props) {
    const dispatch = useDispatch()
    const exercises = useSelector(store => store.exercises);
    console.log('this is the exercise', exercises)
    useEffect(() => {
        dispatch({ type: 'FETCH_EXERCISES' });
      }, []);
    
    

    return (
        <div class="exercise-container">
    {exercises.map(exercise => {
        return (
            <div class="exercise-card" key={exercise.exercise_Id}>
                <ExerciseDetail exercise={exercise} />
            </div>
        );
    })}
</div>
    );
    
}

export default ExerciseList;
