import React, { useEffect, useState } from 'react';
import { getUserList, deleteUser, createUser } from '../services'
import { Grid, Paper, Button, TextField, Card, CardActionArea, Snackbar, Typography, CardContent, CardActions, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1

    },
    card: {
        margin: theme.spacing(2),
    }
}))

const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    username: yup.string().required(),
    password: yup.string().required(),
    favColor: yup.string().required(),
    birthYear: yup.number().required()
});

const Home = () => {
    const [userList, setUserList] = useState([])
    const [apiError, setError] = useState('')
    const [open, setOpen] = useState(false)
    const classes = useStyles()
    const { handleSubmit, control, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const getUsers = async () => {
        const users = await getUserList()
        setUserList(users)
    }

    const deleteSingleUser = async (id) => {
        try {
            await deleteUser(id)
            const users = await getUserList()
            setUserList(users)
        } catch (error) {
            setOpen(true)
            setError(error)
        }
    }

    const onSave = async data => {
        try {
            let user = await createUser(data)
            reset(user)
            const users = await getUserList()
            setUserList(users)
        } catch (error) {
            setOpen(true)
            setError('Sorry! Something went wrong. Please check your information and try again')
        }
    };

    useEffect(() => {
        getUsers()
    }, [])


    return (
        <div className={classes.root}>
            <Paper>

                <form onSubmit={handleSubmit(onSave)}>
                    <Controller
                        render={({ field }) => <TextField {...field} variant='outlined' placeholder='first name' helperText={errors?.firstName?.message} />}
                        name="firstName"
                        control={control}
                        defaultValue=''
                    />

                    <Controller
                        render={({ field }) => <TextField {...field} variant='outlined' placeholder='last name' helperText={errors?.lastName?.message} />}
                        name="lastName"
                        control={control}
                        defaultValue=''
                    />
                    <Controller
                        render={({ field }) => <TextField {...field} variant='outlined' placeholder='username' helperText={errors?.username?.message} />}
                        name="username"
                        control={control}
                        defaultValue=''
                    />
                    <Controller
                        render={({ field }) => <TextField {...field} variant='outlined' placeholder='password' helperText={errors?.password?.message} />}
                        name="password"
                        control={control}
                        defaultValue=''
                    />
                    <Controller
                        render={({ field }) => <TextField {...field} variant='outlined' placeholder='email' helperText={errors?.email?.message} />}
                        name="email"
                        control={control}
                        defaultValue=''
                    />
                    <Controller
                        render={({ field }) => <TextField {...field} variant='outlined' placeholder='favColor' helperText={errors?.favColor?.message} />}
                        name="favColor"
                        control={control}
                        defaultValue=''
                    />
                    <Controller
                        render={({ field }) => <TextField {...field} variant='outlined' placeholder='birthYear' helperText={errors?.birthYear?.message} />}
                        name="birthYear"
                        control={control}
                        defaultValue=''
                    />
                    <Button color='secondary' type='submit' variant='contained'>Save</Button>
                </form>
            </Paper>
            <Grid container direction="row"
                justify="space-evenly"
                alignItems="center" >
                {userList.map((value) => (
                    <Grid key={value._id} item xs={4} >
                        <Card className={classes.card}>
                            <Link to={`/${value._id}`} style={{ textDecoration: 'none' }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography variant="h5">
                                            {value.firstName} {value.lastName}
                                        </Typography>
                                        <Typography variant="body1">
                                            {value.email}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Link>
                            <CardActions>
                                <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => deleteSingleUser(value._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        </Card>
                    </Grid>

                ))}
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <MuiAlert onClose={handleClose} severity="error" elevation={6} variant="filled" >
                    {apiError}
                </MuiAlert>
            </Snackbar>
        </div>
    )

}

export default Home