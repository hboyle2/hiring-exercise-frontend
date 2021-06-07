import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Controller } from "react-hook-form";
import { TextField, Button, Box, Snackbar } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { authenticateUser } from '../services'
import { useHistory } from 'react-router-dom';
// const useStyles = makeStyles((theme) => {
//     form: {
//         display: 'flex',

//     }
// })

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
});
const Login = () => {
    const history = useHistory();
    const [authError, setAuthError] = useState('')
    const [open, setOpen] = useState(false)
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const onSubmit = async data => {
        try {
            const loginStatus = await authenticateUser(data)
            loginStatus && history.push('/')
        } catch (error) {
            setOpen(true)
            setAuthError('Oops! Somthing went wrong. Please check your credentials and try again.')
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Box display='flex' flexDirection='column' mx='auto' maxWidth={200} justifyContent='center'>
                <Controller
                    render={({ field }) => <TextField {...field} error={errors.username ? true : false} variant='outlined' placeholder='username' helperText={errors?.username?.message} />}
                    name="username"
                    control={control}
                    defaultValue=""
                />

                <Controller
                    render={({ field }) => <TextField {...field} error={errors.password ? true : false} variant='outlined' placeholder='password' helperText={errors?.password?.message} />}
                    name="password"
                    control={control}
                    defaultValue=""
                />

                <Button type='submit' variant='contained' color='primary'>Submit</Button>
            </Box>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert onClose={handleClose} severity="error" elevation={6} variant="filled" >
                    {authError}
                </MuiAlert>
            </Snackbar>
        </form>
    )
}

export default Login