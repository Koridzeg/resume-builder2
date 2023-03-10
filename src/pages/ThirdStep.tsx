import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material";
import line from '../images/line.png'
import back from '../images/back.png'
import React, { useState, useEffect } from "react";
import WizardFormField from "../components/WizardFormField";
import Resume from "../components/Resume";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import smallLine from '../images/smallline.png'
import { WizardFormData } from "../types";
import useSubmit from "../useSubmit";
import { useNavigate } from "react-router-dom";

interface Degree {
    id: number,
    title: string,
}

type ThirdStepProps = {
    handleNextStep: () => void,
    handleBackStep: () => void,
    formData: WizardFormData
    updateFormData: (updateData: Partial<WizardFormData>) => void
}

const ThirdStep: React.FC<ThirdStepProps> = ({ handleBackStep, handleNextStep, formData, updateFormData }) => {
    const [formCount, setFormCount] = useState(1)
    const [degree, setDegree] = useState<Degree[]>([])
    const [formValid, setFormValid] = useState(false)


    const [errors, setErrors] = useState({
        institute: '',
        degreeError: '',
        endingDateError: '',

    })

    const handleError = (field: string, error: boolean) => {
        setErrors(prevErrors => ({ ...prevErrors, [field]: error }))
    }

    const handleEducationValidation = (value: string): boolean => {
        return value.length >= 2
    }


    useEffect(() => {
        fetch('https://resume.redberryinternship.ge/api/degrees')
            .then((response) => response.json())
            .then((data) => setDegree(data))
    }, [])


    const handleAddForm = () => {
        setFormCount(formCount + 1)
        updateFormData({
            educations: [
                ...formData.educations,
                {
                    institute: '',
                    degree_id: 0,
                    due_date: '',
                    description: '',
                }
            ]
        })
    }

    const handleFieldChange = (index: number, field: 'institute' | 'degree_id' | 'due_date' | 'endingDate' | 'description', value: string | number) => {
        const updatedEducations = formData.educations.map((educations, i) => {
            if (i === index) {
                return { ...educations, [field]: value };
            }
            return educations;
        });
        updateFormData({ educations: updatedEducations });
    };

    const handleEndingDateChange = (index: number, newValue: string | null) => {
        const updatedExperiences = formData.educations.map((educations, i) => {
            if (i === index) {
                return { ...educations, due_date: newValue || '' };
            }
            return educations;
        });
        updateFormData({ educations: updatedExperiences });
    };

    const submitData = useSubmit(formData);

    useEffect(() => {
        const educationsValid = formData.educations.every(educations => {
            const { institute, degree_id, due_date, description } = educations;
            return (
                institute.length >= 2 &&
                degree_id > 0 &&
                Object.keys(due_date).length > 0 &&
                description.length > 0
            );
        });

        setFormValid(educationsValid);
    }, [formData]);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (formValid) {
            submitData()
            localStorage.removeItem('formData')
        }
    };

    return (
        <Box display='flex' flexDirection='row' >
            <Box display='flex' paddingLeft='1.5em' gap="1em" bgcolor='#F9F9F9' width="55%" flexDirection='column' minHeight='100vh'>
                <Box display='flex' gap="3em" flexDirection='row' padding='2em'>
                    <IconButton style={{ height: '40px', width: '40px', }} onClick={() => {
                        localStorage.removeItem('formData')
                        window.location.reload()
                    }}>
                        <img src={back} alt='circle' />
                    </IconButton>
                    <Box display='flex' flexDirection='column'>
                        <Box display='flex' justifyContent='space-between' width='90%'>
                            <Typography sx={{ fontWeight: '700', fontSize: '26px' }}>???????????????????????????</Typography>
                            <Typography sx={{ position: 'relative', top: '50%', fontSize: '18px' }}>3/3</Typography>
                        </Box>
                        <img src={line} alt="line" style={{ width: '90%', paddingTop: '1em' }} />
                    </Box>
                </Box>
                {Array.from({ length: formCount }, (_, index) => (
                    <React.Fragment key={index} >
                        <Box display='flex' width='89%' paddingTop='1em' paddingLeft='7.5em'>
                            <WizardFormField onChange={(value) => {
                                handleFieldChange(index, 'institute', value)
                            }} value={formData.educations[index].institute} onError={(error) => handleError('institute', error)} placeholder='????????????????????????????????????' label='????????????????????????????????????' hint='????????????????????? 2 ?????????????????????' validate={handleEducationValidation} />
                        </Box>
                        <Box display='flex' flexDirection='row' gap='4em' paddingTop='1.5em' paddingLeft='7.5em'>
                            <Box display='flex' flexDirection='column' width='40%' gap='1em'>
                                <Typography sx={{ fontSize: '18px', fontWeight: '700' }}>?????????????????????</Typography>
                                <FormControl fullWidth>
                                    <InputLabel id='select-label'></InputLabel>
                                    <Select
                                        labelId="degree-select-label"
                                        sx={{ bgcolor: 'white' }}
                                        id="degree-select"
                                        value={formData.educations[index].degree_id}
                                        onChange={(e) => handleFieldChange(index, 'degree_id', e.target.value)}>
                                        {degree.map((degree) => (
                                            <MenuItem key={degree.id} value={degree.id}>
                                                {degree.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box display='flex' flexDirection='column' width='40%' gap='1em'>
                                <Typography sx={{ fontSize: '18px', fontWeight: '700' }}>????????????????????????????????? ??????????????????</Typography>
                                <DesktopDatePicker value={formData.educations[index].due_date} onChange={(newValue) => {
                                    handleEndingDateChange(index, newValue)
                                }}
                                    renderInput={(params) => <TextField onFocus={e => e.target.blur()} sx={{
                                        bgcolor: 'white', "& .MuiOutlinedInput-root.Mui-focused": {
                                            "& > fieldset": {
                                                borderColor: formData.educations[index].due_date.length < 0 ? '#000000' : '#98E373'
                                            }
                                        },
                                    }} {...params} />}
                                >
                                </DesktopDatePicker>
                            </Box>
                        </Box>
                        <Box display='flex' flexDirection='column' gap='0.4em' paddingTop='1.2em' paddingLeft='7.5em'>
                            <Typography fontWeight='700' fontSize='20px'>??????????????????</Typography>
                            <Box>
                                <TextField value={formData.educations[index].description} onChange={(e) => handleFieldChange(index, 'description', e.target.value)} multiline placeholder="???????????? ??????????????????????????????????????? ?????? ?????????????????? ??????????????????" rows={4} sx={{ bgcolor: 'white', width: "87%",border: formData.educations[index].description.length === 0 ? '1px solid black' : '1px solid #98E373', "& .MuiOutlinedInput-root.Mui-focused": {
                                    "& > fieldset": {
                                        borderColor: "black",
                                    }
                                }, }} />
                            </Box>
                        </Box>
                    </React.Fragment>
                ))}
                <Box display='flex' flexDirection='column' gap='3em' paddingTop='1.2em' paddingLeft='7.5em'>
                    <img src={smallLine} alt="" style={{ width: '87%' }} />
                    <Button onClick={handleAddForm} sx={{ width: '289px', bgcolor: '#62A1EB', color: 'white', height: '50px', borderRadius: '5px', fontSize: '16px' }}>???????????? ???????????????????????????????????? ????????????????????????</Button>
                </Box>
                <Box display='flex' paddingLeft='7.5em' width='88%' flexDirection='row' justifyContent='space-between' paddingTop='10em'>
                    <Button onClick={() => {
                        handleBackStep()
                    }} sx={{ bgcolor: '#6B40E3', width: '113px', height: '48px', borderRadius: '4px', color: 'white', fontSize: '18px', fontWeight: '500' }}>????????????</Button>
                    <Button onClick={handleSubmit} sx={{ bgcolor: '#6B40E3', width: '151px', height: '48px', borderRadius: '4px', color: 'white', fontSize: '18px', fontWeight: '500' }}>?????????????????????</Button>
                </Box>
            </Box>
            <Resume formData={formData}></Resume>
        </Box>
    )
}


export default ThirdStep