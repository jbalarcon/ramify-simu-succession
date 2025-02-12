import { useStepper } from '../../context/StepperContext';
import PersonalInfoForm from '../forms/PersonalInfoForm';
import AssetsForm from '../forms/AssetsForm';
import LiabilitiesForm from '../forms/LiabilitiesForm';
import ResultsView from '../results/ResultsView';

export default function StepContent() {
  const { currentStep, setCurrentStep, canProceed } = useStepper();

  const nextStep = () => {
    if (canProceed) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoForm />;
      case 1:
        return <AssetsForm />;
      case 2:
        return <LiabilitiesForm />;
      case 3:
        return <ResultsView />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {renderStep()}
      
      <div className="flex justify-between pt-5">
        <button
          type="button"
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`${
            currentStep === 0 ? 'invisible' : ''
          } px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50`}
        >
          Précédent
        </button>
        
        {currentStep < 3 && (
          <button
            type="button"
            onClick={nextStep}
            disabled={!canProceed}
            className={`px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm ${
              canProceed
                ? 'hover:bg-indigo-700'
                : 'opacity-50 cursor-not-allowed'
            }`}
          >
            Suivant
          </button>
        )}
      </div>
    </div>
  );
}