import React, { useContext } from 'react'
import StepContext from './StepContext';

export const Step = () => {
    const { currentStep, next, prev } = useContext(StepContext);

    return (
        <div>
            {
                currentStep === 1 &&
                <>
                    <span>hello i am step one</span>
                    <button onClick={next}>next</button>
                </>
            }
            {currentStep === 2 &&
                <>
                    <span>hello i am step two </span>
                    <button onClick={prev}>prev</button>
                    <button onClick={next}>next</button>
                </>
            }
            {currentStep === 3 &&
                <>
                    <span>hello i am step three</span>
                    <button onClick={prev}>prev</button>

                </>
            }
        </div>
    )
}
