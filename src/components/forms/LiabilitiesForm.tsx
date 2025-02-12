import { useForm, UseFormRegister } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormContext } from '../../context/FormContext';
import { useStepper } from '../../context/StepperContext';
import { liabilitiesFormSchema, LiabilitiesFormInputs } from '../../schemas/validation';
import AssetInput from './AssetInput';
import { useEffect } from 'react';

export default function LiabilitiesForm() {
  const { personalInfo, patrimony, updatePatrimony } = useFormContext();
  const { setCanProceed } = useStepper();
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

  const formData = watch();

  useEffect(() => {
    setCanProceed(isValid);
  }, [isValid, setCanProceed]);

  // Automatically submit form data when it changes
  useEffect(() => {
    if (isValid) {
      updatePatrimony({
        emprunts: {
          montantClient: formData.emprunts?.montantClient || 0,
          montantConjoint: formData.emprunts?.montantConjoint || 0
        },
        impotsDus: {
          montantClient: formData.impotsDus?.montantClient || 0,
          montantConjoint: formData.impotsDus?.montantConjoint || 0
        },
        autresDettes: {
          montantClient: formData.autresDettes?.montantClient || 0,
          montantConjoint: formData.autresDettes?.montantConjoint || 0
        },
        fraisFuneraires: {
          montantClient: formData.fraisFuneraires?.montantClient || 0,
          montantConjoint: formData.fraisFuneraires?.montantConjoint || 0
        }
      });
    }
  }, [formData, isValid, updatePatrimony]);

  const liabilityFields = [
    { key: 'emprunts' as const, label: 'Emprunts' },
    { key: 'impotsDus' as const, label: 'Impôts Dus' },
    { key: 'autresDettes' as const, label: 'Autres Dettes' },
    { key: 'fraisFuneraires' as const, label: 'Frais Funéraires' },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {liabilityFields.map((field) => (
          <AssetInput<Record<string, { montantClient: number; montantConjoint: number }>>
            key={field.key}
            label={field.label}
            fieldName={field.key}
            register={register as UseFormRegister<Record<string, { montantClient: number; montantConjoint: number }>>}
            errors={errors}
            showConjoint={showConjoint}
          />
        ))}
      </div>

      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Les montants saisis seront déduits du patrimoine total.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}