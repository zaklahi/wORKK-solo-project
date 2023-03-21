import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_USER" actions
function* fetchWorkoutExcercises(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // If a user is logged in, this will return their information
    // from the server session (req.user)
    const response = yield axios.get(`/api/workout`, config);
    console.log('this is the response.data for workout', response.data)
    // now that the session has given us a user object
    // with an id and username set the client-side user object to let
    // the client-side code know the user is logged in
    yield put({ type: 'SET_WORKOUTS', payload: response.data});
  } catch (error) {
    console.log('User get request failed', error);
  }
}



function* createWorkout(action) {
  try {
    console.log('how about here?' ,action.payload)
      // This route should return the id of the created workout
      const response = yield axios.post('/api/workout', action.payload);

      for(let workoutExercise of action.payload.workoutExercise) {
          workoutExercise.workoutId = response.data.id;
          yield axios.post('/api/workout/', workoutExercise);
      }
      yield put({ type: 'FETCH_WORKOUTS' });
  } catch (error) {
      console.log('Something went wrong', error);
      alert('Something went wrong.');
  }
}


function* addWorkout(action) {
  try {
      yield axios.post(`api/workout`, action.payload);
      if (action.history) {
          // Redirect back to the movie list
          action.history.push(("/history/:id"));
      }
  } catch (e) {
      console.log(e);
  }
}

function* editWorkout(action) {
  (console.log('this is action payload in the editWorkout', action.payload))
  const id  = action.payload.id;
  try {
      yield axios.put(`/api/workout/${id}`, action.payload);
    yield put({ type: 'FETCH_WORKOUTS', payload: action.payload});
    if (action.history) {
      // Redirect back to the movie list
      action.history.push(("/history/:id"));
  }
  } catch (error) {
    console.log('Error editing workouts', error);
  };
};

function* workoutDetails(action) {
  //get the indiviual workout from the database
  const id = action.payload;
  try {
    const workout = yield axios.get(`/api/workout/${id}`)
    yield put({ type: 'SET_THIS_WORKOUT', payload: workout.data })
  } catch (e) {
    console.log("oops")
  }
}


function* deleteWorkout(action) {
  console.log(' delete  payload', action.payload);
  const workoutObj  = action.payload.workout;
  console.log(' id payload', workoutObj);
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };
    yield axios.delete(`/api/workout/${workoutObj.id}`, config);

    yield put({ type: 'FETCH_WORKOUTS'});
  } catch (error) {
    console.log('Error delete route', error);
  }
} 
// function* saveUpdates(action){
//   console.log('in save updates', action);
//   yield axios.put(`/workout/${action.payload.id}`,  {reps: action.payload.reps});
// }


function* workoutExercisesSaga() {
  yield takeLatest('FETCH_WORKOUTS', fetchWorkoutExcercises);
  yield takeLatest('POST_WORKOUTS', createWorkout);
  yield takeLatest('ADD_WORKOUT', addWorkout);
  yield takeLatest('DELETE_WORKOUT', deleteWorkout);
  yield takeLatest('EDIT_WORKOUT', editWorkout);
  yield takeLatest('FETCH_WORKOUT_DETAILS', workoutDetails)
  // yield takeLatest('SAVE_UPDATES', saveUpdates)
}

export default workoutExercisesSaga;
