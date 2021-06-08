import React, { useEffect, useState } from 'react';
import { getUserList, deleteUser, createUser } from '../services'
import { Grid, Modal, Button, TextField, Card, CardActionArea, Snackbar, Typography, CardContent, CardActions, IconButton } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Controller } from "react-hook-form";
import FormContainer from '../components/FormContainer'
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1

    },
    card: {
        margin: theme.spacing(2),

    },
    header: {
        textAlign: 'center',

    },
    textField: {
        margin: theme.spacing(2),
    },
    form: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
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
    const [openModal, setOpenModal] = useState(false)
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
            setOpenModal(false)
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
            <Button variant='contained' onClick={() => setOpenModal(true)}>
                Create User
          </Button>

            <Modal open={openModal} onClose={() => setOpenModal(false)}>

                <FormContainer>
                    <>
                        <Typography variant='h4' color="textSecondary" className={classes.header}> Create user</Typography>
                        <form onSubmit={handleSubmit(onSave)} className={classes.form}>

                            <Controller
                                render={({ field: { onChange, value } }) => <TextField value={value} onChange={onChange} variant='outlined' className={classes.textField} placeholder='first name' helperText={errors?.firstName?.message} label='first name' InputLabelProps={{ shrink: true, }} />}
                                name="firstName"
                                control={control}
                                defaultValue=''
                            />

                            <Controller
                                render={({ field: { onChange, value } }) => <TextField value={value} onChange={onChange} variant='outlined' className={classes.textField} placeholder='last name' helperText={errors?.lastName?.message} label='last name' InputLabelProps={{ shrink: true, }} />}
                                name="lastName"
                                control={control}
                                defaultValue=''
                            />
                            <Controller
                                render={({ field: { onChange, value } }) => <TextField value={value} onChange={onChange} variant='outlined' className={classes.textField} placeholder='username' helperText={errors?.username?.message} label='username' InputLabelProps={{ shrink: true, }} />}
                                name="username"
                                control={control}
                                defaultValue=''
                            />
                            <Controller
                                render={({ field: { onChange, value } }) => <TextField value={value} onChange={onChange} variant='outlined' className={classes.textField} placeholder='password' helperText={errors?.password?.message} label='password' InputLabelProps={{ shrink: true, }} />}
                                name="password"
                                control={control}
                                defaultValue=''
                            />
                            <Controller
                                render={({ field: { onChange, value } }) => <TextField value={value} onChange={onChange} variant='outlined' className={classes.textField} placeholder='email' helperText={errors?.email?.message} label='email' InputLabelProps={{ shrink: true, }} />}
                                name="email"
                                control={control}
                                defaultValue=''
                            />
                            <Controller
                                render={({ field: { onChange, value } }) => <TextField value={value} onChange={onChange} variant='outlined' className={classes.textField} placeholder='favColor' helperText={errors?.favColor?.message} label='favorite color' InputLabelProps={{ shrink: true, }} />}
                                name="favColor"
                                control={control}
                                defaultValue=''
                            />
                            <Controller
                                render={({ field: { onChange, value } }) => <TextField value={value} onChange={onChange} variant='outlined' className={classes.textField} placeholder='birthYear' helperText={errors?.birthYear?.message} label='birth year' InputLabelProps={{ shrink: true, }} />}
                                name="birthYear"
                                control={control}
                                defaultValue=''
                            />
                            <Button fullWidth color='secondary' type='submit' variant='contained'>Save</Button>
                        </form>
                    </>
                </FormContainer>
            </Modal>

            <Grid container direction="row"
                justify="space-evenly"
                alignItems="center" >
                {userList.map((value) => (
                    <Grid key={value._id} item xs={4} >
                        <Card className={classes.card}>
                            <Link to={`/${value._id}`} style={{ textDecoration: 'none' }}>
                                <CardActionArea>
                                    <CardContent>
                                        <Typography variant="h5" color='textPrimary'>
                                            {value.firstName} {value.lastName}
                                        </Typography>
                                        <Typography variant="body1" color='textSecondary'>
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