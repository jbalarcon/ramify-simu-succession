export interface Asset {
    montantClient: number;
    montantConjoint: number;
  }
  
  export interface Patrimony {
    residencePrincipale: Asset;
    residenceSecondaire: Asset;
    immobilierLocatif: Asset;
    autresBiensImmobiliers: Asset;
    droitsDetenusUsuBiensImmobiliers: Asset;
    depotsAVue: Asset;
    epargneMLT: Asset;
    valeursMobilieres: Asset;
    autresBiens: Asset;
    meublesMeublants: Asset;
    droitsDetenusUsuBiensFinanciers: Asset;
    titreSocietesDutreil: Asset;
    entrepriseIndividuelleDutreil: Asset;
    autresBiensPros: Asset;
    impotsDus: Asset;
    emprunts: Asset;
    autresDettes: Asset;
    fraisFuneraires: Asset;
  }
  
  export interface PersonalInfo {
    regime: 'marie' | 'celibataire' | 'pacse';
    nombreEnfants: number;
    age: number;
    ageConjoint?: number;
  }