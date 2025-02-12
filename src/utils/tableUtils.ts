import { Patrimony } from '../types/patrimony';

export interface TableItem {
  key: string;
  label: string;
  category: string;
  montantClient: number;
  montantConjoint: number;
  total: number;
  percentage: number;
}

export type SortField = 'label' | 'montantClient' | 'montantConjoint' | 'total' | 'percentage';
export type SortDirection = 'asc' | 'desc';

export const categories = {
  immobilier: 'Immobilier',
  financier: 'Actifs Financiers',
  autres: 'Autres Actifs',
  dettes: 'Dettes',
  frais: 'Frais',
};

export const assetCategories = [
  { key: 'residencePrincipale', label: 'Résidence Principale', category: categories.immobilier },
  { key: 'residenceSecondaire', label: 'Résidence Secondaire', category: categories.immobilier },
  { key: 'immobilierLocatif', label: 'Immobilier Locatif', category: categories.immobilier },
  { key: 'depotsAVue', label: 'Dépôts à Vue', category: categories.financier },
  { key: 'epargneMLT', label: 'Épargne Moyen/Long Terme', category: categories.financier },
  { key: 'valeursMobilieres', label: 'Valeurs Mobilières', category: categories.financier },
];

export const liabilityCategories = [
  { key: 'emprunts', label: 'Emprunts', category: categories.dettes },
  { key: 'impotsDus', label: 'Impôts Dus', category: categories.dettes },
  { key: 'autresDettes', label: 'Autres Dettes', category: categories.dettes },
  { key: 'fraisFuneraires', label: 'Frais Funéraires', category: categories.frais },
];

export const prepareTableData = (
  patrimony: Patrimony,
  items: typeof assetCategories | typeof liabilityCategories,
  grandTotal: number
): TableItem[] => {
  return items.map(item => {
    const data = patrimony[item.key as keyof Patrimony];
    const total = data.montantClient + data.montantConjoint;
    return {
      ...item,
      montantClient: data.montantClient,
      montantConjoint: data.montantConjoint,
      total,
      percentage: (total / grandTotal) * 100,
    };
  });
};

export const sortData = (
  data: TableItem[],
  field: SortField,
  direction: SortDirection
): TableItem[] => {
  return [...data].sort((a, b) => {
    let comparison = 0;
    if (field === 'label') {
      comparison = a.label.localeCompare(b.label);
    } else {
      comparison = a[field] - b[field];
    }
    return direction === 'asc' ? comparison : -comparison;
  });
};

export const filterData = (
  data: TableItem[],
  selectedCategories: string[],
  searchTerm: string
): TableItem[] => {
  return data.filter(
    item =>
      (selectedCategories.length === 0 || selectedCategories.includes(item.category)) &&
      (searchTerm === '' || item.label.toLowerCase().includes(searchTerm.toLowerCase()))
  );
};