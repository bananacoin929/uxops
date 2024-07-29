import WebsiteMetrics from '@/app/shared/dashboard/website-metrics/table-widget';
import AccountRetention from '@/app/shared/dashboard/account-retention';
import Acquisition from '@/app/shared/dashboard/acquisition';
import ConversionRates from '@/app/shared/dashboard/conversion-rates';
import DeviceSessions from '@/app/shared/dashboard/device-sessions';
import GoalAccomplished from '@/app/shared/dashboard/goal-accomplished';
import StatCards from '@/app/shared/dashboard/stat-cards';
import TopTrafficSource from '@/app/shared/dashboard/top-traffic-source';
import UserMetrics from '@/app/shared/dashboard/user-metrics';
import PageMetrics from '@/app/shared/dashboard/page-metric/table-widget';

export default function AnalyticsDashboard() {
  return (
    <div className="@container">
      <div className="grid grid-cols-1 gap-6 @4xl:grid-cols-2 @7xl:grid-cols-12 3xl:gap-8">
        <StatCards className="grid-cols-1 @xl:grid-cols-2 @4xl:col-span-2 @6xl:grid-cols-4 @7xl:col-span-12" />

        <PageMetrics className="@4xl:col-span-2 @4xl:row-start-5 @7xl:col-span-12 @7xl:row-start-auto @[90rem]:col-span-7 @[112rem]:col-span-8" />

        <Acquisition className="@7xl:col-span-4" />

        <DeviceSessions className="@7xl:col-span-4" />

        <TopTrafficSource className="@7xl:col-span-4" />

        <UserMetrics className="@4xl:col-span-2 @7xl:col-span-12" />

        <ConversionRates className="@7xl:col-span-6 @[90rem]:col-span-7 @[112rem]:col-span-8" />

        <GoalAccomplished className="@4xl:col-start-2 @4xl:row-start-3 @7xl:col-span-6 @7xl:col-start-auto @7xl:row-start-auto @[90rem]:col-span-5 @[112rem]:col-span-4" />

        <AccountRetention className="@7xl:col-span-12 @[90rem]:col-span-5 @[112rem]:col-span-4" />

        <WebsiteMetrics className="@4xl:col-span-2 @7xl:col-span-12" />
      </div>
    </div>
  );
}
