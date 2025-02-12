import { useState } from 'react';
import { useFormContext } from '../../context/FormContext';
import EnhancedTable from './EnhancedTable';
import {
  TableItem,
  SortField,
  SortDirection,
  assetCategories,
  liabilityCategories,
  prepareTableData,
  sortData,
  filterData,
} from '../../utils/tableUtils';

export default function BreakdownTables() {
  const { patrimony } = useFormContext();
  const [assetsData, setAssetsData] = useState<TableItem[]>(() => {
    const totalAssets = Object.entries(patrimony).reduce((sum, [key, value]) => {
      if (!key.includes('impots') && !key.includes('emprunts') && !key.includes('dettes') && !key.includes('frais')) {
        return sum + value.montantClient + value.montantConjoint;
      }
      return sum;
    }, 0);
    return prepareTableData(patrimony, assetCategories, totalAssets);
  });

  const [liabilitiesData, setLiabilitiesData] = useState<TableItem[]>(() => {
    const totalLiabilities = Object.entries(patrimony).reduce((sum, [key, value]) => {
      if (key.includes('impots') || key.includes('emprunts') || key.includes('dettes') || key.includes('frais')) {
        return sum + value.montantClient + value.montantConjoint;
      }
      return sum;
    }, 0);
    return prepareTableData(patrimony, liabilityCategories, totalLiabilities);
  });

  const handleSort = (
    data: TableItem[],
    setData: (data: TableItem[]) => void
  ) => (field: SortField, direction: SortDirection) => {
    setData(sortData(data, field, direction));
  };

  const handleFilter = (
    data: TableItem[],
    setData: (data: TableItem[]) => void,
    originalData: TableItem[]
  ) => (categories: string[]) => {
    setData(filterData(originalData, categories, ''));
  };

  const handleSearch = (
    data: TableItem[],
    setData: (data: TableItem[]) => void,
    originalData: TableItem[]
  ) => (term: string) => {
    setData(filterData(originalData, [], term));
  };

  return (
    <div className="space-y-8">
      <EnhancedTable
        data={assetsData}
        title="Actifs"
        onSort={handleSort(assetsData, setAssetsData)}
        onFilter={handleFilter(assetsData, setAssetsData, assetsData)}
        onSearch={handleSearch(assetsData, setAssetsData, assetsData)}
      />

      <EnhancedTable
        data={liabilitiesData}
        title="Passifs"
        onSort={handleSort(liabilitiesData, setLiabilitiesData)}
        onFilter={handleFilter(liabilitiesData, setLiabilitiesData, liabilitiesData)}
        onSearch={handleSearch(liabilitiesData, setLiabilitiesData, liabilitiesData)}
      />
    </div>
  );
}