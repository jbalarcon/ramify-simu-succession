import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { InheritanceResults } from './inheritanceCalculations';
import { PersonalInfo, Patrimony } from '../types/patrimony';

export function generatePDF(
  results: InheritanceResults,
  personalInfo: PersonalInfo,
  patrimony: Patrimony
) {
  const doc = new jsPDF();
  const formatCurrency = (num: number) => 
    new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0,
    }).format(num);

  // Add title
  doc.setFontSize(20);
  doc.text('Rapport de Succession', 105, 15, { align: 'center' });
  
  // Add date
  doc.setFontSize(10);
  doc.text(`Date: ${new Date().toLocaleDateString('fr-FR')}`, 20, 25);

  // Personal Information
  doc.setFontSize(16);
  doc.text('Information Personnelle', 20, 35);
  doc.setFontSize(12);
  doc.text(`Régime: ${personalInfo.regime}`, 20, 45);
  doc.text(`Nombre d'enfants: ${personalInfo.nombreEnfants}`, 20, 52);
  doc.text(`Âge: ${personalInfo.age}`, 20, 59);
  if (personalInfo.ageConjoint) {
    doc.text(`Âge du conjoint: ${personalInfo.ageConjoint}`, 20, 66);
  }

  // Assets Table
  doc.setFontSize(16);
  doc.text('Actifs', 20, 80);
  
  const assetsData = [
    ['Type', 'Montant Client', 'Montant Conjoint', 'Total'],
    ['Résidence Principale', 
      formatCurrency(patrimony.residencePrincipale.montantClient),
      formatCurrency(patrimony.residencePrincipale.montantConjoint),
      formatCurrency(patrimony.residencePrincipale.montantClient + patrimony.residencePrincipale.montantConjoint)
    ],
    // Add other assets...
  ];

  (doc as any).autoTable({
    startY: 85,
    head: [assetsData[0]],
    body: assetsData.slice(1),
  });

  // Results Summary
  const currentY = (doc as any).lastAutoTable.finalY + 20;
  doc.setFontSize(16);
  doc.text('Résultats', 20, currentY);
  
  const resultsData = [
    ['Description', 'Montant', 'Pourcentage'],
    ...results.repartition.map(item => [
      item.label,
      formatCurrency(item.amount),
      `${item.percentage.toFixed(1)}%`
    ])
  ];

  (doc as any).autoTable({
    startY: currentY + 5,
    head: [resultsData[0]],
    body: resultsData.slice(1),
  });

  // Legal Notice
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(
    'Ce document est fourni à titre indicatif. Pour une estimation précise, veuillez consulter un notaire.',
    20,
    doc.internal.pageSize.height - 20
  );

  // Save the PDF
  doc.save('rapport-succession.pdf');
}