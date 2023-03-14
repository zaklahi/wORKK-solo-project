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

const editWorkout = (state  = [], action) => {
  if(action.type === 'SET_EDIT_WORKOUT'){
      return action.payload;
  } else if (action.type === 'EDIT_ONCHANGE'){
      console.log('EDIT', action.payload);
      return {
          ...state,
          [action.payload.property]: action.payload.value
      }
  }
  return state;
}
const selectedWorkout = (state = {}, action) => {
  switch (action.type) {
      case 'SET_WORKOUT_DETAILS':
          return action.payload;
      default:
          return state;
  }
}
import { combineReducers, createStore } from 'redux';

// const initialState = {
//   reps: '',
//   sets: '',
//   weight: '',
//   notes: '',
// };

const AddWorkout = (state = '', action) => {
  switch (action.type) {
    case 'ADD_WORKOUT':
        return {
            ...state,
            reps: action.payload,
          };
    default:
      return state;
  }
};

const setsReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_SETS':
        return {
            ...state,
            sets: action.payload,
          };
    default:
      return state;
  }
};

const weightReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_WEIGHT':
        return {
            ...state,
            weights: action.payload,
          };
    default:
      return state;
  }
};

const notesReducer = (state = '', action) => {
  switch (action.type) {
    case 'UPDATE_NOTES':
        return {
            ...state,
            notes: action.payload,
          };
    default:
      return state;
  }
};

export default combineReducers({
    exercisesReducer, 
    editWorkout
  });
  

// user will be on the redux state at:
// state.user

