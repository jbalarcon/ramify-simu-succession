import { UseFormRegister, Path, FieldErrors } from 'react-hook-form';
import { AssetFormInputs, LiabilitiesFormInputs } from '../../schemas/validation';

type FormType = AssetFormInputs | LiabilitiesFormInputs;

interface AssetInputProps<T extends FormType> {
  label: string;
  fieldName: keyof T;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  showConjoint: boolean;
}

export default function AssetInput<T extends FormType>({ 
  label, 
  fieldName, 
  register, 
  errors,
  showConjoint 
}: AssetInputProps<T>) {
  // Create properly typed paths for the form fields
  const clientPath = `${String(fieldName)}.montantClient` as Path<T>;
  const conjointPath = `${String(fieldName)}.montantConjoint` as Path<T>;

  const fieldErrors = errors[fieldName as string] as { montantClient?: { message: string }, montantConjoint?: { message: string } } | undefined;
  const clientError = fieldErrors?.montantClient?.message;
  const conjointError = fieldErrors?.montantConjoint?.message;

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-text-primary mb-2">
          {label} - Client
        </label>
        <input
          type="number"
          className={`
            block w-full rounded-main px-4 py-3 
            bg-background-white border-0
            text-text-primary ring-1 ring-inset
            focus:ring-2 focus:ring-inset transition-all duration-200
            ${clientError 
              ? 'ring-red-500 focus:ring-red-500' 
              : 'ring-grey-300 focus:ring-primary'
            }
          `}
          {...register(clientPath, { 
            valueAsNumber: true,
            required: "Ce champ est requis",
            min: { value: 0, message: "La valeur doit être positive" }
          })}
        />
        {clientError && (
          <p className="mt-1 text-sm text-red-600">
            {clientError}
          </p>
        )}
      </div>

      {showConjoint && (
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            {label} - Conjoint
          </label>
          <input
            type="number"
            className={`
              block w-full rounded-main px-4 py-3 
              bg-background-white border-0
              text-text-primary ring-1 ring-inset
              focus:ring-2 focus:ring-inset transition-all duration-200
              ${conjointError 
                ? 'ring-red-500 focus:ring-red-500' 
                : 'ring-grey-300 focus:ring-primary'
              }
            `}
            {...register(conjointPath, {
              valueAsNumber: true,
              required: "Ce champ est requis",
              min: { value: 0, message: "La valeur doit être positive" }
            })}
          />
          {conjointError && (
            <p className="mt-1 text-sm text-red-600">
              {conjointError}
            </p>
          )}
        </div>
      )}
    </div>
  );
}