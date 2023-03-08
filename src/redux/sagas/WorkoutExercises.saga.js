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
    console.log(action.payload)
      // This route should return the id of the created workout
      const response = yield axios.post('/api/workout', action.payload);
      for(let workoutExercise of action.payload.workoutExercise) {
          workoutExercise.workoutId = response.data.id;
          yield axios.post('/api/workout/new', workoutExercise);
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
          action.history.push('/');
      }
  } catch (e) {
      console.log(e);
  }
}

function* workoutExercisesSaga() {
  yield takeLatest('FETCH_WORKOUTS', fetchWorkoutExcercises
  );
  yield takeLatest('POST_WORKOUTS', createWorkout
  );
  yield takeLatest('ADD_WORKOUT', addWorkout);
}

export default workoutExercisesSaga;
