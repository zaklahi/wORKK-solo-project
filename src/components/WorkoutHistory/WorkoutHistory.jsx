

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './WorkoutHistory.css'
//  import AddWorkOut from '../AddWorkOut/AddWorkOut';


const WorkoutHistory = () => {
    const activity = useSelector(store => store)
    const exercises = useSelector(store => store.exercises);
    const workouts = useSelector(store => store.workouts.exercisesReducer);



    const history = useHistory()
    const dispatch = useDispatch();
    const { workoutId } = useParams();
    const { id } = useParams();
    // const { reps, sets, weight, notes } = useSelector(store => store.workouts);

   
   

    useEffect(() => {
      dispatch({ type: 'FETCH_WORKOUTS' });
    
    }, [dispatch]);
  
   
  

console.log('this is workouts',workouts)

const handleClick = () => {
    history.push("/home");
  };


    const editWorkout = (workouts) => {
        console.log('in editIdea const on ideas page');
        dispatch({
          type: 'SET_EDIT_WORKOUT',
          payload: workouts
        });
        history.push(`/edit`);
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
        <div className="container">
          <div className="header">
            <h3>Past Workouts:</h3>
          </div>
          {workouts.map((workout) => (
            <div className="workout-box" key={workout.id}>
              <div className="workout-info">
                <div className="workout-date">Date: {workout.WorkoutDate}</div>
                <div className="exercise-type">Exercise: {workout.Exercise_Type}</div>
                <div className="reps">Reps: {workout.Reps}</div>
                <div className="sets">Sets: {workout.Sets}</div>
                <div className="weight">Weight: {workout.Weight}</div>
                <div className="notes">Notes: {workout.Notes}</div>
              </div>
              <div className="button-box">
                <button className="button confirm-button">Confirm</button>
                <button className="button delete-button" onClick={() => deleteWorkout(workout)}>Delete</button>
                <button className="button edit-button" onClick={() => editWorkout(workout)}>Edit</button>
              </div>
            </div>
          ))}
        </div>
      );
    };
    
    export default WorkoutHistory;