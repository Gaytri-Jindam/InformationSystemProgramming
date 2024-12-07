import React from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Privateroute = ({ component: Component, auth: { isAuthenticated, loading } }) => {
  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }
  return <Navigate to="/dashboard" />;
};

Privateroute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Privateroute);
