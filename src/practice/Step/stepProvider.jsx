

import React, { useState } from 'react'
import StepContext from './StepContext';

export const stepProvider = () => {
    const [currentStep, setStep] = useState(1);

    const next = () => {
        if (currentStep != 3) {
            return setStep(currentStep + 1)
        }
        return setStep(1);
    }
    const prev = () => {
        if (currentStep != 1) {
            return setStep(currentStep - 1)
        }
        return setStep(3);
    }

    return (
        <StepContext.Provider value={{ currentStep, next, prev }}>
            
        </StepContext.Provider>
    )
}
