import { createContext, useContext, useState, ReactNode } from 'react';
import { Patrimony, PersonalInfo } from '../types/patrimony';

interface FormContextType {
  personalInfo: PersonalInfo;
  patrimony: Patrimony;
  updatePersonalInfo: (info: Partial<PersonalInfo>) => void;
  updatePatrimony: (data: Partial<Patrimony>) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

const defaultPatrimony: Patrimony = {
  residencePrincipale: { montantClient: 0, montantConjoint: 0 },
  residenceSecondaire: { montantClient: 0, montantConjoint: 0 },
  immobilierLocatif: { montantClient: 0, montantConjoint: 0 },
  autresBiensImmobiliers: { montantClient: 0, montantConjoint: 0 },
  droitsDetenusUsuBiensImmobiliers: { montantClient: 0, montantConjoint: 0 },
  depotsAVue: { montantClient: 0, montantConjoint: 0 },
  epargneMLT: { montantClient: 0, montantConjoint: 0 },
  valeursMobilieres: { montantClient: 0, montantConjoint: 0 },
  autresBiens: { montantClient: 0, montantConjoint: 0 },
  meublesMeublants: { montantClient: 0, montantConjoint: 0 },
  droitsDetenusUsuBiensFinanciers: { montantClient: 0, montantConjoint: 0 },
  titreSocietesDutreil: { montantClient: 0, montantConjoint: 0 },
  entrepriseIndividuelleDutreil: { montantClient: 0, montantConjoint: 0 },
  autresBiensPros: { montantClient: 0, montantConjoint: 0 },
  impotsDus: { montantClient: 0, montantConjoint: 0 },
  emprunts: { montantClient: 0, montantConjoint: 0 },
  autresDettes: { montantClient: 0, montantConjoint: 0 },
  fraisFuneraires: { montantClient: 0, montantConjoint: 0 }
};

export function FormProvider({ children }: { children: ReactNode }) {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    regime: 'celibataire',
    nombreEnfants: 0,
    age: 0
  });
  
  const [patrimony, setPatrimony] = useState<Patrimony>(defaultPatrimony);

  const updatePersonalInfo = (info: Partial<PersonalInfo>) => {
    setPersonalInfo(prev => ({ ...prev, ...info }));
  };

  const updatePatrimony = (data: Partial<Patrimony>) => {
    setPatrimony(prev => ({ ...prev, ...data }));
  };

  return (
    <FormContext.Provider value={{
      personalInfo,
      patrimony,
      updatePersonalInfo,
      updatePatrimony
    }}>
      {children}
    </FormContext.Provider>
  );
}

export const useFormContext = () => {
  const context = useContext(FormContext);
  if (context === undefined) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};