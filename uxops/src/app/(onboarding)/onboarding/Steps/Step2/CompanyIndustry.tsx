import { Select } from 'rizzui';
import cn from '@utils/class-names';
import { useFormContext, Controller } from 'react-hook-form';
import FormGroup from '@/app/shared/from-group-onboarding';

const typeOption = [
  {
    value: 1,
    label: 'Digital Product',
  },
  {
    value: 2,
    label: 'Physical Product',
  },
];

export default function CompanyIndustry({ className }: { className?: string }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Company Industry"
      description="Select your company industry"
      className={cn(className)}
    >
      <Controller
        name="industry_id"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Select
            className="col-span-full"
            dropdownClassName="!z-0"
            placeholder="Select the company industry"
            options={typeOption}
            value={value}
            onChange={onChange}
            error={errors?.industry?.message as string}
            getOptionValue={(option) => option.value}
            displayValue={(selected: any) =>
              typeOption?.find((p: any) => p.value === selected)?.label ?? ''
            }
          />
        )}
      />
    </FormGroup>
  );
}
