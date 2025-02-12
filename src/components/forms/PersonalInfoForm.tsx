import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormContext } from '../../context/FormContext';
import { useStepper } from '../../context/StepperContext';
import { personalInfoSchema, PersonalInfoInputs } from '../../schemas/validation';
import { useEffect } from 'react';

export default function PersonalInfoForm() {
  const { personalInfo, updatePersonalInfo } = useFormContext();
  const { setCanProceed } = useStepper();
  
  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<PersonalInfoInputs>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: personalInfo,
    mode: 'onChange',
  });

  const regime = watch('regime');
  const formData = watch();

  useEffect(() => {
    setCanProceed(isValid);
  }, [isValid, setCanProceed]);

  // Automatically submit form data when it changes
  useEffect(() => {
    if (isValid) {
      const submissionData = {
        ...formData,
        ageConjoint: formData.ageConjoint || undefined
      };
      updatePersonalInfo(submissionData);
    }
  }, [formData, isValid, updatePersonalInfo]);

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in">
      <div className="bg-white shadow-soft rounded-xl p-6 space-y-6">
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Régime matrimonial
            </label>
            <select
              {...register('regime')}
              className={`
                block w-full rounded-lg border-0 px-4 py-3 bg-secondary-50
                text-secondary-900 ring-1 ring-inset focus:ring-2 focus:ring-inset
                ${errors.regime ? 'ring-red-500' : 'ring-secondary-200'}
                ${errors.regime ? 'focus:ring-red-500' : 'focus:ring-primary-500'}
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
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Nombre d'enfants
            </label>
            <input
              type="number"
              {...register('nombreEnfants', { valueAsNumber: true })}
              className={`
                block w-full rounded-lg border-0 px-4 py-3 bg-secondary-50
                text-secondary-900 ring-1 ring-inset focus:ring-2 focus:ring-inset
                ${errors.nombreEnfants 
                  ? 'ring-error-500 focus:ring-error-500' 
                  : 'ring-secondary-200 focus:ring-primary-500'
                }
                transition duration-200
              `}
            />
            {errors.nombreEnfants && (
              <p className="mt-2 text-sm text-error-500">{errors.nombreEnfants.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary-700 mb-2">
              Âge
            </label>
            <input
              type="number"
              {...register('age', { valueAsNumber: true })}
              className={`
                block w-full rounded-lg border-0 px-4 py-3 bg-secondary-50
                text-secondary-900 ring-1 ring-inset focus:ring-2 focus:ring-inset
                ${errors.age 
                  ? 'ring-error-500 focus:ring-error-500' 
                  : 'ring-secondary-200 focus:ring-primary-500'
                }
                transition duration-200
              `}
            />
            {errors.age && (
              <p className="mt-2 text-sm text-error-500">{errors.age.message}</p>
            )}
          </div>

          {(regime === 'marie' || regime === 'pacse') && (
            <div>
              <label className="block text-sm font-medium text-secondary-700 mb-2">
                Âge du conjoint
              </label>
              <input
                type="number"
                {...register('ageConjoint', { valueAsNumber: true })}
                className={`
                  block w-full rounded-lg border-0 px-4 py-3 bg-secondary-50
                  text-secondary-900 ring-1 ring-inset focus:ring-2 focus:ring-inset
                  ${errors.ageConjoint 
                    ? 'ring-error-500 focus:ring-error-500' 
                    : 'ring-secondary-200 focus:ring-primary-500'
                  }
                  transition duration-200
                `}
              />
              {errors.ageConjoint && (
                <p className="mt-2 text-sm text-error-500">{errors.ageConjoint.message}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}