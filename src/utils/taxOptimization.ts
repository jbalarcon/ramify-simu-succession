import { PersonalInfo, Patrimony } from '../types/patrimony';
import { InheritanceResults } from '@/utils/inheritanceCalculations';

export interface Suggestion {
  id: string;
  title: string;
  description: string;
  impact: string;
  priority: 'high' | 'medium' | 'low';
  savings?: number;
}

export function generateTaxSuggestions(
  personalInfo: PersonalInfo,
  patrimony: Patrimony,
  results: InheritanceResults
): Suggestion[] {
  const suggestions: Suggestion[] = [];

  // Check for donation opportunities
  if (results.totalPatrimoine > 100000) {
    suggestions.push({
      id: 'donation-vivant',
      title: 'Donation de son vivant',
      description: 'Vous pouvez donner jusqu\'à 100 000€ à chacun de vos enfants tous les 15 ans sans droits de succession.',
      impact: 'Réduction potentielle des droits de succession',
      priority: 'high',
      savings: Math.min(results.droitsSuccession * 0.3, 100000 * 0.45),
    });
  }

  // Check for life insurance optimization
  if (!patrimony.epargneMLT || patrimony.epargneMLT.montantClient < results.totalPatrimoine * 0.3) {
    suggestions.push({
      id: 'assurance-vie',
      title: 'Optimisation Assurance-vie',
      description: "L'assurance-vie bénéficie d'un cadre fiscal avantageux avec un abattement de 152 500€ par bénéficiaire.",
      impact: 'Réduction significative des droits de succession',
      priority: 'high',
      savings: Math.min(results.droitsSuccession * 0.4, 152500 * 0.45),
    });
  }

  // Check for real estate dismemberment
  if (patrimony.residencePrincipale && patrimony.residencePrincipale.montantClient > 300000) {
    suggestions.push({
      id: 'demembrement',
      title: 'Démembrement de propriété',
      description: 'Le démembrement de propriété permet de transmettre la nue-propriété tout en conservant l\'usufruit.',
      impact: 'Réduction de la base imposable',
      priority: 'medium',
      savings: patrimony.residencePrincipale.montantClient * 0.2,
    });
  }

  // Check for business assets
  if (personalInfo.regime === 'marie') {
    suggestions.push({
      id: 'pacte-dutreil',
      title: 'Pacte Dutreil',
      description: 'Si vous détenez une entreprise, le Pacte Dutreil permet une exonération de 75% des droits de transmission.',
      impact: 'Réduction massive des droits de succession sur les actifs professionnels',
      priority: 'medium',
    });
  }

  // Check for charitable giving
  if (results.totalPatrimoine > 500000) {
    suggestions.push({
      id: 'dons-charitables',
      title: 'Dons à des organismes caritatifs',
      description: 'Les dons à des organismes d\'utilité publique permettent de réduire l\'assiette taxable.',
      impact: 'Réduction d\'impôts et optimisation philanthropique',
      priority: 'low',
      savings: results.totalPatrimoine * 0.05,
    });
  }

  return suggestions;
}