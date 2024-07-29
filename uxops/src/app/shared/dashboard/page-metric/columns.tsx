'use client';

import { HeaderCell } from '@/app/shared/table';
import { Badge, Title, Text } from 'rizzui';
import dayjs from 'dayjs';
import { ResponsiveContainer, BarChart, Bar } from 'recharts';
import { PiArrowSquareOut } from 'react-icons/pi';
import Microsoft365 from '@/../public/Microsoft365.svg';
import MicrosoftEntra from '@/../public/MicrosoftEntra.svg';

const formatter = Intl.NumberFormat('en', {
  notation: 'compact',
});

function getTrafficShare(trafficShare: number) {
  if (trafficShare > 70) {
    return (
      <div className="flex items-center">
        <Badge color="success" renderAsDot />
        <Text className="ms-2 font-medium text-green-dark">
          {trafficShare}%
        </Text>
      </div>
    );
  }
  if (trafficShare > 40) {
    return (
      <div className="flex items-center">
        <Badge color="warning" renderAsDot />
        <Text className="ms-2 font-medium text-orange-dark">
          {trafficShare}%
        </Text>
      </div>
    );
  }
  return (
    <div className="flex items-center">
      <Badge color="danger" renderAsDot />
      <Text className="ms-2 font-medium text-red-dark">{trafficShare}%</Text>
    </div>
  );
}

function getChartColorByTrafficShare(trafficShare: number) {
  if (trafficShare > 70) {
    return '#16a679';
  }
  if (trafficShare > 40) {
    return '#d89b0d';
  }
  return '#c5280c';
}

type Columns = {
  sortConfig?: any;
  onHeaderCellClick: (value: string) => void;
};

export const getColumns = ({ sortConfig, onHeaderCellClick }: Columns) => [
  {
    title: (
      <HeaderCell
        title="Title"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'title'
        }
        className="ps-2 lg:ps-4"
      />
    ),
    dataIndex: 'title',
    key: 'title',
    width: 400,
    onHeaderCell: () => onHeaderCellClick('title'),
    render: (title: string, row: any) => (
      <>
        <div className="flex items-center ps-2 lg:ps-4">
          <Title as="h6" className="mb-0.5 me-1.5 !text-sm font-semibold">
            {title}
          </Title>
          {/* <PiArrowSquareOut strokeWidth={4} className="h-4 w-4" /> */}
        </div>
      </>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Service"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'services'
        }
      />
    ),
    dataIndex: 'services',
    key: 'services',
    width: 150,
    onHeaderCell: () => onHeaderCellClick('services'),
    render: (value: string[]) => (
      <div className="flex items-center justify-start gap-3">
        {/* <div>
          {value[0] === 'Microsoft 365 suite' ? (
            <Microsoft365 />
          ) : (
            <MicrosoftEntra />
          )}
        </div> */}
        {value[0]}
      </div>
    ),
  },
  {
    title: <HeaderCell title="Last Updated" />,
    dataIndex: 'lastModifiedDateTime',
    key: 'lastModifiedDateTime',
    width: 150,
    render: (value: Date) => (
      <div className="">
        <Text className="mb-1 font-medium text-gray-700">
          {dayjs(value).format('mm')}m {dayjs(value).format('ss')}s
        </Text>
        <Text className="text-[13px] text-gray-500">
          {dayjs(value).format('DD MMM YYYY')}
        </Text>
      </div>
    ),
  },
  {
    title: (
      <HeaderCell
        title="Relevance"
        sortable
        ascending={
          sortConfig?.direction === 'asc' && sortConfig?.key === 'severity'
        }
      />
    ),
    dataIndex: 'severity',
    key: 'severity',
    width: 150,
    onHeaderCell: () => onHeaderCellClick('severity'),
    render: (value: string) => <div className="">{value}</div>,
  },
  {
    title: <HeaderCell title="Tags" align="left" className="pe-2 lg:pe-4" />,
    dataIndex: 'tags',
    key: 'tags',
    width: 200,
    render: (tags: any, row: any) => (
      <>
        {/* <div className="ms-auto h-12 w-full max-w-[240px] pe-2 lg:pe-4 4xl:h-14"> */}
        <div className="flex w-full flex-wrap gap-3">
          {tags.map((tag: string, index: number) => {
            return (
              <div
                key={index}
                className="w-max rounded-xl border-[1px] border-gray-500 p-2"
              >
                {tag}
              </div>
            );
          })}
        </div>
        {/* </div> */}
      </>
    ),
  },
];
