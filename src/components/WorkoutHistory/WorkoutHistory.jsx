

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import './WorkoutHistory.css'
//  import EditForm from '../Edit/AddWorkOut';


const WorkoutHistory = (props) => {
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
  
   
  

console.log('this is props',props)

const handleClick = () => {
    history.push("/home");
  };


    // const editWorkout = (workout) => {
    //     console.log('in editIdea const on ideas page', );
    //     dispatch({
    //       type: 'EDIT_WORKOUT',
    //       payload: workout
          
    //     });
    //     history.push(`/edit/${workout.id}`);
    //   }


    const deleteWorkout = (workout) => {
        dispatch({
          type: 'DELETE_WORKOUT',
          payload: {
            workout : workout
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
                <div className="workout-date">Date: {workout.workoutDate}</div>
                <div className="exercise-type">Exercise: {workout.exercise_type}</div>
                <div className="reps">Reps: {workout.reps}</div>
                <div className="sets">Sets: {workout.sets}</div>
                <div className="weight">Weight: {workout.weight}</div>
                <div className="notes">Notes: {workout.notes}</div>
              </div>
              
              <div className="button-box">
                <button className="button confirm-button"onClick={() => handleClick(workout)}>Confirm</button>
                <button className="button delete-button" onClick={() => deleteWorkout(workout)}>Delete</button>
                <Link to={`/edit/${workout.id}`}>
                  <button className="button edit-button">Edit</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      );
    };
    
    export default WorkoutHistory;