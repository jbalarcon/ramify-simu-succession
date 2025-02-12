import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFormContext } from '../../context/FormContext';
import { useStepper } from '../../context/StepperContext';
import { assetFormSchema, AssetFormInputs } from '../../schemas/validation';
import AssetInput from './AssetInput';
import { useEffect } from 'react';
import { MonetaryValue } from '../../types/patrimony';

export default function AssetsForm() {
  const { personalInfo, patrimony, updatePatrimony } = useFormContext();
  const { setCanProceed } = useStepper();
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

  const formData = watch();

  useEffect(() => {
    setCanProceed(isValid);
  }, [isValid, setCanProceed]);

  // Automatically submit form data when it changes
  useEffect(() => {
    if (isValid) {
      updatePatrimony({
        residencePrincipale: {
          montantClient: formData.residencePrincipale?.montantClient || 0,
          montantConjoint: formData.residencePrincipale?.montantConjoint || 0
        },
        residenceSecondaire: {
          montantClient: formData.residenceSecondaire?.montantClient || 0,
          montantConjoint: formData.residenceSecondaire?.montantConjoint || 0
        },
        immobilierLocatif: {
          montantClient: formData.immobilierLocatif?.montantClient || 0,
          montantConjoint: formData.immobilierLocatif?.montantConjoint || 0
        },
        depotsAVue: {
          montantClient: formData.depotsAVue?.montantClient || 0,
          montantConjoint: formData.depotsAVue?.montantConjoint || 0
        },
        epargneMLT: {
          montantClient: formData.epargneMLT?.montantClient || 0,
          montantConjoint: formData.epargneMLT?.montantConjoint || 0
        },
        valeursMobilieres: {
          montantClient: formData.valeursMobilieres?.montantClient || 0,
          montantConjoint: formData.valeursMobilieres?.montantConjoint || 0
        }
      });
    }
  }, [formData, isValid, updatePatrimony]);

  const assetFields = [
    { key: 'residencePrincipale', label: 'Résidence Principale' },
    { key: 'residenceSecondaire', label: 'Résidence Secondaire' },
    { key: 'immobilierLocatif', label: 'Immobilier Locatif' },
    { key: 'depotsAVue', label: 'Dépôts à Vue' },
    { key: 'epargneMLT', label: 'Épargne Moyen/Long Terme' },
    { key: 'valeursMobilieres', label: 'Valeurs Mobilières' },
  ] as const;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
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
      </div>
    </div>
  );
}