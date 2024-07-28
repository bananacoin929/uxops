import { metaObject } from '@/config/site.config';
import OnboardingIntroduction from '@/app/shared/onboarding-settings/introduction';

export const metadata = {
  ...metaObject('Profile Settings'),
};

export default function ProfileSettingsFormPage() {
  return <OnboardingIntroduction />;
}
