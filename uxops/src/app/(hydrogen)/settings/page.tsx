import { metaObject } from '@/config/site.config';
import OrganizationAdmin from '@/app/shared/settings/organization-admin';

export const metadata = {
  ...metaObject('Profile Settings'),
};

export default function ProfileSettingsFormPage() {
  return <OrganizationAdmin />;
}
