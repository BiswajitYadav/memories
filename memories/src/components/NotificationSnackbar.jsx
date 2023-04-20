import { useState, useEffect, useContext } from 'react';
import React from 'react'
import { Alert, Snackbar } from '@mui/material'
import MainContext from '../context/MainContext';

const NotificationSnackbar = () => {

    const context = useContext(MainContext)
    const { notification, setNotification } = context;

    const [nOpen, setNOpen] = useState(false);

    useEffect(() => {
        if (notification?.status === "true") {
            setNOpen(true)
        }
    }, [notification])

    const handleNClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setNOpen(false);
    };

    return (
        <>
            <Snackbar open={nOpen} autoHideDuration={4000} onClose={handleNClose}>
                <Alert onClose={handleNClose} severity={notification?.type} variant="filled" sx={{ width: '100%' }}>
                    {notification?.message}
                </Alert>
            </Snackbar>
        </>
    )
}

export default NotificationSnackbar