import { Box, IconButton, TextField, Typography } from '@mui/material'
import Button from "@mui/material/Button"
import WizardFormField from "../components/WizardFormField"
import { useState, useEffect } from 'react'
import { useNavigate } from "react-router-dom"
import back from "../images/back.png"
import line from "../images/line.png"
import Resume from '../components/Resume'


type formDataTypes = {
    name: string,
    surname: string,
    image: FileList | null,
    aboutMe: string,
    email: string,
    number: string,
}


const FirstStep: React.FC<{ handleNextStep: () => void }> = ({ handleNextStep }) => {
    const [errors, setErrors] = useState({
        nameError: false,
        surnameError: false,
        emailError: false,
        imageError: false,
        aboutMeError: false,
        numberError: false,
    })
    const [formData, setFormData] = useState<formDataTypes>({
        name: '',
        surname: '',
        image: null,
        aboutMe: '',
        email: '',
        number: '',

    })

    console.log(formData)

    const navigate = useNavigate();

    const handleError = (field: string, error: boolean) => {
        setErrors(prevErrors => ({ ...prevErrors, [field]: error }))
    }


    const handleFileUpload = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const input = document.createElement('input');
        input.type = 'file';
        input.click();

        input.onchange = (event: Event) => {
            if (event.target) {
                const target = event.target as HTMLInputElement;
                if (target.files) {
                    setFormData(prevFormData => ({ ...prevFormData, image: target.files }))
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
        setFormData(prevFormData => ({ ...prevFormData, aboutMe: event.target.value }));
    };

    const handleFieldChange = (field: string, value: string) => {
        setFormData({
            ...formData,
            [field]: value
        })
    }


    return (
        <Box display='flex' height='100vh' width='100%' flexDirection='row' >
            <Box display='flex' paddingLeft='1.5em' gap="1.5em" bgcolor='#F9F9F9' height="100%" width="55%" flexDirection='column'>
                <Box display='flex' gap="3em" flexDirection='row' padding='2em'>
                    <IconButton style={{ height: '40px', width: '40px', }} onClick={() => {
                        navigate('/')
                    }}>
                        <img src={back} alt='circle' />
                    </IconButton>
                    <Box display='flex' flexDirection='column'>
                        <Typography sx={{ fontWeight: '700', fontSize: '24px' }}>პირადი ინფო</Typography>
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
                    <Button variant="contained" onClick={handleFileUpload} color='secondary' sx={{ width: '107px', fontSize: '16px', fontWeight: '400', bgcolor: '#0E80BF' }}>ატვირთვა</Button>
                </Box>
                <Box display='flex' flexDirection='column' gap='0.4em' paddingTop='1.2em' paddingLeft='7.5em'>
                    <Typography fontWeight='700' fontSize='20px'>ჩემ შესახებ (არასავალდებულო)</Typography>
                    <Box>
                        <TextField value={formData.aboutMe} onChange={handleAboutMeChange} multiline placeholder="ზოგადი ინფო შენ შესახებ" rows={4} sx={{ bgcolor: 'white', width: "87%" }} />
                    </Box>
                </Box>
                <Box display='flex' width='89%' paddingTop='1em' paddingLeft='7.5em'>
                    <WizardFormField value={formData.email} onChange={(value) => handleFieldChange('email', value)} onError={(error) => handleError('emailError', error)} placeholder='anzorr666@redberry.ge' label='ელ.ფოსტა' hint='უნდა მთავრდებოდეს @redberry.ge-ით' validate={handleEmailValidation} />
                </Box>
                <Box display='flex' width='89%' paddingTop='1em' paddingLeft='7.5em'>
                    <WizardFormField value={formData.number} onChange={(value) => handleFieldChange('number', value)} onError={(error) => handleError('numberError', error)} placeholder='+995 551 12 34 56' label='მობილურის ნომერი' hint='უნდა აკმაყოფილებდეს ქართული მობილურის ნომრის ფორმატს' validate={handlePhoneValidation} />
                </Box>
                <Box display='flex' justifyContent='flex-end' width='89%' paddingTop='4em'>
                    <Button
                        sx={{ bgcolor: '#6B40E3', width: '151px', height: '48px', borderRadius: '4px', color: 'white', fontSize: '18px' }}
                        onClick={() => {
                            const allErrorsAreFalse = Object.values(errors).every(error => error === false);
                            if (allErrorsAreFalse) {
                                handleNextStep();
                            }
                        }}
                    >
                        შემდეგი
                    </Button>
                </Box>
            </Box>

            <Resume></Resume>


        </Box>
    )
}


export default FirstStep