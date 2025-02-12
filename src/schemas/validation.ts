import { z } from 'zod';

export const personalInfoSchema = z.object({
  regime: z.enum(['marie', 'celibataire', 'pacse']),
  nombreEnfants: z.number().min(0).int(),
  age: z.number().min(18).max(120),
  ageConjoint: z.number().min(18).max(120).optional().nullable(),
});

export const assetSchema = z.object({
  montantClient: z.number().min(0),
  montantConjoint: z.number().min(0),
});

export type PersonalInfoInputs = z.infer<typeof personalInfoSchema>;
export type AssetInputs = z.infer<typeof assetSchema>;

// ... existing schemas ...

export const assetFormSchema = z.object({
    residencePrincipale: z.object({
      montantClient: z.number().min(0),
      montantConjoint: z.number().min(0),
    }),
    residenceSecondaire: z.object({
      montantClient: z.number().min(0),
      montantConjoint: z.number().min(0),
    }),
    immobilierLocatif: z.object({
      montantClient: z.number().min(0),
      montantConjoint: z.number().min(0),
    }),
    depotsAVue: z.object({
      montantClient: z.number().min(0),
      montantConjoint: z.number().min(0),
    }),
    epargneMLT: z.object({
      montantClient: z.number().min(0),
      montantConjoint: z.number().min(0),
    }),
    valeursMobilieres: z.object({
      montantClient: z.number().min(0),
      montantConjoint: z.number().min(0),
    }),
  });
  
  export type AssetFormInputs = z.infer<typeof assetFormSchema>;

  // ... existing schemas ...

export const liabilitiesFormSchema = z.object({
    emprunts: z.object({
      montantClient: z.number().min(0),
      montantConjoint: z.number().min(0),
    }),
    impotsDus: z.object({
      montantClient: z.number().min(0),
      montantConjoint: z.number().min(0),
    }),
    autresDettes: z.object({
      montantClient: z.number().min(0),
      montantConjoint: z.number().min(0),
    }),
    fraisFuneraires: z.object({
      montantClient: z.number().min(0),
      montantConjoint: z.number().min(0),
    }),
  });
  
  export type LiabilitiesFormInputs = z.infer<typeof liabilitiesFormSchema>;