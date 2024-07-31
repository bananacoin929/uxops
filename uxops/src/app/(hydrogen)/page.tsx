import Dashboard from '@/app/shared/dashboard';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject(),
};

export default function DashboardPage() {
  return <Dashboard />;
}
