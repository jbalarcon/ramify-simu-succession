import { UseFormRegister, Path } from 'react-hook-form';
import { MonetaryValue } from '../../types/patrimony';

interface AssetInputProps<T extends Record<string, MonetaryValue>> {
  label: string;
  fieldName: keyof T;
  register: UseFormRegister<T>;
  errors: any; // Temporarily use any to get the build working
  showConjoint: boolean;
}

export default function AssetInput<T extends Record<string, MonetaryValue>>({ 
  label, 
  fieldName, 
  register, 
  errors,
  showConjoint 
}: AssetInputProps<T>) {
  // Create properly typed paths for the form fields
  const clientPath = `${String(fieldName)}.montantClient` as Path<T>;
  const conjointPath = `${String(fieldName)}.montantConjoint` as Path<T>;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-secondary-700 mb-2">
          {label} - Client
        </label>
        <input
          type="number"
          className={`mt-1 block w-full rounded-md shadow-sm ${
            errors[String(fieldName)]?.montantClient ? 'border-red-300' : 'border-gray-300'
          }`}
          {...register(clientPath, { 
            valueAsNumber: true,
            required: "Ce champ est requis",
            min: { value: 0, message: "La valeur doit être positive" }
          })}
        />
        {errors[String(fieldName)]?.montantClient && (
          <p className="mt-1 text-sm text-red-600">
            {errors[String(fieldName)]?.montantClient?.message}
          </p>
        )}
      </div>

      {showConjoint && (
        <div>
          <label className="block text-sm font-medium text-secondary-700 mb-2">
            {label} - Conjoint
          </label>
          <input
            type="number"
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors[String(fieldName)]?.montantConjoint ? 'border-red-300' : 'border-gray-300'
            }`}
            {...register(conjointPath, {
              valueAsNumber: true,
              required: "Ce champ est requis",
              min: { value: 0, message: "La valeur doit être positive" }
            })}
          />
          {errors[String(fieldName)]?.montantConjoint && (
            <p className="mt-1 text-sm text-red-600">
              {errors[String(fieldName)]?.montantConjoint?.message}
            </p>
          )}
        </div>
      )}
    </div>
  );
}