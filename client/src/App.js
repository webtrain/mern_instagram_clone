import { useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { refreshToken } from './redux/actions/authActions';

import PageRender from './customRouter/PageRender';
import PrivateRouter from './customRouter/PrivateRouter';

import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import Alert from './components/Alert/Alert';
import Header from './components/header/Header';

function App() {
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state);

  useEffect(() => {
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <Router>
      <Alert />

      <input type="checkbox" name="theme" id="theme" />

      <div className="app">
        <main>
          {auth.token && <Header />}
          <Route exact path="/" component={auth.token ? Home : Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRouter exact path="/:page" component={PageRender} />
          <PrivateRouter exact path="/:page/:id" component={PageRender} />
        </main>
      </div>
    </Router>
  );
}

export default App;
