import { Select } from 'rizzui';
import cn from '@utils/class-names';
import { useFormContext, Controller } from 'react-hook-form';
import FormGroup from '@/app/shared/from-group-onboarding';
import { PiCheckBold } from 'react-icons/pi';

const options = [
  { label: 'Amazon', value: 1 },
  { label: 'Microsoft', value: 2 },
  { label: 'Google', value: 3 },
  { label: 'Other', value: 4 },
];

export default function PublicCloudProvider({
  className,
}: {
  className?: string;
}) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Public Cloud Provider"
      description="Select your public cloud provider"
      className={cn(className)}
    >
      <Controller
        name="public_cloud_provider"
        control={control}
        render={({ field: { value, onChange } }) => (
          <Select
            multiple
            className="col-span-full"
            dropdownClassName="!z-0"
            placeholder="Select the public cloud provider"
            options={options}
            value={value}
            onChange={onChange}
            error={errors?.public_cloud_provider?.message as string}
            getOptionValue={(option: { value: number; label: string }) =>
              option.value
            }
            getOptionDisplayValue={(option: { value: any; label: any }) => {
              return (
                <div className="flex w-full items-center gap-5">
                  {option.label}
                  {value.filter((lo: any) => lo === option.value)?.length ? (
                    <PiCheckBold className="h-3.5 w-3.5" />
                  ) : (
                    ''
                  )}
                </div>
              );
            }}
            displayValue={(selected: any) => {
              let display: string[] = [];
              selected
                .sort((a: number, b: number) => a - b)
                .forEach((element: number) => {
                  display.push(
                    options.find((it: any) => it.value === element)?.label ?? ''
                  );
                });
              return display.join(', ');
            }}
          />
        )}
      />
    </FormGroup>
  );
}
