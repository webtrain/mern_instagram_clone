import { GLOBAL_TYPES } from '../actions/globalTypes';

const initialState = false;

const themeReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GLOBAL_TYPES.THEME:
      return payload;
    default:
      return state;
  }
};

export default themeReducer;
