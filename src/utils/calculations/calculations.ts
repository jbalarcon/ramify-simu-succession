import { Patrimony } from '../../types/patrimony';

export const calculateTotalClient = (patrimony: Patrimony): number => {
  const assets = [
    patrimony.residencePrincipale,
    patrimony.residenceSecondaire,
    patrimony.immobilierLocatif,
    patrimony.autresBiensImmobiliers,
    patrimony.droitsDetenusUsuBiensImmobiliers,
    patrimony.depotsAVue,
    patrimony.epargneMLT,
    patrimony.valeursMobilieres,
    patrimony.autresBiens,
    patrimony.meublesMeublants,
    patrimony.droitsDetenusUsuBiensFinanciers,
    patrimony.titreSocietesDutreil,
    patrimony.entrepriseIndividuelleDutreil,
    patrimony.autresBiensPros
  ];

  const liabilities = [
    patrimony.impotsDus,
    patrimony.emprunts,
    patrimony.autresDettes,
    patrimony.fraisFuneraires
  ];

  const totalAssets = assets.reduce((sum, asset) => sum + asset.montantClient, 0);
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.montantClient, 0);

  return totalAssets - totalLiabilities;
};

export const calculateTotalConjoint = (patrimony: Patrimony): number => {
  // Similar to calculateTotalClient but for conjoint
  const assets = [
    patrimony.residencePrincipale,
    patrimony.residenceSecondaire,
    // ... same as above
  ];

  const liabilities = [
    patrimony.impotsDus,
    patrimony.emprunts,
    // ... same as above
  ];

  const totalAssets = assets.reduce((sum, asset) => sum + asset.montantConjoint, 0);
  const totalLiabilities = liabilities.reduce((sum, liability) => sum + liability.montantConjoint, 0);

  return totalAssets - totalLiabilities;
};