import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/actions/authActions';

const Login = () => {
  const dispatch = useDispatch();

  const initialState = { email: '', password: '' };

  const [userData, setUserData] = useState(initialState);
  const { email, password } = userData;

  const { auth } = useSelector((state) => state);
  const history = useHistory();

  const [typePass, setTypePass] = useState(false);

  useEffect(() => {
    auth.token && history.push('/');
  }, [history, auth.token]);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(login(email, password));
  };

  return (
    <div className="auth_page">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            name="email"
            className="form-control"
            id="email"
            value={email}
            onChange={handleChangeInput}
          />
          <small id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </small>
        </div>

        <div className="form-group mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <div className="pass">
            <input
              type={typePass ? 'text' : 'password'}
              name="password"
              className="form-control"
              id="password"
              value={password}
              onChange={handleChangeInput}
            />
            <small onClick={() => setTypePass(!typePass)}>{typePass ? 'hide' : 'show'}</small>
          </div>
        </div>

        <button type="submit" className="btn btn-dark w-100" disabled={!email && !password}>
          Login
        </button>

        <small className="my-2">
          Don't have an account? <Link to="/register">Register</Link>
        </small>
      </form>
    </div>
  );
};

export default Login;
