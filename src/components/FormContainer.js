import React from 'react'
import { Box, Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(6),
        maxWidth: 500
    },
}))

const FormContainer = ({ children }) => {
    const classes = useStyles()
    return (
        <div>
            <Box display='flex' justifyContent='center' alignItems='center' pt={4}>
                <Paper className={classes.paper}>
                    {children}
                </Paper>
            </Box>
        </div>
    )
}

export default FormContainer