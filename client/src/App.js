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
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
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
<Route path="/profiles" element={<Profiles />} />
<Route path="/profile/:id" element={<Profile />} />
<Route path="/dashboard" element={<Dashboard />} />
<Route path="/create-profile" element={<CreateProfile />} />
<Route path="/edit-profile" element={<EditProfile />} />
<Route path="/add-experience" element={<AddExperience />} />
<Route path="/add-education" element={<AddEducation />} />
<Route path="/posts" element={<Posts />} />
<Route path="/posts/:id" element={<Post />} />

</Routes>
</section>
    </Fragment>
    </Router>
    </Provider>
)};

export default App;
