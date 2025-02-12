import { useState } from 'react';
import { TableItem, SortField, SortDirection, categories } from '../../utils/tableUtils';

interface EnhancedTableProps {
  data: TableItem[];
  title: string;
  onSort: (field: SortField, direction: SortDirection) => void;
  onFilter: (categories: string[]) => void;
  onSearch: (term: string) => void;
}

export default function EnhancedTable({
  data,
  title,
  onSort,
  onFilter,
  onSearch,
}: EnhancedTableProps) {
  const [sortField, setSortField] = useState<SortField>('total');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSort = (field: SortField) => {
    const newDirection = field === sortField && sortDirection === 'asc' ? 'desc' : 'asc';
    setSortField(field);
    setSortDirection(newDirection);
    onSort(field, newDirection);
  };

  const handleCategoryChange = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(c => c !== category)
      : [...selectedCategories, category];
    setSelectedCategories(newCategories);
    onFilter(newCategories);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    onSearch(term);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return '↕️';
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h3 className="text-h4 font-serif text-text-primary">{title}</h3>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Rechercher..."
            className="px-4 py-3 rounded-main border-0 ring-1 ring-grey-300 focus:ring-2 focus:ring-primary bg-background-white text-text-primary"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
          
          <div className="flex flex-wrap gap-2">
            {Object.values(categories).map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-3 py-1 rounded-main text-sm transition-colors duration-200 ${
                  selectedCategories.includes(category)
                    ? 'bg-primary text-text-alternate'
                    : 'bg-grey-100 text-text-secondary hover:bg-grey-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-grey-200">
          <thead className="bg-grey-50">
            <tr>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary transition-colors"
                onClick={() => handleSort('label')}
              >
                {title} {getSortIcon('label')}
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary transition-colors"
                onClick={() => handleSort('montantClient')}
              >
                Montant Client {getSortIcon('montantClient')}
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary transition-colors"
                onClick={() => handleSort('montantConjoint')}
              >
                Montant Conjoint {getSortIcon('montantConjoint')}
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary transition-colors"
                onClick={() => handleSort('total')}
              >
                Total {getSortIcon('total')}
              </th>
              <th
                className="px-6 py-3 text-right text-xs font-medium text-text-secondary uppercase tracking-wider cursor-pointer hover:text-text-primary transition-colors"
                onClick={() => handleSort('percentage')}
              >
                % {getSortIcon('percentage')}
              </th>
            </tr>
          </thead>
          <tbody className="bg-background-white divide-y divide-grey-200">
            {data.map((item) => (
              <tr key={item.key} className="hover:bg-grey-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <span className="text-sm text-text-primary">{item.label}</span>
                    <span className="text-xs text-text-secondary ml-2">
                      {item.category}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-text-primary">
                  {formatCurrency(item.montantClient)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-text-primary">
                  {formatCurrency(item.montantConjoint)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right font-medium text-text-primary">
                  {formatCurrency(item.total)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-right text-text-primary">
                  {formatPercentage(item.percentage)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}