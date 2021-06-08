import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Controller } from "react-hook-form";
import { TextField, Button, Box, Snackbar, Typography } from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { authenticateUser } from '../services'
import { useHistory } from 'react-router-dom';
import FormContainer from '../components/FormContainer'
const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        maxWidth: 200
    },
    textField: {
        margin: theme.spacing(2),

    },
    header: {
        paddingTop: theme.spacing(6)
    }
}))

const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
});
const Login = () => {
    const classes = useStyles()
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
            localStorage.setItem('user', JSON.stringify(loginStatus.data))
            loginStatus && history.push('/')
        } catch (error) {
            setOpen(true)
            setAuthError('Oops! Somthing went wrong. Please check your credentials and try again.')
        }
    };

    return (
        <>
            <Typography className={classes.header} variant='h4' color="textSecondary" >Login</Typography>
            <FormContainer>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>

                    <Controller
                        render={({ field }) => <TextField {...field} className={classes.textField} label='username' error={errors.username ? true : false} variant='outlined' placeholder='username' helperText={errors?.username?.message} InputLabelProps={{ shrink: true, }} />}
                        name="username"
                        control={control}
                        defaultValue=""
                    />
                    <Controller
                        render={({ field }) => <TextField {...field} className={classes.textField} label='password' error={errors.password ? true : false} variant='outlined' placeholder='password' helperText={errors?.password?.message} InputLabelProps={{ shrink: true, }} />}
                        name="password"
                        control={control}
                        defaultValue=""
                    />
                    <Button type='submit' variant='contained' color='primary'>Submit</Button>


                </form>
            </FormContainer>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert onClose={handleClose} severity="error" elevation={6} variant="filled" >
                    {authError}
                </MuiAlert>
            </Snackbar>
        </>
    )
}

export default Login