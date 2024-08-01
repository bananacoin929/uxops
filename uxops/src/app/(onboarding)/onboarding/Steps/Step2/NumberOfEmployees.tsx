import { Input } from 'rizzui';
import cn from '@utils/class-names';
import { Controller, useFormContext } from 'react-hook-form';
import FormGroup from '@/app/shared/from-group-onboarding';

export default function TotalNumberOfEmployees({
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
      title="Total Number of Employees"
      description="Number of total employees"
      className={cn(className)}
    >
      <Controller
        name="total_employees"
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            placeholder="1000"
            className="col-span-full"
            type="number"
            value={value}
            onChange={(e) => {
              onChange(parseInt(e.target.value));
            }}
            error={errors.total_employees?.message as string}
          />
        )}
      />
    </FormGroup>
  );
}
