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



// user will be on the redux state at:
// state.user
export default exercisesReducer;
