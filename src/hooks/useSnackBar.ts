import { SnackBarErrorType } from '@src/types/translation';
import React, { useState } from 'react'


const useSnackBar = () => {
    const [snackbar, setSnackbar] = useState({
        visible: false,
        message: '',
        type: 'error' as SnackBarErrorType,
    });

    const showSnackbar = (message: string, type: SnackBarErrorType = 'error') => {
        setSnackbar({ visible: true, message, type });
    };

    const hideSnackbar = () => {
        setSnackbar(prev => ({ ...prev, visible: false }))
    }

    return { snackbar, showSnackbar, hideSnackbar }
}
export default useSnackBar