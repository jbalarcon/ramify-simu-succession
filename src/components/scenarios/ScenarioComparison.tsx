import { useState } from 'react';
import { useScenarios } from '../../context/ScenariosContext';
import { useFormContext } from '../../context/FormContext';
import { Bar } from 'react-chartjs-2';

export default function ScenarioComparison() {
  const { scenarios, addScenario } = useScenarios();
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
        backgroundColor: 'rgba(239, 194, 126, 0.8)', // gold500
      },
      {
        label: 'Part Enfants',
        data: scenarios.map(s => s.results?.partEnfants || 0),
        backgroundColor: 'rgba(242, 214, 172, 0.8)', // gold400
      },
      {
        label: 'Droits de Succession',
        data: scenarios.map(s => s.results?.droitsSuccession || 0),
        backgroundColor: 'rgba(180, 132, 59, 0.8)',  // gold700
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
      <div className="bg-background-white rounded-large shadow-light-soft p-6">
        <h3 className="text-h4 font-serif mb-4">
          Sauvegarder le Scénario Actuel
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Nom du scénario
            </label>
            <input
              type="text"
              value={scenarioName}
              onChange={(e) => setScenarioName(e.target.value)}
              className="block w-full rounded-main px-4 py-3 bg-background-white border-0 text-text-primary ring-1 ring-grey-300 focus:ring-2 focus:ring-primary transition-all duration-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Description
            </label>
            <textarea
              value={scenarioDescription}
              onChange={(e) => setScenarioDescription(e.target.value)}
              rows={3}
              className="block w-full rounded-main px-4 py-3 bg-background-white border-0 text-text-primary ring-1 ring-grey-300 focus:ring-2 focus:ring-primary transition-all duration-200"
            />
          </div>
          <button
            onClick={handleSaveScenario}
            disabled={!scenarioName}
            className={`
              button w-full
              ${!scenarioName && 'opacity-50 cursor-not-allowed'}
            `}
          >
            Sauvegarder le Scénario
          </button>
        </div>
      </div>

      {scenarios.length > 0 && (
        <div className="bg-background-white rounded-large shadow-light-soft p-6">
          <h3 className="text-h4 font-serif mb-4">
            Comparaison des Scénarios
          </h3>
          <div className="h-96">
            <Bar data={chartData} options={chartOptions} />
          </div>
          <div className="mt-6 space-y-4">
            {scenarios.map((scenario) => (
              <div
                key={scenario.id}
                className="border border-grey-200 rounded-main p-4 hover:bg-grey-50 transition-colors"
              >
                <h4 className="text-h5 font-serif">{scenario.name}</h4>
                <p className="text-sm text-text-secondary">{scenario.description}</p>
                <div className="mt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <span className="text-sm text-text-secondary">Part Conjoint</span>
                    <p className="text-h6 font-serif">
                      {formatCurrency(scenario.results?.partConjoint || 0)}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-text-secondary">Part Enfants</span>
                    <p className="text-h6 font-serif">
                      {formatCurrency(scenario.results?.partEnfants || 0)}
                    </p>
                  </div>
                  <div>
                    <span className="text-sm text-text-secondary">
                      Droits de Succession
                    </span>
                    <p className="text-h6 font-serif">
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