import { GLOBAL_TYPES } from './globalTypes';
import { postDataAPI } from '../../utils/fetchData';
import { validate } from '../../utils/validate';

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } });

    const { data } = await postDataAPI('users/login', { email, password });

    dispatch({ type: GLOBAL_TYPES.AUTH, payload: { token: data.access_token, user: data.user } });

    localStorage.setItem('firstLogin', true);

    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { success: data.msg } });
  } catch (err) {
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: err.response.data.msg } });
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem('firstLogin');

  if (firstLogin) {
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } });

    try {
      const { data } = await postDataAPI('users/refresh_token');

      dispatch({
        type: GLOBAL_TYPES.AUTH,
        payload: {
          token: data.access_token,
          user: data.user,
        },
      });

      dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false } });
    } catch (err) {
      dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: err.response.data.msg } });
    }
  }
};

export const register = (userData) => async (dispatch) => {
  try {
    const { errMsg, errLength } = validate(userData);

    if (errLength > 0) return dispatch({ type: GLOBAL_TYPES.ALERT, payload: errMsg });

    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: true } });

    const { data } = await postDataAPI('users/register', userData);

    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { loading: false, success: data.msg } });

    dispatch({ type: GLOBAL_TYPES.AUTH, payload: { token: data.access_token, user: data.user } });

    localStorage.setItem('firstLogin', true);
  } catch (err) {
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: err.response.data.msg } });
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem('firstLogin');

    await postDataAPI('users/logout');
    window.location.href = '/';
  } catch (err) {
    dispatch({ type: GLOBAL_TYPES.ALERT, payload: { error: err.response.data.msg } });
  }
};
