import { useState } from 'react';
import { useScenarios } from '../../context/ScenariosContext';
import { useFormContext } from '../../context/FormContext';
import { Bar } from 'react-chartjs-2';

export default function ScenarioComparison() {
  const { scenarios, activeScenarioId, addScenario } = useScenarios();
  const { personalInfo, patrimony } = useFormContext();
  const [scenarioName, setScenarioName] = useState('');
  const [scenarioDescription, setScenarioDescription] = useState('');

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleSaveScenario = () => {
    addScenario({
      name: scenarioName,
      description: scenarioDescription,
      personalInfo,
      patrimony,
    });
    setScenarioName('');
    setScenarioDescription('');
  };

  const chartData = {
    labels: scenarios.map(s => s.name),
    datasets: [
      {
        label: 'Part Conjoint',
        data: scenarios.map(s => s.results?.partConjoint || 0),
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
      },
      {
        label: 'Part Enfants',
        data: scenarios.map(s => s.results?.partEnfants || 0),
        backgroundColor: 'rgba(75, 192, 192, 0.8)',
      },
      {
        label: 'Droits de Succession',
        data: scenarios.map(s => s.results?.droitsSuccession || 0),
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    scales: {
      x: { stacked: true },
      y: { stacked: true },
    },
    plugins: {
      title: {
        display: true,
        text: 'Comparaison des Scénarios',
      },
    },
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Sauvegarder le Scénario Actuel
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nom du scénario
            </label>
            <input
              type="text"
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              value={scenarioDescription}
              onChange={(e) => setScenarioDescription(e.target.value)}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            />
          </div>
          <button
            onClick={handleSaveScenario}
            disabled={!scenarioName}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Sauvegarder le Scénario
          </button>
        </div>
      </div>

      {scenarios.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Comparaison des Scénarios
          </h3>
          <div className="h-96">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div className="mt-6 space-y-4">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="border rounded-lg p-4 hover:bg-gray-50"
              >
                <h4 className="font-medium">{scenario.name}</h4>
                <p className="text-sm text-gray-500">{scenario.description}</p>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Part Conjoint</span>
                    <p className="font-medium">
                      {formatCurrency(scenario.results?.partConjoint || 0)}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Part Enfants</span>
                    <p className="font-medium">
                      {formatCurrency(scenario.results?.partEnfants || 0)}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">
                      Droits de Succession
                    </span>
                    <p className="font-medium">
                      {formatCurrency(scenario.results?.droitsSuccession || 0)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}