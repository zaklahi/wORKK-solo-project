import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import Button from "@material-ui/core/button";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const exercises = useSelector(store => store.exercises);
  const workoutExercises = useSelector(store => store.workoutExercises);

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch({ type: 'FETCH_EXERCISES' });
  }, []);



  useEffect(() => {
    dispatch({ type: 'FETCH_WORKOUTS' });
  }, []);
 
 
  const handleClickOne = () => {
   
    history.push(`/workout`)
  }

  const handleClickTwo = (workoutDisplay) => {
    
    history.push(`/`)

  }



  return (
    <div className="container">
      <h2>Welcome, {user.username}!</h2>
      <h3>{JSON.stringify(workoutExercises)}</h3>
      <p>GYM ID : {user.id}</p>
      <div>
      <div style={{width: '50%', height: '100vh', display: 'inline-block'}} onClick={handleClickOne}>

      <img src ='https://img.freepik.com/premium-vector/male-character-engage-sport-activities-doing-exercises-fitness-workout-running-jumping-rope-healthy-lifestyle-leisure-cartoon-flat-vector-illustration-isolated-white-background_603301-345.jpg?w=2000'></img>
      <Button onClick={() => history.push('/')} variant="outlined" color="primary">Start</Button>
        <h1>New Workout</h1>
        <p>Click to go to Section 1</p>
      </div>
      <div style={{width: '50%', height: '100vh', display: 'inline-block'}} onClick={handleClickTwo}>
     <img src='https://e7.pngegg.com/pngimages/764/652/png-clipart-muscle-cartoon-physical-fitness-muscular-workout-dumbbell-fitness-hand.png'></img>
     <Button onClick={() => history.push('/')} variant="outlined" color="primary">Previous Workouts</Button>
        <h1>Previous Workouts</h1>
        <p>Click to go to Section 2</p>

      </div>
    </div>

      <LogOutButton className="btn" />
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
