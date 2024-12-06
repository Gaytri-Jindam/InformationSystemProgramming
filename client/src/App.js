import './App.css';
import { BrowserRouter as Router, Routes, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
import React, { Fragment , useEffect} from 'react';
//Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import Privateroute from './components/routing/Privateroute';
if(localStorage.token){
  setAuthToken(localStorage.token);
}


const App = () => { 

  useEffect(() => {
  store.dispatch(loadUser());
  }, []);

  return (
  <Provider store={store}>
  <Router>
    <Fragment>
  <Navbar/>
  <Routes>
  <Route exact path='/' element={ <Landing/> } />
  </Routes>
  <section className="container">
    <Alert/>
  <Routes>
<Route exact path='/register' element={ <Register/> } />
<Route exact path='/login' element={ <Login/> } />
<Route path="/dashboard" element={<Dashboard />} />
</Routes>
</section>
    </Fragment>
    </Router>
    </Provider>
)};

export default App;
