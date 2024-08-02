'use client';
import { Accordion, Badge } from 'rizzui';
import { FaChevronDown } from 'react-icons/fa';
import cn from '@utils/class-names';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Azure from './integrations/azure';
import { useUserProfile } from '@/lib/providers/user-profile-provider';
import { getIntegration } from '@/utils/integrations';

const data = [
  {
    id: 'azure',
    title: 'Azure',
    icon: '/Microsoft.ico',
    component: Azure,
  },
];

export default function StepZero() {
  const { userProfile } = useUserProfile();
  const [integrationData, setIntegrationData] = useState<any>({});

  async function getData() {
    const { data, error } = await getIntegration({
      user_id: userProfile?.id,
    });
    console.log('error', error);
    !error && setIntegrationData(data);
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="mt-6 grid w-full grid-cols-12">
      <div className=" col-span-2 @xl:col-span-2" />
      <div className="col-span-8 flex items-center justify-center @xl:col-span-8">
        {data.map((item: any) => (
          <div
            key={item?.title}
            className="bg-surface-100  hover:bg-overlay-hover data-open:bg-selection border-default hover:border-strong data-open:border-strong data-open:pb-px col-span-12 mx-auto w-full -space-y-px overflow-hidden border shadow transition first:rounded-tl first:rounded-tr last:rounded-bl last:rounded-br hover:z-50"
          >
            <Accordion className="group  w-full flex-col items-center justify-between rounded px-6 text-foreground">
              <Accordion.Header>
                {
                  // @ts-ignore: TS2322
                  ({ open }: { open: boolean }) => {
                    return (
                      <div className="flex w-full cursor-pointer items-center justify-between py-5 text-xl font-semibold">
                        <div className="flex items-center justify-center gap-3">
                          <Image
                            src={item?.icon}
                            alt={item?.icon}
                            width={20}
                            height={20}
                            className="h-5 w-5 rounded-full"
                          />
                          {item?.title}
                        </div>
                        <div className="flex items-center justify-center gap-3">
                          {integrationData[`${item.id}`]?.enabled ? (
                            <Badge variant="flat" color="success">
                              Enabled
                            </Badge>
                          ) : (
                            <Badge variant="flat" color={undefined}>
                              Disabled
                            </Badge>
                          )}
                          <FaChevronDown
                            className={cn(
                              'h-5 w-5 -rotate-90 transform transition-transform duration-300',
                              open && '-rotate-0'
                            )}
                          />
                        </div>
                      </div>
                    );
                  }
                }
              </Accordion.Header>
              <Accordion.Body className="mb-7">
                {
                  <item.component
                    data={integrationData}
                    setData={setIntegrationData}
                    getData={getData}
                  />
                }
              </Accordion.Body>
            </Accordion>
          </div>
        ))}
      </div>
      <div className=" col-span-2 @xl:col-span-2" />
    </div>
  );
}
