import { GLOBAL_TYPES } from '../actions/globalTypes';

const initialState = {};

const authReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GLOBAL_TYPES.AUTH:
      return payload;
    default:
      return state;
  }
};

export default authReducer;
