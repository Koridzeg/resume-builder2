import { Box, Button, FormControl, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
import line from '../images/line.png'
import back from '../images/back.png'
import React, { useState, useEffect } from "react";
import WizardFormField from "../components/WizardFormField";
import Resume from "../components/Resume";
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker'
import smallLine from '../images/smallline.png'
import { WizardFormData } from "../types";

interface Degree {
    id: string,
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
    const [selectedDegree, setSelectedDegree] = useState<number | null>(null)
    const [degree, setDegree] = useState<Degree[]>([])

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



    const handleChange = (event: SelectChangeEvent<number>) => {
        const value = event.target.value as number;
        setSelectedDegree(value)
    };

    const handleAddForm = () => {
        setFormCount(formCount + 1)
        updateFormData({
            educations: [
                ...formData.educations,
                {
                    institute: '',
                    degree_id: '',
                    due_date: '',
                    description: '',
                }
            ]
        })
    }

    const handleFieldChange = (index: number, field: 'institute' | 'degree' | 'due_date' | 'endingDate' | 'description', value: string) => {
        const updatedExperiences = formData.experiences.map((experience, i) => {
            if (i === index) {
                return { ...experience, [field]: value };
            }
            return experience;
        });
        updateFormData({ experiences: updatedExperiences });
    };

    const handleEndingDateChange = (index: number, newValue: string | null) => {
        const updatedExperiences = formData.experiences.map((experience, i) => {
            if (i === index) {
                return { ...experience, endingDate: newValue || '' };
            }
            return experience;
        });
        updateFormData({ experiences: updatedExperiences });
    };


    return (
        <Box display='flex' width='100%' flexDirection='row' >
            <Box display='flex' paddingLeft='1.5em' gap="1em" bgcolor='#F9F9F9' width="55%" flexDirection='column' minHeight='100vh'>
                <Box display='flex' gap="3em" flexDirection='row' padding='2em'>
                    <IconButton style={{ height: '40px', width: '40px', }} onClick={() => {
                        handleBackStep()
                    }}>
                        <img src={back} alt='circle' />
                    </IconButton>
                    <Box display='flex' flexDirection='column'>
                        <Typography sx={{ fontWeight: '700', fontSize: '24px' }}>განათლება</Typography>
                        <img src={line} alt="line" style={{ width: '90%', paddingTop: '1em' }} />
                    </Box>
                </Box>
                {Array.from({ length: formCount }, (_, index) => (
                    <React.Fragment key={index} >
                        <Box display='flex' width='89%' paddingTop='1em' paddingLeft='7.5em'>
                            <WizardFormField onChange={(value) => {
                                handleFieldChange(index, 'institute', value)
                            }} value={formData.educations[index].institute} onError={(error) => handleError('institute', error)} placeholder='სასწავლებელი' label='სასწავლებელი' hint='მინიმუმ 2 სიმბოლო' validate={handleEducationValidation} />
                        </Box>
                        <Box display='flex' flexDirection='row' gap='4em' paddingTop='1.5em' paddingLeft='7.5em'>
                            <Box display='flex' flexDirection='column' width='40%' gap='1em'>
                                <Typography sx={{ fontSize: '18px', fontWeight: '700' }}>ხარისხი</Typography>
                                <FormControl fullWidth>
                                    <InputLabel id='select-label'></InputLabel>
                                    <Select
                                        labelId="degree-select-label"
                                        sx={{ bgcolor: 'white' }}
                                        id="degree-select"

                                        value={selectedDegree || ""}
                                        onChange={handleChange}>
                                        {degree.map((degree) => (
                                            <MenuItem key={degree.id} value={degree.id}>
                                                {degree.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box display='flex' flexDirection='column' width='40%' gap='1em'>
                                <Typography sx={{ fontSize: '18px', fontWeight: '700' }}>დამთავრების რიცხვი</Typography>
                                <DesktopDatePicker value={formData.educations[index].due_date} onChange={(newValue) => {
                                    handleEndingDateChange(index, newValue)
                                }}
                                    renderInput={(params) => <TextField sx={{ bgcolor: 'white' }} {...params} />}
                                >
                                </DesktopDatePicker>
                            </Box>
                        </Box>
                        <Box display='flex' flexDirection='column' gap='0.4em' paddingTop='1.2em' paddingLeft='7.5em'>
                            <Typography fontWeight='700' fontSize='20px'>აღწერა</Typography>
                            <Box>
                                <TextField value={formData.educations[index].description} onChange={(e) => handleFieldChange(index, 'description', e.target.value)} multiline placeholder="როლი თანამდებობაზე და ზოგადი აღწერა" rows={4} sx={{ bgcolor: 'white', width: "87%" }} />
                            </Box>
                        </Box>
                    </React.Fragment>
                ))}
                <Box display='flex' flexDirection='column' gap='3em' paddingTop='1.2em' paddingLeft='7.5em'>
                    <img src={smallLine} alt="" style={{ width: '87%' }} />
                    <Button onClick={handleAddForm} sx={{ width: '289px', bgcolor: '#62A1EB', color: 'white', height: '50px', borderRadius: '5px', fontSize: '16px' }}>მეტი გამოცდილების დამატება</Button>
                </Box>
                <Box display='flex' paddingLeft='7.5em' width='88%' flexDirection='row' justifyContent='space-between' paddingTop='10em'>
                    <Button sx={{ bgcolor: '#6B40E3', width: '113px', height: '48px', borderRadius: '4px', color: 'white', fontSize: '18px', fontWeight: '500' }}>უკან</Button>
                    <Button onClick={() => {
                        handleNextStep();
                    }} sx={{ bgcolor: '#6B40E3', width: '151px', height: '48px', borderRadius: '4px', color: 'white', fontSize: '18px', fontWeight: '500' }}>შემდეგი</Button>
                </Box>
            </Box>
            <Resume formData={formData}></Resume>
        </Box>
    )
}


export default ThirdStep