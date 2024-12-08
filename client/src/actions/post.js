import axios  from 'axios';
import { setAlert } from './alert';
import { ADD_POST, ADD_COMMENT, REMOVE_COMMENT,DELETE_POST, GET_POST, GET_POSTS,POST_ERROR, UPDATE_LIKES } from './types';


//get posts
export const getPosts = () => async dispatch => {
    try {
        
        const res = await axios.get('/api/posts');

        dispatch({
            type: GET_POSTS,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        });
    
    }
}

//Add Like
export const addLike = id => async dispatch => {
    try {
        
    const res = await axios.put(`/api/posts/like/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        });
    
    }
}

//Remove Like
export const removeLike = id => async dispatch => {
    try {
        
    const res = await axios.put(`/api/posts/unlike/${id}`);

        dispatch({
            type: UPDATE_LIKES,
            payload: { id, likes: res.data }
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        });
    
    }
}

//delete post
export const deletePost = id => async dispatch => {
    try {
        
     await axios.delete(`/api/posts/${id}`);

        dispatch({
            type: DELETE_POST,
            payload: id 
        });
        dispatch(setAlert('Post Removed' ,'Success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        });
    
    }
}

//Add post
export const addPost = formData => async dispatch => {
const config = {
    headers: {
        'Content-Type': 'application/json'
    }
}
    try {
        
    const res = await axios.post('/api/posts',formData, config);

        dispatch({
            type: ADD_POST,
            payload: res.data 
        });
        dispatch(setAlert('Post Created' ,'Success'))
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        });
    
    }
}

//get post
export const getPost = id => async dispatch => {
    try {
        
        const res = await axios.get(`/api/posts/${id}`);

        dispatch({
            type: GET_POST,
            payload: res.data
        });
    } catch (error) {
        dispatch({
            type: POST_ERROR,
            payload: { msg: error.response.statusText, status: error.response.status}
        });   
    }
}
//Add comment
export const addComment = (postId, formData) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
        try {
            
        const res = await axios.post(`/api/posts/comment/${postId}`,formData, config);
    
            dispatch({
                type: ADD_COMMENT,
                payload: res.data 
            });
            dispatch(setAlert('Comment Added' ,'Success'))
        } catch (error) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status}
            });
        
        }
    }
   
//Delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
        try {
            
        await axios.delete(`/api/posts/comment/${postId}/${commentId}`);
    
            dispatch({
                type: REMOVE_COMMENT,
                payload: commentId
            });
            dispatch(setAlert('Comment Removed' ,'Success'))
        } catch (error) {
            dispatch({
                type: POST_ERROR,
                payload: { msg: error.response.statusText, status: error.response.status}
            });
        
        }
    }
