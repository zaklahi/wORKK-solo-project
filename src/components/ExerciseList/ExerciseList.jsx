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
        <div>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {exercises.map(exercise => {
                        return <ExerciseDetail key={exercise.Exercise_Id} exercise={exercise} />
                    })}
                </tbody>
            </table>
        </div>
    );
    
}

export default ExerciseList;
