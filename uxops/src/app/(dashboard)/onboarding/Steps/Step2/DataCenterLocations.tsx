import { useFormContext, Controller } from 'react-hook-form';
import { Button, Input } from 'rizzui';
import cn from '@utils/class-names';
import WidgetCard from '@components/cards/location-card';

import FormGroup from '@/app/shared/from-group-onboarding';
import { PiTrashBold } from 'react-icons/pi';

export default function DataCenterLocations({
  className,
}: {
  className?: string;
}) {
  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Data Center Locations"
      description="Input your data center locations"
      className={cn(className)}
    >
      <Controller
        name="data_locations"
        control={control}
        render={({ field: { value } }) => (
          <div className="col-span-full w-full">
            <div className="grid w-full grid-cols-2 gap-3">
              {value.map((item: any, index: number) => (
                <WidgetCard
                  key={index}
                  rounded="lg"
                  descriptionClassName="text-gray-500"
                  className={'col-span-2'}
                >
                  <div className="col-span-1 w-full  justify-around gap-6 @sm:py-2 @7xl:gap-8">
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        label="Data Center Name"
                        placeholder="Data Center Name"
                        className="col-span-full"
                        value={item.name}
                        onChange={(e) => {
                          let updateData = value.map((it: any, ind: number) => {
                            if (ind === index)
                              return { ...it, name: e.target.value };
                            else return it;
                          });
                          setValue('data_locations', updateData);
                        }}
                        error={
                          (errors.data_locations as any)?.[index]?.name?.message
                        }
                      />
                      <Input
                        label="Country"
                        placeholder="Country"
                        className="col-span-full"
                        value={item.contry}
                        onChange={(e) => {
                          let updateData = value.map((it: any, ind: number) => {
                            if (ind === index)
                              return { ...it, country: e.target.value };
                            else return it;
                          });
                          setValue('data_locations', updateData);
                        }}
                      />
                      <Input
                        label="State"
                        placeholder="State"
                        className="col-span-full"
                        value={item.state}
                        onChange={(e) => {
                          let updateData = value.map((it: any, ind: number) => {
                            if (ind === index)
                              return { ...it, state: e.target.value };
                            else return it;
                          });
                          setValue('data_locations', updateData);
                        }}
                      />
                      <Input
                        label="City"
                        placeholder="City"
                        className="col-span-full"
                        value={item.city}
                        onChange={(e) => {
                          let updateData = value.map((it: any, ind: number) => {
                            if (ind === index)
                              return { ...it, city: e.target.value };
                            else return it;
                          });
                          setValue('data_locations', updateData);
                        }}
                      />
                      <div className="col-span-full -mt-2 flex">
                        <Button
                          variant="text"
                          color="danger"
                          onClick={() => {
                            value.splice(index, 1);
                            setValue('data_locations', value);
                          }}
                          className="-mx-2 -mb-1 ms-auto mt-5 h-auto px-2 py-1 font-semibold"
                        >
                          <PiTrashBold className="me-1 h-[18px] w-[18px]" />{' '}
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </WidgetCard>
              ))}
              <WidgetCard
                rounded="lg"
                descriptionClassName="text-gray-500"
                className={'col-span-2 flex items-center justify-center'}
              >
                <div className=" flex w-full items-center justify-center @sm:py-2 @7xl:gap-8">
                  <Button
                    className=" col-span-full"
                    onClick={() => {
                      setValue('data_locations', [
                        ...value,
                        {
                          id: value.length + 1,
                          name: '',
                          country: '',
                          state: '',
                          city: '',
                        },
                      ]);
                    }}
                  >
                    Add Location
                  </Button>
                </div>
              </WidgetCard>
            </div>
          </div>
        )}
      />
    </FormGroup>
  );
}
