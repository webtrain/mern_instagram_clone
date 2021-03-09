import { GLOBAL_TYPES } from '../actions/globalTypes';

const initialState = {};

const notifyReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GLOBAL_TYPES.ALERT:
      return payload;
    default:
      return state;
  }
};

export default notifyReducer;