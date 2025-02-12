import { useStepper } from '../../context/StepperContext';

const steps = [
  { id: 0, name: 'Information Personnelle' },
  { id: 1, name: 'Actifs' },
  { id: 2, name: 'Passifs' },
  { id: 3, name: 'Résultats' },
];

export default function Stepper() {
  const { currentStep } = useStepper();

  return (
    <nav aria-label="Progress" className="mb-12 px-4 sm:px-6 lg:px-8">
      <ol className="flex items-center justify-center">
        {steps.map((step, stepIdx) => (
          <li 
            key={step.name} 
            className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''}`}
          >
            <div className="group flex items-center">
              <div
                className={`
                  ${stepIdx <= currentStep 
                    ? 'bg-primary ring-2 ring-primary ring-offset-2' 
                    : 'bg-grey-200 ring-2 ring-grey-300'
                  } h-10 w-10 rounded-main flex items-center justify-center transition-all duration-200 ease-in-out
                `}
              >
                <span
                  className={`
                    ${stepIdx <= currentStep ? 'text-text-alternate' : 'text-text-secondary'} 
                    text-sm font-semibold transition-colors duration-200
                  `}
                >
                  {step.id + 1}
                </span>
              </div>
              {stepIdx !== steps.length - 1 && (
                <div 
                  className={`
                    hidden sm:block absolute top-5 left-10 h-0.5 w-[calc(100%-2.5rem)]
                    ${stepIdx < currentStep ? 'bg-primary' : 'bg-grey-200'}
                    transition-colors duration-200
                  `} 
                />
              )}
            </div>
            <div className="mt-3">
              <span 
                className={`
                  text-sm font-medium
                  ${stepIdx <= currentStep ? 'text-primary-700' : 'text-text-secondary'}
                  transition-colors duration-200
                `}
              >
                {step.name}
              </span>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}