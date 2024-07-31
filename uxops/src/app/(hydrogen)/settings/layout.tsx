import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/settings/navigation';

const pageHeader = {
  title: 'Onboarding',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      href: routes.settings.default,
      name: 'Settings',
    },
    {
      name: 'Onboarding',
    },
  ],
};

export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProfileSettingsNav />
      {children}
    </>
  );
}
