import { useFormContext } from '../../context/FormContext';
import { calculateInheritance } from '../../utils/inheritanceCalculations';
import { Pie } from 'react-chartjs-2';
import { generatePDF } from '../../utils/pdfGenerator';
import BreakdownTables from './BreakdownTables';
import ScenarioComparison from '../scenarios/ScenarioComparison';
import TaxOptimization from './TaxOptimization';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale
);

export default function ResultsView() {
  const { personalInfo, patrimony } = useFormContext();
  const results = calculateInheritance(patrimony, personalInfo);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const chartData = {
    labels: results.repartition.map(item => item.label),
    datasets: [
      {
        data: results.repartition.map(item => item.amount),
        backgroundColor: [
          'rgba(54, 162, 235, 0.8)',
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 99, 132, 0.8)',
        ],
        borderColor: [
          'rgba(54, 162, 235, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(255, 99, 132, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-6">Résultats de la Succession</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Répartition du Patrimoine</h3>
            <div className="h-64">
              <Pie data={chartData} options={{ maintainAspectRatio: false }} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Patrimoine Total</p>
              <p className="text-2xl font-bold">{formatCurrency(results.totalPatrimoine)}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Part du Conjoint</p>
              <p className="text-2xl font-bold">{formatCurrency(results.partConjoint)}</p>
              <p className="text-sm text-gray-500">
                ({(results.partConjoint / results.totalPatrimoine * 100).toFixed(1)}%)
              </p>
            </div>

            {personalInfo.nombreEnfants > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-600">Part par Enfant</p>
                <p className="text-2xl font-bold">{formatCurrency(results.partParEnfant)}</p>
                <p className="text-sm text-gray-500">
                  (Pour {personalInfo.nombreEnfants} enfant{personalInfo.nombreEnfants > 1 ? 's' : ''})
                </p>
              </div>
            )}

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Droits de Succession Estimés</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(results.droitsSuccession)}</p>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Patrimoine Net Après Droits</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(results.patrimoineNet)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <BreakdownTables />
      </div>
      <TaxOptimization />
      <ScenarioComparison />
      <div className="flex justify-end">
        <button
          onClick={() => generatePDF(results, personalInfo, patrimony)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg 
            className="mr-2 h-5 w-5" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" 
            />
          </svg>
          Télécharger le rapport PDF
        </button>
      </div>      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-blue-700">
              Ces calculs sont donnés à titre indicatif. Pour une estimation précise, veuillez consulter un notaire.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}