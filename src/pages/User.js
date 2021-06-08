import React, { useEffect, useState } from 'react'
import { getSingleUser } from '../services'
import { useParams } from 'react-router-dom'
import { Box, Card, Typography, CardActions, Button, IconButton, TextField } from '@material-ui/core'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Controller } from "react-hook-form";
import { updateUser } from '../services'
import FormContainer from '../components/FormContainer'
import { makeStyles } from '@material-ui/core/styles';

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
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string(),
    favColor: yup.string(),
    birthYear: yup.number()
});

const User = () => {
    const classes = useStyles()
    let { id } = useParams()
    const [singleUser, setSingleUser] = useState(null)
    const [editUser, setEditUser] = useState(false)
    const { handleSubmit, control, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSave = async data => {
        try {
            await updateUser(singleUser._id, data)
            setEditUser(false)
        } catch (error) {
            console.log(error)
        }
    };

    const getUser = async () => {
        const user = await getSingleUser(id)
        setSingleUser(user)
    }

    useEffect(() => {
        getUser()
    }, [editUser])
    return (
        <Box >
            {!editUser &&
                <>
                    <Typography variant='h4' color="textSecondary" className={classes.header}>User</Typography>
                    <FormContainer>
                        <Typography>{singleUser?.firstName} {singleUser?.lastName}</Typography>
                        <Typography>{singleUser?.email}</Typography>
                        <Typography>{singleUser?.favColor}</Typography>
                        <Typography>{singleUser?.birthYear}</Typography>
                        <CardActions>
                            <Button fullWidth variant='contained' color='primary' onClick={() => setEditUser(true)}>Edit User</Button>

                        </CardActions>
                    </FormContainer></>}
            {
                editUser &&
                <>
                    <Typography variant='h4' color="textSecondary" className={classes.header}>Edit User</Typography>
                    <FormContainer>
                        <form onSubmit={handleSubmit(onSave)} className={classes.form}>
                            <Controller
                                render={({ field }) => <TextField {...field} className={classes.textField} variant='outlined' placeholder='first name' helperText={errors?.firstName?.message} label='first name' InputLabelProps={{ shrink: true, }} />}
                                name="firstName"
                                control={control}
                                defaultValue={singleUser.firstName}
                            />

                            <Controller
                                render={({ field }) => <TextField {...field} className={classes.textField} variant='outlined' placeholder='last name' helperText={errors?.lastName?.message} label='last name' InputLabelProps={{ shrink: true, }} />}
                                name="lastName"
                                control={control}
                                defaultValue={singleUser.lastName}
                            />
                            <Controller
                                render={({ field }) => <TextField {...field} className={classes.textField} variant='outlined' placeholder='email' helperText={errors?.email?.message} label='email' InputLabelProps={{ shrink: true, }} />}
                                name="email"
                                control={control}
                                defaultValue={singleUser.email}
                            />
                            <Controller
                                render={({ field }) => <TextField {...field} className={classes.textField} variant='outlined' placeholder='favColor' helperText={errors?.favColor?.message} label='favorite color' InputLabelProps={{ shrink: true, }} />}
                                name="favColor"
                                control={control}
                                defaultValue={singleUser.favColor}
                            />
                            <Controller
                                render={({ field }) => <TextField {...field} className={classes.textField} variant='outlined' placeholder='birthYear' helperText={errors?.birthYear?.message} label='birth year' InputLabelProps={{ shrink: true, }} />}
                                name="birthYear"
                                control={control}
                                defaultValue={singleUser.birthYear}
                            />
                            <Button fullWidth color='secondary' type='submit' variant='contained'>Save</Button>
                        </form>
                    </FormContainer>
                </>
            }
        </Box >
    )
}

export default User