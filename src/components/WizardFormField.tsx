import { Box, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import errorImage from '../images/error.png'
import successImage from '../images/success.png'

type TextFieldProps = {
    label: string,
    hint: string,
    placeholder: string,
    value: string,
    validate: (value: string) => boolean,
    onError: (error: boolean) => void,
    onChange: (value: string) => void,
}

const WizardFormField = ({ label, hint, placeholder, validate, onError, value, onChange }: TextFieldProps) => {
    const [fieldValue, setFieldValue] = useState(value)
    const [error, setError] = useState<undefined | boolean>(undefined)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setFieldValue(newValue)
        if (newValue.length < 0) {
            setError(undefined)
        } else {
            setError(!validate(newValue))
            onError(!validate(newValue))
        }
        onChange(newValue)
    }

    return (
        <Box
            display='flex'
            flexDirection='column'
            gap='0.3rem'
            width="100%"

        >
            <Typography fontSize='18px' sx={{ color: error ? '#E52F2F' : '#000000' }} fontWeight='700'>{label}</Typography>
            <Box display='flex' flexDirection='row' width='100%'>
                <TextField
                    placeholder={placeholder}
                    sx={{
                        bgcolor: 'white',
                        border: error === undefined ? '1px solid #000000' : error ? '1px solid #EF5050' : '1px solid #98E37E',
                        borderRadius: '5px',
                        width: '100%',
                        "& .MuiOutlinedInput-root.Mui-focused": {
                            "& > fieldset": {
                                borderColor: "black",
                            }
                        },

                    }}
                    type='text'
                    value={value}
                    onChange={handleChange} />
                {error === undefined ? null : (
                    error ? (
                        <img src={errorImage} alt="error" style={{ width: '20px', height: '20px', position: 'relative', left: '10px', top: '17px' }} />
                    ) : (
                        <img src={successImage} alt="different icon" style={{ width: '20px', height: '20px', position: 'relative', right: '35px', top: '17px' }} />
                    )
                )}
            </Box>
            <Typography fontSize='14px' color='#2E2E2E' fontWeight='100'>{hint}</Typography>
        </Box>
    )
}
export default WizardFormField