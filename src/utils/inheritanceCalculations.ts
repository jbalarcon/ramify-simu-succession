import { Patrimony, PersonalInfo } from '../types/patrimony';

export interface InheritanceResults {
  totalPatrimoine: number;
  partConjoint: number;
  partEnfants: number;
  partParEnfant: number;
  droitsSuccession: number;
  patrimoineNet: number;
  repartition: {
    label: string;
    amount: number;
    percentage: number;
  }[];
}

export function calculateInheritance(patrimony: Patrimony, personalInfo: PersonalInfo): InheritanceResults {
  // Calculate total assets
  const totalAssets = Object.entries(patrimony).reduce((sum, [key, value]) => {
    if (!key.includes('impots') && !key.includes('emprunts') && !key.includes('dettes') && !key.includes('frais')) {
      return sum + value.montantClient + value.montantConjoint;
    }
    return sum;
  }, 0);

  // Calculate total liabilities
  const totalLiabilities = 
    patrimony.impotsDus.montantClient + patrimony.impotsDus.montantConjoint +
    patrimony.emprunts.montantClient + patrimony.emprunts.montantConjoint +
    patrimony.autresDettes.montantClient + patrimony.autresDettes.montantConjoint +
    patrimony.fraisFuneraires.montantClient + patrimony.fraisFuneraires.montantConjoint;

  const totalPatrimoine = totalAssets - totalLiabilities;

  // Calculate parts based on regime
  let partConjoint = 0;
  let partEnfants = totalPatrimoine;
  
  if (personalInfo.regime === 'marie') {
    if (personalInfo.nombreEnfants === 0) {
      partConjoint = totalPatrimoine;
      partEnfants = 0;
    } else {
      // Conjoint gets 1/4 in ownership or all in usufruct
      partConjoint = totalPatrimoine * 0.25;
      partEnfants = totalPatrimoine * 0.75;
    }
  }

  const partParEnfant = personalInfo.nombreEnfants > 0 ? partEnfants / personalInfo.nombreEnfants : 0;

  // Simplified succession rights calculation (this should be more complex in reality)
  const droitsSuccession = totalPatrimoine * 0.2; // Example rate
  const patrimoineNet = totalPatrimoine - droitsSuccession;

  // Create repartition array
  const repartition = [
    {
      label: 'Part Conjoint',
      amount: partConjoint,
      percentage: (partConjoint / totalPatrimoine) * 100
    },
    {
      label: 'Part Enfants',
      amount: partEnfants,
      percentage: (partEnfants / totalPatrimoine) * 100
    },
    {
      label: 'Droits de succession',
      amount: droitsSuccession,
      percentage: (droitsSuccession / totalPatrimoine) * 100
    }
  ];

  return {
    totalPatrimoine,
    partConjoint,
    partEnfants,
    partParEnfant,
    droitsSuccession,
    patrimoineNet,
    repartition
  };
}