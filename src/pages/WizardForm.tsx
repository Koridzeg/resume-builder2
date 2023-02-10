import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { firstFormDataTypes, secondFormDataTypes, WizardFormData } from '../types'
import FirstStep from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'



const WizardForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();
    const [formData, setFormData] = useState<WizardFormData>({
        name: '',
        surname: '',
        image: null,
        aboutMe: '',
        email: '',
        number: '',
        position: '',
        employer: '',
        startingDate: '',
        endingDate: '',
        description: '',
    });

    const updateFormData = (updatedData: Partial<WizardFormData>) => {
        setFormData({
          ...formData,
          ...updatedData,
        });
      };

    const renderStep = (step: number) => {
        switch (step) {
            case 1:
                return <FirstStep handleNextStep={handleNextStep} updateFormData={updateFormData} formData={formData} />
            case 2:
                return <SecondStep handleNextStep={handleNextStep} handleBackStep={handleBackStep} formData={formData} />
            case 3:
                return <ThirdStep handleBackStep={handleBackStep} handleNextStep={handleNextStep} formData={formData} />
            default:
                return null
        }
    }

    const handleNextStep = (stepData: WizardFormData) => {
        setFormData({
            ...formData,
            ...stepData,
        });

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