import { createContext, useContext, useState, ReactNode } from 'react';

interface StepperContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  canProceed: boolean;
  setCanProceed: (can: boolean) => void;
}

const StepperContext = createContext<StepperContextType | undefined>(undefined);

export function StepperProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [canProceed, setCanProceed] = useState(false);

  return (
    <StepperContext.Provider value={{
      currentStep,
      setCurrentStep,
      canProceed,
      setCanProceed,
    }}>
      {children}
    </StepperContext.Provider>
  );
}

export const useStepper = () => {
  const context = useContext(StepperContext);
  if (!context) {
    throw new Error('useStepper must be used within StepperProvider');
  }
  return context;
};