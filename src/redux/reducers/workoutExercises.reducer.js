const exercisesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_WORKOUTS':
      return action.payload;
    case 'UNSET_WORKOUTS':
      return {};
    default:
      return state;
  }
};

const editWorkout = (state  = {}, action) => {
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

// user will be on the redux state at:
// state.user
export default exercisesReducer;
