'use client';

import { GarageDoorOrderWizard } from '@/components/garage-door-order-wizard';
import { useHomeWizardProgress } from '@/components/home-wizard-progress-context';

export function HomeGarageDoorWizard() {
  const wizardProgress = useHomeWizardProgress();

  return (
    <GarageDoorOrderWizard
      onProgressChange={wizardProgress?.setWizardInProgress}
    />
  );
}
