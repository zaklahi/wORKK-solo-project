const exercisesReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_WORKOUTEXERCISES':
      return action.payload;
    case 'UNSET_WORKOUTEXERCISES':
      return {};
    default:
      return state;
  }
};

// user will be on the redux state at:
// state.user
export default exercisesReducer;
