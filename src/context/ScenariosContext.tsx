import { createContext, useContext, useState, ReactNode } from 'react';
import { Scenario } from '../types/scenarios';
import { calculateInheritance } from '../utils/inheritanceCalculations';

interface ScenariosContextType {
  scenarios: Scenario[];
  activeScenarioId: string;
  addScenario: (scenario: Omit<Scenario, 'id'>) => void;
  updateScenario: (id: string, updates: Partial<Scenario>) => void;
  deleteScenario: (id: string) => void;
  setActiveScenario: (id: string) => void;
}

const ScenariosContext = createContext<ScenariosContextType | undefined>(undefined);

export function ScenariosProvider({ children }: { children: ReactNode }) {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [activeScenarioId, setActiveScenarioId] = useState<string>('');

  const addScenario = (scenario: Omit<Scenario, 'id'>) => {
    const newScenario: Scenario = {
      ...scenario,
      id: Date.now().toString(),
      results: calculateInheritance(scenario.patrimony, scenario.personalInfo),
    };
    setScenarios([...scenarios, newScenario]);
    if (scenarios.length === 0) {
      setActiveScenarioId(newScenario.id);
    }
  };

  const updateScenario = (id: string, updates: Partial<Scenario>) => {
    setScenarios(scenarios.map(scenario => {
      if (scenario.id === id) {
        const updatedScenario = { ...scenario, ...updates };
        updatedScenario.results = calculateInheritance(
          updatedScenario.patrimony,
          updatedScenario.personalInfo
        );
        return updatedScenario;
      }
      return scenario;
    }));
  };

  const deleteScenario = (id: string) => {
    setScenarios(scenarios.filter(s => s.id !== id));
    if (activeScenarioId === id) {
      setActiveScenarioId(scenarios[0]?.id || '');
    }
  };

  return (
    <ScenariosContext.Provider
      value={{
        scenarios,
        activeScenarioId,
        addScenario,
        updateScenario,
        deleteScenario,
        setActiveScenario: setActiveScenarioId,
      }}
    >
      {children}
    </ScenariosContext.Provider>
  );
}

export const useScenarios = () => {
  const context = useContext(ScenariosContext);
  if (!context) {
    throw new Error('useScenarios must be used within ScenariosProvider');
  }
  return context;
};