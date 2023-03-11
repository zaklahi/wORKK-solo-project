import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';


function WorkoutPage(){

const history = useHistory();
const dispatch = useDispatch();

const workouts = useSelector(store => store.workouts);
const user = useSelector((store) => store.user);


const deleteWorkout = (idea) => {
    dispatch({
      type: 'DELETE_WORKOUT',
      payload: {
        id: idea.id
      }
    })
  }



















}

export default WorkoutPage;