import axios from 'axios';
import { setAlert } from './alert';

import {
    GET_PROFILE,
    PROFILE_ERROR,
    UPDATE_PROFILE
} from './types';
import { header } from 'express-validator';


// get current users profile
export const getCurrentProfile = () =>
    async dispatch => {
    
try {
    const res = await axios.get('/api/profile/me');

    dispatch({
        type: GET_PROFILE,
        payload: res.data
    });
} catch (error) {
    dispatch({
        type: PROFILE_ERROR,
        payload: { msg: error.response.statusText, status: error.response.status}
    });
    }
    };

// Create or update profile

export const createProfile = (formData, navigate, edit = false) =>
    async dispatch => {
    
try {
    const config ={
        headers : {
            'Content-Type' : 'application/json'
        }
    }
    const res = await axios.post('/api/profile',formData,config);

    dispatch({
        type: GET_PROFILE,
        payload: res.data
    });
    console.log(" edit" , edit);
    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'Success'));
    if(!edit)
    {
        navigate('/dashboard');
    }

} catch (error) {
    const errors = error.response.data.errors;

    if(errors)
    {
        errors.forEach((error) => {
            dispatch(setAlert(error.msg, 'danger'));
        });
    }

    dispatch({
        type: PROFILE_ERROR,
        payload: { msg: error.response.statusText, status: error.response.status}
    });
    }
    };

export const addExperience = ( formData, navigate) =>
    async dispatch =>
    {
        try {
            const config ={
                headers : {
                    'Content-Type' : 'application/json'
                }
            }
            console.log(" addExperience");
            const res = await axios.put('/api/profile/experience',formData,config);
            console.log(" addExperience",res);

            dispatch({
                type: UPDATE_PROFILE,
                payload: res.data
            });
            dispatch(setAlert('Experience Added ','Success'));
            
                navigate('/dashboard');
        
        } catch (error) {
            const errors = error.response?.data?.errors;
            if (errors) {
                errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
            }
    
            dispatch({
                type: PROFILE_ERROR,
                payload: {
                    msg: error.response?.statusText || 'Server Error',
                    status: error.response?.status || 500
                }
            });
                }
        
    };

    export const addEducation = ( formData, navigate) =>
        async dispatch =>
        {
            try {
                const config ={
                    headers : {
                        'Content-Type' : 'application/json'
                    }
                }
                const res = await axios.put('/api/profile/education',formData,config);
            
                dispatch({
                    type: UPDATE_PROFILE,
                    payload: res.data
                });
                dispatch(setAlert('Education Added ','Success'));
                
                    navigate('/dashboard');
            
            } catch (error) {
                const errors = error.response?.data?.errors;
                if (errors) {
                    errors.forEach((err) => dispatch(setAlert(err.msg, 'danger')));
                }
        
                dispatch({
                    type: PROFILE_ERROR,
                    payload: {
                        msg: error.response?.statusText || 'Server Error',
                        status: error.response?.status || 500
                    }
                });
                        }
            
        };