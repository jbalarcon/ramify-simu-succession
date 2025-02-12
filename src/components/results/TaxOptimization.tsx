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
        return 'bg-primary-200 text-primary-800';
      case 'medium':
        return 'bg-grey-200 text-grey-800';
      case 'low':
        return 'bg-grey-100 text-grey-700';
      default:
        return 'bg-grey-200 text-grey-800';
    }
  };

  const suggestions = generateTaxSuggestions(personalInfo, patrimony, {} as InheritanceResults);
  
  return (
    <div className="bg-background-white rounded-large shadow-light-soft">
      <div className="p-6">
        <h3 className="text-h3 font-serif mb-4">
          Suggestions d&apos;Optimisation Fiscale
        </h3>
        
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="relative rounded-main border border-grey-200 bg-background-white p-6 shadow-light-soft hover:shadow-dark-strong transition-shadow cursor-pointer"
              onClick={() => setSelectedSuggestion(suggestion)}
            >
              <div className="flex items-center space-x-3">
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-main text-xs font-medium ${getPriorityColor(suggestion.priority)}`}>
                  {suggestion.priority.toUpperCase()}
                </div>
                {suggestion.savings && (
                  <div className="text-sm text-text-secondary">
                    Économie potentielle: {formatCurrency(suggestion.savings)}
                  </div>
                )}
              </div>
              <h4 className="mt-4 text-h5 font-serif">
                {suggestion.title}
              </h4>
              <p className="mt-2 text-sm text-text-secondary">
                {suggestion.description}
              </p>
              <div className="mt-4 text-sm font-medium text-primary-700">
                En savoir plus →
              </div>
            </div>
          ))}
        </div>

        {/* Detailed suggestion modal */}
        {selectedSuggestion && (
          <div className="fixed inset-0 bg-grey-1000 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-background-white rounded-large max-w-2xl w-full p-6">
              <div className="flex justify-between items-start">
                <h3 className="text-h4 font-serif">
                  {selectedSuggestion.title}
                </h3>
                <button
                  onClick={() => setSelectedSuggestion(null)}
                  className="text-text-secondary hover:text-text-primary transition-colors"
                >
                  <span className="sr-only">Fermer</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mt-4">
                <div className={`inline-flex items-center px-2.5 py-0.5 rounded-main text-xs font-medium ${getPriorityColor(selectedSuggestion.priority)}`}>
                  Priorité: {selectedSuggestion.priority.toUpperCase()}
                </div>
                {selectedSuggestion.savings && (
                  <div className="mt-2 text-sm text-text-secondary">
                    Économie potentielle: {formatCurrency(selectedSuggestion.savings)}
                  </div>
                )}
                <p className="mt-4 text-sm text-text-secondary">
                  {selectedSuggestion.description}
                </p>
                <div className="mt-4">
                  <h4 className="font-serif text-text-primary">Impact</h4>
                  <p className="mt-2 text-sm text-text-secondary">
                    {selectedSuggestion.impact}
                  </p>
                </div>
                <div className="mt-6">
                  <button
                    onClick={() => setSelectedSuggestion(null)}
                    className="button w-full"
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