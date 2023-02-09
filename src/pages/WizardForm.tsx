import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import  FirstStep  from './FirstStep'
import SecondStep from './SecondStep'
import ThirdStep from './ThirdStep'







const WizardForm: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();

    const renderStep = (step: number) => {
        switch (step) {
            case 1:
                return <FirstStep handleNextStep={handleNextStep} />
            case 2:
                return <SecondStep handleNextStep={handleNextStep} handleBackStep={handleBackStep} />
            case 3:
                return <ThirdStep handleBackStep={handleBackStep} handleNextStep={handleNextStep} />
            default:
                return null
        }
    }

    const handleNextStep = () => {

        if (currentStep === 3) {
            navigate("/")
        } else {
            setCurrentStep(currentStep + 1);
        }
    }

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