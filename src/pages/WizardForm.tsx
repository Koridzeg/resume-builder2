import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {   WizardFormData } from '../types'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'



const WizardForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<WizardFormData>(() => {
        const storedData = localStorage.getItem('formData');
        return storedData ? JSON.parse(storedData) : {
            name: '',
            surname: '',
            image: null,
            aboutMe: '',
            email: '',
            number: '',
            experiences: [{
                position: '',
                employer: '',
                start_date: '',
                due_date: '',
                description: '',
            }],
            educations:[{
                institute: '',
                degree: [],
                due_date: '',
                eduDescription: '',
            }]
        };
    });

    const updateFormData = (updatedData: Partial<WizardFormData>) => {
        setFormData({
          ...formData,
          ...updatedData,
        });
      };

    useEffect(() => {
        localStorage.setItem('formData', JSON.stringify(formData));
    }, [formData]);


    const renderStep = (step: number) => {
        switch (step) {
            case 1:
                return <FirstStep handleNextStep={handleNextStep} updateFormData={updateFormData} formData={formData} />
            case 2:
                return <SecondStep handleNextStep={handleNextStep} updateFormData={updateFormData} handleBackStep={handleBackStep} formData={formData} />
            case 3:
                return <ThirdStep handleBackStep={handleBackStep} updateFormData={updateFormData} handleNextStep={handleNextStep} formData={formData} />
            default:
                return null
        }
    }

    const handleNextStep = () => {
        if (currentStep === 3) {
            navigate("/");
        } else {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBackStep = () => {
        setCurrentStep(currentStep - 1)
    }

    return (
        <div>
            {renderStep(currentStep)}
        </div>
    )
}

export default WizardForm