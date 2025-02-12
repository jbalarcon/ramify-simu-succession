import { FormProvider } from '../context/FormContext';
import { StepperProvider } from '../context/StepperContext';
import { ScenariosProvider } from '../context/ScenariosContext';
import Stepper from '../components/stepper/Stepper';
import StepContent from '../components/stepper/StepContent';

export default function Home() {
  return (
    <ScenariosProvider>
      <FormProvider>
        <StepperProvider>
          <main className="min-h-screen bg-gradient-to-b from-secondary-50 to-secondary-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
              <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl font-bold text-secondary-900 sm:text-5xl">
                  Calculateur de Succession
                </h1>
                <p className="text-secondary-600 max-w-2xl mx-auto">
                  Estimez simplement la répartition de votre patrimoine selon les règles de succession en France
                </p>
              </div>
              
              <Stepper />
              
              <div className="bg-white shadow-soft rounded-xl overflow-hidden animate-slide-up">
                <StepContent />
              </div>

              <footer className="mt-16 text-center text-sm text-secondary-500">
                <p>© {new Date().getFullYear()} Calculateur de Succession. Tous droits réservés.</p>
              </footer>
            </div>
          </main>
        </StepperProvider>
      </FormProvider>
    </ScenariosProvider>
  );
}