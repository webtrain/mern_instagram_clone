import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { register } from '../redux/actions/authActions';

const Register = () => {
  const dispatch = useDispatch();
  const { auth, alert } = useSelector((state) => state);
  const history = useHistory();

  const initialState = {
    fullname: '',
    username: '',
    email: '',
    password: '',
    cf_password: '',
    gender: 'male',
  };

  const [userData, setUserData] = useState(initialState);
  const { fullname, username, email, password, cf_password } = userData;

  const [typePass, setTypePass] = useState(false);
  const [typeCfPass, setTypeCfPass] = useState(false);

  const handleChangeInput = (e) => {
    const { name, value } = e.target;

    setUserData({ ...userData, [name]: value });
  };

  useEffect(() => {
    auth.token && history.push('/');
  }, [history, auth.token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(userData));
  };

  return (
    <div className="auth_page">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="fullname" className="form-label">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            className="form-control"
            id="fullname"
            value={fullname}
            onChange={handleChangeInput}
            style={{ border: `${alert.fullname ? '2px solid #b00202' : ''}` }}
          />
          {alert && alert.fullname && <small className="form-text text-danger">{alert.fullname}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            name="username"
            className="form-control"
            id="username"
            value={username.toLowerCase().replace(/ /g, '')}
            onChange={handleChangeInput}
            style={{ border: `${alert.fullname ? '2px solid #b00202' : ''}` }}
          />
          {alert && alert.username && <small className="form-text text-danger">{alert.username}</small>}
        </div>

        <div className="form-group">
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
            style={{ border: `${alert.fullname ? '2px solid #b00202' : ''}` }}
          />
          {alert && alert.email && <small className="form-text text-danger">{alert.email}</small>}
        </div>

        <div className="form-group">
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
              style={{ border: `${alert.password ? '2px solid #b00202' : ''}` }}
            />
            <small onClick={() => setTypePass(!typePass)}>{typePass ? 'hide' : 'show'}</small>
          </div>
          {alert && alert.password && <small className="form-text text-danger">{alert.password}</small>}
        </div>

        <div className="form-group">
          <label htmlFor="cf_password" className="form-label">
            Confirm Password
          </label>
          <div className="pass">
            <input
              type={typeCfPass ? 'text' : 'password'}
              name="cf_password"
              className="form-control"
              id="cf_password"
              value={cf_password}
              onChange={handleChangeInput}
              style={{ border: `${alert.cf_password ? '2px solid #b00202' : ''}` }}
            />
            <small onClick={() => setTypeCfPass(!typeCfPass)}>{typeCfPass ? 'hide' : 'show'}</small>
          </div>
          {alert && alert.cf_password && <small className="form-text text-danger">{alert.cf_password}</small>}
        </div>

        <div className="gender">
          <label htmlFor="male">
            Male
            <input type="radio" name="gender" id="male" value="male" defaultChecked onChange={handleChangeInput} />
          </label>

          <label htmlFor="female">
            Female
            <input type="radio" name="gender" id="female" value="female" onChange={handleChangeInput} />
          </label>

          <label htmlFor="other">
            Other
            <input type="radio" name="gender" id="other" value="other" onChange={handleChangeInput} />
          </label>
        </div>

        <button className="btn btn-dark w-100">Register</button>

        <small className="my-2">
          Already have an account? <Link to="/">Sign In</Link>
        </small>
      </form>
    </div>
  );
};

export default Register;
