import { UseFormRegister, Path } from 'react-hook-form';

interface MonetaryValue {
  montantClient: number;
  montantConjoint: number;
}

interface AssetInputProps<T extends Record<string, MonetaryValue>> {
  label: string;
  fieldName: keyof T;
  register: UseFormRegister<T>;
  errors: any;
  showConjoint: boolean;
}

export default function AssetInput<T extends Record<string, MonetaryValue>>({ 
  label, 
  fieldName, 
  register, 
  errors,
  showConjoint 
}: AssetInputProps<T>) {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  // Create properly typed paths for the form fields
  const clientPath = `${String(fieldName)}.montantClient` as Path<T>;
  const conjointPath = `${String(fieldName)}.montantConjoint` as Path<T>;

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs text-gray-500">Montant Client</label>
          <input
            type="number"
            className={`mt-1 block w-full rounded-md shadow-sm ${
              errors[String(fieldName)]?.montantClient ? 'border-red-300' : 'border-gray-300'
            }`}
            {...register(clientPath, { 
              valueAsNumber: true,
              min: 0 
            })}
          />
          {errors[String(fieldName)]?.montantClient && (
            <p className="mt-1 text-xs text-red-600">
              {errors[String(fieldName)].montantClient.message}
            </p>
          )}
        </div>

        {showConjoint && (
          <div>
            <label className="block text-xs text-gray-500">Montant Conjoint</label>
            <input
              type="number"
              className={`mt-1 block w-full rounded-md shadow-sm ${
                errors[String(fieldName)]?.montantConjoint ? 'border-red-300' : 'border-gray-300'
              }`}
              {...register(conjointPath, { 
                valueAsNumber: true,
                min: 0 
              })}
            />
            {errors[String(fieldName)]?.montantConjoint && (
              <p className="mt-1 text-xs text-red-600">
                {errors[String(fieldName)].montantConjoint.message}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}