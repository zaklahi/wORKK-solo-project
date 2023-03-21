const exercisesReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return action.payload;
    case 'UNSET_WORKOUTS':
      return {};
    default:
      return state;
  }
};

const workoutReducer = (state = {}, action) => {
  if (action.type === 'SET_THIS_WORKOUT') {
    return action.payload;
  } else {
      return state;
  }
};

const editWorkout = (state  = [],  action) => {
  if(action.type === 'SET_EDIT_WORKOUT'){
      return action.payload;
  } else if (action.type === 'EDIT_REPS_ONCHANGE'){
      console.log('EDIT', action.payload);
      return {
          ...state,
          [action.payload.property]: action.payload.value
      }
  }else if (action.type === 'EDIT_SETS_ONCHANGE'){
    console.log('EDIT', action.payload);
    return {
        ...state,
        [action.payload.property]: action.payload.value
    }
}else if (action.type === 'EDIT_WEIGHT_ONCHANGE'){
  console.log('EDIT', action.payload);
  return {
      ...state,
      [action.payload.property]: action.payload.value
  }
}else if (action.type === 'EDIT_NOTES_ONCHANGE'){
  console.log('EDIT', action.payload);
  return {
      ...state,
      [action.payload.property]: action.payload.value
  }
}
  return state;
}

import { combineReducers, createStore } from 'redux';

// const initialState = {
//   reps: '',
//   sets: '',
//   weight: '',
//   notes: '',
// };




export default combineReducers({
    exercisesReducer, 
    editWorkout,
    workoutReducer
  });
  

// user will be on the redux state at:
// state.user

