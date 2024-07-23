import { Select } from 'rizzui';
import cn from '@utils/class-names';
import { useFormContext, Controller } from 'react-hook-form';
import FormGroup from '@/app/shared/from-group-onboarding';
import { useState } from 'react';

const options = [
  { label: 'Amazon', value: 'Amazon' },
  { label: 'Microsoft', value: 'Microsoft' },
  { label: 'Google', value: 'Google' },
  { label: 'Other', value: 'Other' },
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
            getOptionValue={(option) => option.value}
            displayValue={(selected: any) => {
              return selected.join(', ');
            }}
          />
        )}
      />
    </FormGroup>
  );
}
