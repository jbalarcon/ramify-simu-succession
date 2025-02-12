import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormContext } from '../../context/FormContext';
import { useStepper } from '../../context/StepperContext';
import { assetFormSchema, AssetFormInputs } from '../../schemas/validation';
import AssetInput from './AssetInput';
import { useEffect } from 'react';

export default function AssetsForm() {
  const { personalInfo, patrimony, updatePatrimony } = useFormContext();
  const { setCanProceed, currentStep, setCurrentStep, canProceed } = useStepper();
  const showConjoint = personalInfo.regime !== 'celibataire';

  const {
    register,
    watch,
    formState: { errors, isValid },
  } = useForm<AssetFormInputs>({
    resolver: zodResolver(assetFormSchema),
    defaultValues: {
      residencePrincipale: patrimony.residencePrincipale,
      residenceSecondaire: patrimony.residenceSecondaire,
      immobilierLocatif: patrimony.immobilierLocatif,
      depotsAVue: patrimony.depotsAVue,
      epargneMLT: patrimony.epargneMLT,
      valeursMobilieres: patrimony.valeursMobilieres,
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
      residencePrincipale: {
        montantClient: values.residencePrincipale?.montantClient || 0,
        montantConjoint: values.residencePrincipale?.montantConjoint || 0
      },
      residenceSecondaire: {
        montantClient: values.residenceSecondaire?.montantClient || 0,
        montantConjoint: values.residenceSecondaire?.montantConjoint || 0
      },
      immobilierLocatif: {
        montantClient: values.immobilierLocatif?.montantClient || 0,
        montantConjoint: values.immobilierLocatif?.montantConjoint || 0
      },
      depotsAVue: {
        montantClient: values.depotsAVue?.montantClient || 0,
        montantConjoint: values.depotsAVue?.montantConjoint || 0
      },
      epargneMLT: {
        montantClient: values.epargneMLT?.montantClient || 0,
        montantConjoint: values.epargneMLT?.montantConjoint || 0
      },
      valeursMobilieres: {
        montantClient: values.valeursMobilieres?.montantClient || 0,
        montantConjoint: values.valeursMobilieres?.montantConjoint || 0
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

  const assetFields = [
    { key: 'residencePrincipale', label: 'Résidence Principale' },
    { key: 'residenceSecondaire', label: 'Résidence Secondaire' },
    { key: 'immobilierLocatif', label: 'Immobilier Locatif' },
    { key: 'depotsAVue', label: 'Dépôts à Vue' },
    { key: 'epargneMLT', label: 'Épargne Moyen/Long Terme' },
    { key: 'valeursMobilieres', label: 'Valeurs Mobilières' },
  ] as const;

  return (
    <div className="max-w-2xl mx-auto animate-fade-in">
      <div className="bg-background-white shadow-light-soft rounded-large p-6">
        <div className="space-y-6">
          {assetFields.map((field) => (
            <AssetInput<AssetFormInputs>
              key={field.key}
              label={field.label}
              fieldName={field.key}
              register={register}
              errors={errors}
              showConjoint={showConjoint}
            />
          ))}

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