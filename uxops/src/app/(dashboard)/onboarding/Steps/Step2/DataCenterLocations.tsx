import { useFormContext } from 'react-hook-form';
import { Button, Input } from 'rizzui';
import cn from '@utils/class-names';
import WidgetCard from '@components/cards/location-card';

import FormGroup from '@/app/shared/from-group-onboarding';
import { useState } from 'react';

export default function AddLocations({ className }: { className?: string }) {
  const [data, setData] = useState([{}]);

  return (
    <FormGroup
      title="Additional Locations"
      description="Input your office locations"
      className={cn(className)}
    >
      <div className="col-span-full w-full">
        <div className="grid w-full grid-cols-2 gap-3">
          {data.map((_item, index) => (
            <WidgetCard
              key={index}
              rounded="lg"
              descriptionClassName="text-gray-500"
              className={'col-span-1'}
            >
              <div className="col-span-1 w-full  justify-around gap-6 @sm:py-2 @7xl:gap-8">
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    label="Country"
                    placeholder="Country"
                    className="col-span-full"
                  />
                  <Input
                    label="State"
                    placeholder="State"
                    className="col-span-full"
                  />
                  <Input
                    label="City"
                    placeholder="City"
                    className="col-span-full"
                  />
                </div>
              </div>
            </WidgetCard>
          ))}
          <WidgetCard
            rounded="lg"
            descriptionClassName="text-gray-500"
            className={'col-span-1 flex items-center justify-center'}
          >
            <div className=" flex w-full items-center justify-center @sm:py-2 @7xl:gap-8">
              <Button
                className=" col-span-full"
                onClick={() => {
                  setData([...data, {}]);
                }}
              >
                Add Location
              </Button>
            </div>
          </WidgetCard>
        </div>
      </div>
    </FormGroup>
  );
}
