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
    yield put({ type: 'SET_WORKOUTEXERCISES', payload: response.data});
  } catch (error) {
    console.log('User get request failed', error);
  }
}

function* createWorkout(action) {
  try {
    console.log(action.payload)
      // This route should return the id of the created workout
      const response = yield axios.post('/api/workout/new', action.payload);
      for(let workoutExercise of action.payload.workoutExercise) {
          workoutExercise.workoutId = response.data.id;
          yield axios.post('/api/workout/exercise', workoutExercise);
      }
      yield put({ type: 'FETCH_WORKOUTEXERCISES' });
  } catch (error) {
      console.log('Something went wrong', error);
      alert('Something went wrong.');
  }
}

function* workoutExercisesSaga() {
  yield takeLatest('FETCH_WORKOUTEXERCISES', fetchWorkoutExcercises
  );
  yield takeLatest('POST_WORKOUTEXERCISES', createWorkout
  );
}

export default workoutExercisesSaga;
