import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormContext } from '../../context/FormContext';
import { useStepper } from '../../context/StepperContext';
import { liabilitiesFormSchema, LiabilitiesFormInputs } from '../../schemas/validation';
import AssetInput from './AssetInput';
import { useEffect } from 'react';

export default function LiabilitiesForm() {
  const { personalInfo, patrimony, updatePatrimony } = useFormContext();
  const { setCanProceed, currentStep, setCurrentStep, canProceed } = useStepper();
  const showConjoint = personalInfo.regime !== 'celibataire';

  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<LiabilitiesFormInputs>({
    resolver: zodResolver(liabilitiesFormSchema),
    defaultValues: {
      emprunts: patrimony.emprunts,
      impotsDus: patrimony.impotsDus,
      autresDettes: patrimony.autresDettes,
      fraisFuneraires: patrimony.fraisFuneraires,
    },
    mode: 'onChange',
  });

  const values = watch();

  useEffect(() => {
    setCanProceed(isValid);
  }, [isValid, setCanProceed]);

  useEffect(() => {
    if (!isValid) return;
    
    const newPatrimonyData = {
      emprunts: {
        montantClient: values.emprunts?.montantClient || 0,
        montantConjoint: values.emprunts?.montantConjoint || 0
      },
      impotsDus: {
        montantClient: values.impotsDus?.montantClient || 0,
        montantConjoint: values.impotsDus?.montantConjoint || 0
      },
      autresDettes: {
        montantClient: values.autresDettes?.montantClient || 0,
        montantConjoint: values.autresDettes?.montantConjoint || 0
      },
      fraisFuneraires: {
        montantClient: values.fraisFuneraires?.montantClient || 0,
        montantConjoint: values.fraisFuneraires?.montantConjoint || 0
      }
    };
    
    const hasChanged = Object.keys(newPatrimonyData).some(key => {
      const newValue = newPatrimonyData[key as keyof typeof newPatrimonyData];
      const oldValue = patrimony[key as keyof typeof patrimony];
      return newValue.montantClient !== oldValue.montantClient || 
             newValue.montantConjoint !== oldValue.montantConjoint;
    });
    
    if (hasChanged) {
      updatePatrimony(newPatrimonyData);
    }
  }, [isValid, values, updatePatrimony, patrimony]);

  const nextStep = () => {
    if (canProceed) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  const liabilityFields = [
    { key: 'emprunts' as const, label: 'Emprunts' },
    { key: 'impotsDus' as const, label: 'Impôts Dus' },
    { key: 'autresDettes' as const, label: 'Autres Dettes' },
    { key: 'fraisFuneraires' as const, label: 'Frais Funéraires' },
  ];

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="bg-background-white shadow-light-soft rounded-large p-6">
        <div className="space-y-6">
          <div className="space-y-4">
            {liabilityFields.map((field) => (
              <AssetInput<LiabilitiesFormInputs>
                key={field.key}
                label={field.label}
                fieldName={field.key}
                register={register}
                errors={errors}
                showConjoint={showConjoint}
              />
            ))}
          </div>

          <div className="bg-primary-200 border-l-4 border-primary rounded-main p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-primary-800" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-primary-800">
                  Les montants saisis seront déduits du patrimoine total.
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-5">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`
                ${currentStep === 0 ? 'invisible' : ''}
                button button-light
              `}
            >
              Précédent
            </button>
            
            <button
              type="button"
              onClick={nextStep}
              disabled={!canProceed}
              className={`
                button
                ${!canProceed && 'opacity-50 cursor-not-allowed'}
              `}
            >
              Suivant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}