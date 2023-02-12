import { Box, IconButton, TextField, Typography } from '@mui/material'
import Button from "@mui/material/Button"
import WizardFormField from "../components/WizardFormField"
import { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import back from "../images/back.png"
import line from "../images/line.png"
import Resume from '../components/Resume'
import { WizardFormData } from '../types'


interface FirstStepProps {
    handleNextStep: () => void;
    formData: WizardFormData;
    updateFormData: (updateData: Partial<WizardFormData>) => void
}


const FirstStep: React.FC<FirstStepProps> = ({ handleNextStep, formData, updateFormData }) => {
    const [formValid, setFormValid] = useState(false);
    const [, setErrors] = useState({
        nameError: false,
        surnameError: false,
        emailError: false,
        imageError: false,
        aboutMeError: false,
        numberError: false,
    })
    // const storedFormData = localStorage.getItem('formData');

    const navigate = useNavigate();

    const handleError = (field: string, error: boolean) => {
        setErrors(prevErrors => ({ ...prevErrors, [field]: error }))
    }


    const handleImageUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.click();

        input.onchange = (event: Event) => {
            if (event.target) {
                const target = event.target as HTMLInputElement;
                if (target.files) {
                    const reader = new FileReader();
                    reader.readAsDataURL(target.files[0]);
                    reader.onload = (e) => {
                        updateFormData({ image: e.target?.result as string });
                    }
                }
            }
        };
    };

    const handleNameValidation = (value: string): boolean => {
        const onlyGeorgian = /^[ა-ჰ]+$/g;
        return value.length >= 2 && new RegExp(onlyGeorgian).test(value);

    }

    const handleEmailValidation = (value: string): boolean => {
        const mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return value.endsWith('@redberry.ge') && new RegExp(mailformat).test(value)
    }

    const handlePhoneValidation = (value: string): boolean => {
        const formatPhoneNumber = (number: any) =>
            Number(number?.replaceAll("+", "").replaceAll(" ", ""));
        const formatedNumber = formatPhoneNumber(value)


        return value.startsWith('+995') && String(formatedNumber).length === 12
    }

    const handleAboutMeChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        updateFormData({ about_me: event.target.value });
    };

    const handleFieldChange = (field: string, value: string) => {
        updateFormData({ [field]: value });
    };

    useEffect(() => {
        const nameValid = handleNameValidation(formData.name);
        const emailValid = handleEmailValidation(formData.email);
        const phoneValid = handlePhoneValidation(formData.phone_number);
        const surnameValid = handleNameValidation(formData.surname);
        const imageValid = formData.image.length > 0;

        setFormValid(nameValid && emailValid && phoneValid && surnameValid && imageValid);
    }, [formData]);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        if (formValid) {
            handleNextStep();
        }
    };

    return (
        <Box display='flex' flexDirection='row' maxWidth='1920px'>
            <Box display='flex' minHeight='100vh' paddingLeft='1.5em' gap="1.5em" bgcolor='#F9F9F9' height="100%" maxWidth="55%" flexDirection='column'>
                <Box display='flex' gap="3em" flexDirection='row' padding='2em'>
                    <IconButton style={{ height: '40px', width: '40px', }} onClick={() => {
                        navigate('/')
                    }}>
                        <img src={back} alt='circle' />
                    </IconButton>
                    <Box display='flex' flexDirection='column'>
                        <Box display='flex' justifyContent='space-between' width='90%'>
                            <Typography sx={{ fontWeight: '700', fontSize: '26px' }}>პირადი ინფო</Typography>
                            <Typography sx={{ position: 'relative', top: '50%', fontSize: '18px' }}>1/3</Typography>
                        </Box>
                        <img src={line} alt="line" style={{ width: '90%', paddingTop: '1em' }} />
                    </Box>
                </Box>
                <Box display='flex' paddingLeft='7.5em' gap="4em">
                    <Box width="40%">
                        <WizardFormField value={formData.name} onChange={(value) => handleFieldChange('name', value)} onError={(error) => handleError('nameError', error)} placeholder='ანზორ' label="სახელი" hint="მინიმუმ 2 ასო,ქართული ასოები" validate={handleNameValidation} />
                    </Box>
                    <Box width="40%">
                        <WizardFormField value={formData.surname} onChange={(value) => handleFieldChange('surname', value)} onError={(error) => handleError('surnameError', error)} placeholder='მუმლაძე' label="გვარი" hint="მინიმუმ 2 ასო,ქართული ასოები" validate={handleNameValidation} />
                    </Box>
                </Box>
                <Box display='flex' gap="1.5em" paddingTop='1em' paddingLeft='7.5em'>
                    <Typography fontWeight='700' fontSize='20px'>პირადი ფოტოს ატვირთვა</Typography>
                    <Button variant="contained" onClick={handleImageUpload} color='secondary' sx={{ width: '107px', fontSize: '16px', fontWeight: '400', bgcolor: '#0E80BF' }}>ატვირთვა</Button>
                </Box>
                <Box display='flex' flexDirection='column' gap='0.4em' paddingTop='1.2em' paddingLeft='7.5em'>
                    <Typography fontWeight='700' fontSize='20px'>ჩემ შესახებ (არასავალდებულო)</Typography>
                    <Box>
                        <TextField
                            value={formData.about_me}
                            onChange={handleAboutMeChange}
                            multiline placeholder="ზოგადი ინფო შენ შესახებ"
                            rows={4}
                            sx={{
                                bgcolor: 'white', width: "87%", border: undefined ? '1px solid #000000' : '1px solid #98E37E', "& .MuiOutlinedInput-root.Mui-focused": {
                                    "& > fieldset": {
                                        borderColor: "black",
                                    }
                                },
                            }} />
                    </Box>
                </Box>
                <Box display='flex' width='89%' paddingTop='1em' paddingLeft='7.5em'>
                    <WizardFormField value={formData.email} onChange={(value) => handleFieldChange('email', value)} onError={(error) => handleError('emailError', error)} placeholder='anzorr666@redberry.ge' label='ელ.ფოსტა' hint='უნდა მთავრდებოდეს @redberry.ge-ით' validate={handleEmailValidation} />
                </Box>
                <Box display='flex' width='89%' paddingTop='1em' paddingLeft='7.5em'>
                    <WizardFormField value={formData.phone_number} onChange={(value) => handleFieldChange('phone_number', value)} onError={(error) => handleError('numberError', error)} placeholder='+995 551 12 34 56' label='მობილურის ნომერი' hint='უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს' validate={handlePhoneValidation} />
                </Box>
                <Box display='flex' justifyContent='flex-end' width='89%' paddingTop='4em'>
                    <Button
                        sx={{ bgcolor: '#6B40E3', width: '151px', height: '48px', borderRadius: '4px', color: 'white', fontSize: '18px' }}
                        onClick={handleSubmit}
                    >
                        შემდეგი
                    </Button>
                </Box>
            </Box>
            <Resume formData={formData}></Resume>

        </Box>
    )
}


export default FirstStep