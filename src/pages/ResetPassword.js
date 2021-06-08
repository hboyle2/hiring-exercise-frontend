import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Controller } from "react-hook-form";
import { TextField, Button, Snackbar, Typography } from '@material-ui/core'
import FormContainer from '../components/FormContainer'
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { resetPassword } from '../services'
const useStyles = makeStyles((theme) => ({
    form: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    textField: {
        margin: theme.spacing(2),

    },
    header: {
        paddingTop: theme.spacing(6)
    }
}))

const schema = yup.object().shape({
    currentPassword: yup.string().required(),
    newPassword: yup.string().required(),
    confirmNewPassword: yup.string().required().oneOf([yup.ref('newPassword'), null], 'Passwords must match')
})

const ResetPassword = () => {
    const classes = useStyles()
    const { user } = JSON.parse(localStorage.getItem('user'))
    const [authError, setAuthError] = useState('')
    const [open, setOpen] = useState(false)
    const [success, setSuccess] = useState(false)
    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const onSubmit = async data => {
        delete data.confirmNewPassword
        try {
            let res = await resetPassword(user._id, data)
            reset(data)
            setSuccess(true)
        } catch (error) {
            setOpen(true)
            setAuthError('Oops! Somthing went wrong. Please check your credentials and try again.')
        }
    };
    return (
        <>
            <Typography variant='h4' color="textSecondary" className={classes.header}>Reset Password</Typography>
            <FormContainer>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
                    <Controller
                        render={({ field }) => <TextField {...field} className={classes.textField} label="current password" error={errors.currentPassword ? true : false} placeholder='current password' helperText={errors?.currentPassword?.message}
                            InputLabelProps={{ shrink: true, }}
                            variant='outlined' />}
                        name="currentPassword"
                        control={control}
                        defaultValue=""
                    />
                    <Controller
                        render={({ field }) => <TextField {...field} className={classes.textField} error={errors.newPassword ? true : false} variant='outlined' label='new password' placeholder='new password' helperText={errors?.newPassword?.message} InputLabelProps={{
                            shrink: true,
                        }} />}
                        name="newPassword"
                        control={control}
                        defaultValue=""
                    />
                    <Controller
                        render={({ field }) => <TextField {...field} className={classes.textField} error={errors.confirmNewPassword ? true : false} variant='outlined' label='confirm new password' placeholder='confirm new password' helperText={errors?.confirmNewPassword?.message} InputLabelProps={{
                            shrink: true,
                        }} />}
                        name="confirmNewPassword"
                        control={control}
                        defaultValue=""
                    />
                    <Button className={classes.textField} fullWidth type='submit' variant='contained' color='primary'>Submit</Button>
                </form>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <MuiAlert onClose={handleClose} severity="error" elevation={6} variant="filled" >
                        {authError}
                    </MuiAlert>
                </Snackbar>
                <Snackbar open={success} autoHideDuration={6000} onClose={handleClose}>
                    <MuiAlert onClose={() => setSuccess(false)} severity="success" elevation={6} variant="filled" >
                        "Password updated successfully!"
                    </MuiAlert>
                </Snackbar>
            </FormContainer></>
    )
}

export default ResetPassword