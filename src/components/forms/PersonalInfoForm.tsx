import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormContext } from '../../context/FormContext';
import { useStepper } from '../../context/StepperContext';
import { personalInfoSchema, PersonalInfoInputs } from '../../schemas/validation';
import { useEffect } from 'react';

export default function PersonalInfoForm() {
  const { personalInfo, updatePersonalInfo } = useFormContext();
  const { setCanProceed, currentStep, setCurrentStep, canProceed } = useStepper();
  
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<PersonalInfoInputs>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo,
    mode: 'onChange',
  });

  const values = watch();
  const regime = values.regime;

  useEffect(() => {
    setCanProceed(isValid);
  }, [isValid, setCanProceed]);

  useEffect(() => {
    if (!isValid) return;
    
    const newPersonalInfo = {
      regime: values.regime,
      age: values.age || 0,
      nombreEnfants: values.nombreEnfants || 0,
      ageConjoint: values.ageConjoint || undefined
    };
    
    const hasChanged = 
      newPersonalInfo.regime !== personalInfo.regime ||
      newPersonalInfo.age !== personalInfo.age ||
      newPersonalInfo.nombreEnfants !== personalInfo.nombreEnfants ||
      newPersonalInfo.ageConjoint !== personalInfo.ageConjoint;
    
    if (hasChanged) {
      updatePersonalInfo(newPersonalInfo);
    }
  }, [isValid, values, updatePersonalInfo, personalInfo]);

  const nextStep = () => {
    if (canProceed) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(Math.max(0, currentStep - 1));
  };

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="bg-background-white shadow-light-soft rounded-large p-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Régime matrimonial
            </label>
            <select
              {...register('regime')}
              className={`
                block w-full rounded-main px-4 py-3 
                bg-background-white border-0
                text-text-primary ring-1 ring-inset
                focus:ring-2 focus:ring-inset transition-all duration-200
                ${errors.regime 
                  ? 'ring-red-500 focus:ring-red-500' 
                  : 'ring-grey-300 focus:ring-primary'
                }
              `}
            >
              <option value="celibataire">Célibataire</option>
              <option value="marie">Marié(e)</option>
              <option value="pacse">Pacsé(e)</option>
            </select>
            {errors.regime && (
              <p className="mt-2 text-sm text-red-600">{errors.regime.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Nombre d&apos;enfants
            </label>
            <input
              type="number"
              {...register('nombreEnfants', { valueAsNumber: true })}
              className={`
                block w-full rounded-main px-4 py-3 
                bg-background-white border-0
                text-text-primary ring-1 ring-inset
                focus:ring-2 focus:ring-inset transition-all duration-200
                ${errors.nombreEnfants 
                  ? 'ring-red-500 focus:ring-red-500' 
                  : 'ring-grey-300 focus:ring-primary'
                }
              `}
            />
            {errors.nombreEnfants && (
              <p className="mt-2 text-sm text-red-600">{errors.nombreEnfants.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Âge
            </label>
            <input
              type="number"
              {...register('age', { valueAsNumber: true })}
              className={`
                block w-full rounded-main px-4 py-3 
                bg-background-white border-0
                text-text-primary ring-1 ring-inset
                focus:ring-2 focus:ring-inset transition-all duration-200
                ${errors.age 
                  ? 'ring-red-500 focus:ring-red-500' 
                  : 'ring-grey-300 focus:ring-primary'
                }
              `}
            />
            {errors.age && (
              <p className="mt-2 text-sm text-red-600">{errors.age.message}</p>
            )}
          </div>

          {(regime === 'marie' || regime === 'pacse') && (
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Âge du conjoint
              </label>
              <input
                type="number"
                {...register('ageConjoint', { valueAsNumber: true })}
                className={`
                  block w-full rounded-main px-4 py-3 
                  bg-background-white border-0
                  text-text-primary ring-1 ring-inset
                  focus:ring-2 focus:ring-inset transition-all duration-200
                  ${errors.ageConjoint 
                    ? 'ring-red-500 focus:ring-red-500' 
                    : 'ring-grey-300 focus:ring-primary'
                  }
                `}
              />
              {errors.ageConjoint && (
                <p className="mt-2 text-sm text-red-600">{errors.ageConjoint.message}</p>
              )}
            </div>
          )}

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