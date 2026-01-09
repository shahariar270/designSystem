import React, { useContext } from "react";
import StepContext from "./StepContext";

const StepIndicator = () => {
    const { currentStep } = useContext(StepContext);

    const steps = [1, 2, 3];

    return (
        <div style={container}>
            {steps.map((step) => (
                <div key={step} style={item}>
                    <div
                        style={{
                            ...circle,
                            background:
                                step === currentStep
                                    ? "#4f46e5"
                                    : step < currentStep
                                        ? "#16a34a"
                                        : "#e5e7eb",
                            color: step <= currentStep ? "#fff" : "#000",
                        }}
                    >
                        {step}
                    </div>

                    <span style={label}>Step {step}</span>
                </div>
            ))}
        </div>
    );
};

export default StepIndicator;

const container = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "30px",
};

const item = {
    textAlign: "center",
    flex: 1,
};

const circle = {
    width: "35px",
    height: "35px",
    borderRadius: "50%",
    margin: "0 auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
};

const label = {
    marginTop: "8px",
    fontSize: "14px",
};
