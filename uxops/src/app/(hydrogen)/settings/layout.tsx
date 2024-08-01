'use client';

import { routes } from '@/config/routes';
import { usePathname } from 'next/navigation';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/settings/navigation';

const pageHeader = {
  title: 'Settings',
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
      href: routes.settings.adminInfo,
      name: 'Admin Info',
    },
    {
      href: routes.settings.organization,
      name: 'Organization',
    },
    {
      href: routes.settings.department,
      name: 'Department',
    },
    {
      href: routes.settings.departmentInfo,
      name: 'Department Info',
    },
    {
      href: routes.settings.integration,
      name: 'Integration',
    },
  ],
};

export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const initialCrumb = [pageHeader.breadcrumb[0], pageHeader.breadcrumb[1]];
  const navigatedCrumb = pageHeader.breadcrumb.filter(
    (item) => pathname == item.href
  );
  const fileteredBreadcrumb = Array.from(
    new Set([...initialCrumb, ...navigatedCrumb])
  );

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={fileteredBreadcrumb} />
      <ProfileSettingsNav />
      {children}
    </>
  );
}
