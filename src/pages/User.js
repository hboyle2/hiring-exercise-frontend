import React, { useEffect, useState } from 'react'
import { getSingleUser } from '../services'
import { useParams } from 'react-router-dom'
import { Box, Card, Typography, CardActions, Button, IconButton, TextField } from '@material-ui/core'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { Controller } from "react-hook-form";
import { updateUser } from '../services'
const schema = yup.object().shape({
    firstName: yup.string(),
    lastName: yup.string(),
    email: yup.string(),
    favColor: yup.string(),
    birthYear: yup.number()
});

const User = () => {
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
        <Box p={8}>
            {!editUser && <Card>
                <Typography>{singleUser?.firstName} {singleUser?.lastName}</Typography>
                <Typography>{singleUser?.email}</Typography>
                <Typography>{singleUser?.favColor}</Typography>
                <Typography>{singleUser?.birthYear}</Typography>
                <CardActions>
                    <Button variant='contained' color='main' onClick={() => setEditUser(true)}>Edit User</Button>

                </CardActions>
            </Card>}
            {editUser && <Card>
                <form onSubmit={handleSubmit(onSave)}>
                    <Controller
                        render={({ field }) => <TextField {...field} variant='outlined' placeholder='first name' helperText={errors?.firstName?.message} />}
                        name="firstName"
                        control={control}
                        defaultValue={singleUser.firstName}
                    />

                    <Controller
                        render={({ field }) => <TextField {...field} variant='outlined' placeholder='last name' helperText={errors?.lastName?.message} />}
                        name="lastName"
                        control={control}
                        defaultValue={singleUser.lastName}
                    />
                    <Controller
                        render={({ field }) => <TextField {...field} variant='outlined' placeholder='email' helperText={errors?.email?.message} />}
                        name="email"
                        control={control}
                        defaultValue={singleUser.email}
                    />
                    <Controller
                        render={({ field }) => <TextField {...field} variant='outlined' placeholder='favColor' helperText={errors?.favColor?.message} />}
                        name="favColor"
                        control={control}
                        defaultValue={singleUser.favColor}
                    />
                    <Controller
                        render={({ field }) => <TextField {...field} variant='outlined' placeholder='birthYear' helperText={errors?.birthYear?.message} />}
                        name="birthYear"
                        control={control}
                        defaultValue={singleUser.birthYear}
                    />
                    <Button color='secondary' type='submit' variant='contained'>Save</Button>
                </form>
            </Card>}
        </Box>
    )
}

export default User