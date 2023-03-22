import React, {useEffect} from 'react';
import LogOutButton from '../LogOutButton/LogOutButton';
import { useDispatch, useSelector } from 'react-redux';
import {useState} from 'react';
import { useHistory } from 'react-router-dom';
import './UserPage.css'
import Button from "@material-ui/core/button";

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  const exercises = useSelector(store => store.exercises);
  const workouts = useSelector(store => store.workouts);

  const history = useHistory()
  const dispatch = useDispatch()

  console.log('this is workouts', workouts)

  useEffect(() => {
    dispatch({ type: 'FETCH_EXERCISES', payload: exercises });
  }, []);



  useEffect(() => {
    dispatch({ type: 'FETCH_WORKOUTS' });
  }, []);
 
 
  const handleClickOne = (exercise) => {
  
    history.push(`/exercises`)
  }

  const handleClickTwo = (workoutDisplay) => {
    
    history.push(`/history/:id`)

  }



  return (
    <div class="containery">
  <h2>Welcome Back, {user.username}!</h2>
  <p class="gym-id">GYM ID : {user.id}</p>
  
  <div class="workout-sections">
    <div class="workout-section" onClick={handleClickOne}>
      <img src="https://www.muscleandfitness.com/wp-content/uploads/2018/02/Dumbbell-Preacher-Curl-1109.jpg?quality=86&amp;strip=all" alt="Section 1"/>
      <div class="overlay">
        <h1>New Workout</h1>
     
        <button onClick={() => history.push('/')} class="start-button">Start</button>
      </div>
    </div>
    
    <div class="workout-section" onClick={handleClickTwo}>
      <img src="https://www.olivaclinic.com/wp-content/uploads/2021/04/14day-body-sculpting-workout-challenge.jpg" alt="Section 2"/> 
      <div class="overlay">
        <h1>Previous Workouts</h1>
        <button onClick={() => history.push('/')} class="start-button">View</button>
      </div>
    </div>
  </div>
  
  <LogOutButton class="logout-button" />
</div>
  );
}


export default UserPage;
