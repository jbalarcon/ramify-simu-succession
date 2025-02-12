import { useState } from 'react';
import { useFormContext } from '../../context/FormContext';
import { generateTaxSuggestions, Suggestion } from '../../utils/taxOptimization';
import { InheritanceResults } from '@/utils/inheritanceCalculations';

export default function TaxOptimization() {
  const { personalInfo, patrimony } = useFormContext();
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);

  const formatCurrency = (amount: number | undefined) => {
    if (!amount) return '---';
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const getPriorityColor = (priority: Suggestion['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const suggestions = generateTaxSuggestions(personalInfo, patrimony, {} as InheritanceResults);
  
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-4 py-5 sm:p-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900 mb-4">
          Suggestions d'Optimisation Fiscale
        </h3>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="relative rounded-lg border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => setSelectedSuggestion(suggestion)}
            >
              <div className="flex items-center space-x-3">
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(suggestion.priority)}`}>
                  {suggestion.priority.toUpperCase()}
                </div>
                {suggestion.savings && (
                  <div className="text-sm text-gray-500">
                    Économie potentielle: {formatCurrency(suggestion.savings)}
                  </div>
                )}
              </div>
              <h4 className="mt-4 text-lg font-medium text-gray-900">
                {suggestion.title}
              </h4>
              <p className="mt-2 text-sm text-gray-500">
                {suggestion.description}
              </p>
              <div className="mt-4 text-sm font-medium text-indigo-600">
                En savoir plus →
              </div>
            </div>
          ))}
        </div>

        {/* Detailed suggestion modal */}
        {selectedSuggestion && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-2xl w-full p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedSuggestion.title}
                </h3>
                <button
                  onClick={() => setSelectedSuggestion(null)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Fermer</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-4">
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(selectedSuggestion.priority)}`}>
                  Priorité: {selectedSuggestion.priority.toUpperCase()}
                </div>
                {selectedSuggestion.savings && (
                  <div className="mt-2 text-sm text-gray-500">
                    Économie potentielle: {formatCurrency(selectedSuggestion.savings)}
                  </div>
                )}
                <p className="mt-4 text-sm text-gray-500">
                  {selectedSuggestion.description}
                </p>
                <div className="mt-4">
                  <h4 className="font-medium text-gray-900">Impact</h4>
                  <p className="mt-2 text-sm text-gray-500">
                    {selectedSuggestion.impact}
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => setSelectedSuggestion(null)}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Compris
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}