import { InheritanceResults } from '@/utils/inheritanceCalculations';
import { PersonalInfo, Patrimony } from './patrimony';

export interface Scenario {
  id: string;
  name: string;
  description: string;
  personalInfo: PersonalInfo;
  patrimony: Patrimony;
  results?: InheritanceResults;
}

export interface ScenarioComparison {
  baseScenario: Scenario;
  comparisonScenarios: Scenario[];
}