import React, {useState, useEffect} from 'react';
import {TextField, Button, Typography, Paper} from '@material-ui/core';
import FileBase from 'react-file-base64'
import { useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux';
import useStyles from './styles'
import { createPost, updatePost } from '../../actions/posts'

const Form = ({currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({title: '', message: '', tags: '', selectedFile: ''});
    const post = useSelector((state) => currentId ? state.posts.posts.find((p) => p._id === currentId): null)
    const classes = useStyles()
    const user = JSON.parse(localStorage.getItem('profile'))
    const history = useHistory()
    const dispatch = useDispatch();
    useEffect(() => {
        if(post) setPostData(post)
    },[post])
    const handleSubmit = (e) => {

        e.preventDefault();
        if(currentId){
            dispatch(updatePost(currentId, {...postData, name: user?.result?.name},history));
            clear()
        }else{
            dispatch(createPost({...postData, name: user?.result?.name }));
            clear()
        }


    }
    const clear = () => {
        setCurrentId(null);
        setPostData({ title: '', message: '', tags: '', selectedFile: ''})
    }

    if(!user?.result?.name){
        return (
            <Paper className={classes.paper}>
                <Typography variant="h6" align="center">
                    Please Sign in to create your own posts and like other's posts
                </Typography>
            </Paper>
        )
    }


    return (
        <Paper className={classes.paper} elevation={6}>
            <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
               <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a Post</Typography> 
               <TextField name="title" variant="outlined" label="title" fullWidth value={postData.title} onChange ={(e) => setPostData({...postData,title: e.target.value})} />
               <TextField name="message" variant="outlined" label="review" fullWidth value={postData.message} onChange ={(e) => setPostData({...postData,message: e.target.value})} />
               <TextField name="tags" variant="outlined" label="tags" fullWidth value={postData.tags} onChange ={(e) => setPostData({...postData,tags: e.target.value.split(',')})} />
               <div className={classes.fileInput}>
                   <FileBase
                    type="file"
                    multiple={false}
                    onDone={({base64})=> setPostData({...postData,selectedFile: base64})}
                   />
               </div>
               <Button className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>SUBMIT</Button>
               <Button className={classes.buttonSubmit} variant="contained" color="secondary" size="small" onClick={clear} fullWidth>CLEAR</Button>
            </form>
        </Paper>
    )
}

export default Form;