import MultiStepFormOne from '@/app/(onboarding)/onboarding/Steps';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Multi Step'),
};

export default function MultiStepFormPage() {
  return <MultiStepFormOne />;
}
