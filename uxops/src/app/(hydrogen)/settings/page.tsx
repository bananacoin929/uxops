import { metaObject } from '@/config/site.config';
import AdminInfo from '@/app/shared/settings/adminInfo';

export const metadata = {
  ...metaObject('Profile Settings'),
};

export default function ProfileSettingsFormPage() {
  return <AdminInfo />;
}
