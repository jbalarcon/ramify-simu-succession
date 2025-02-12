import { useStepper } from '../../context/StepperContext';
import PersonalInfoForm from '../forms/PersonalInfoForm';
import AssetsForm from '../forms/AssetsForm';
import LiabilitiesForm from '../forms/LiabilitiesForm';
import ResultsView from '../results/ResultsView';

export default function StepContent() {
  const { currentStep } = useStepper();

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
    <div>
      {renderStep()}
    </div>
  );
}