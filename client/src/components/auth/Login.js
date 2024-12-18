import React , { Fragment , useState } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom'; 
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState(
        {
            email: '',
            password: ''
        }
    );
    const { email, password} = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    
    const onSubmit = async e => {
        e.preventDefault();
       login(email,password);
    };

    //Redirect to login
    if(isAuthenticated)
    {
      return <Navigate to="/dashboard" />;

    }
    return  <Fragment>
<h1 className="large text-primary">Sign In</h1>
      <p className="lead"><i class="fas fa-user"></i> Sign Into Your Account</p>
      <form className="form" action="create-profile.html" onSubmit={e => onSubmit(e)}>
        <div class="form-group">
          <input type="email" placeholder="Email Address" name="email" value = {email}
          onChange={e => onChange(e)} required/>
        </div>
        <div class="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            value = {password}
          onChange={e => onChange(e)} required
            minLength="6"
          />
        </div>
        <input type="submit" class="btn btn-primary" value="Login" />
      </form>
      <p class="my-1">
      Don't have an account? <Link to='/register'>Sign Up</Link>
      </p>
    </Fragment>
};
 Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
 }

 const mapStateToProps = state => ({
isAuthenticated: state.auth.isAuthenticated
 });

export default connect(mapStateToProps,{ login })(Login);