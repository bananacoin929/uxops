import AnalyticsDashboard from '@/app/shared/dashboard';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Analytics'),
};

export default function AnalyticsPage() {
  return (
    <>
      <AnalyticsDashboard />
    </>
  );
}
