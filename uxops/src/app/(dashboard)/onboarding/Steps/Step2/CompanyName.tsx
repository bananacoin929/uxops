import { Input } from 'rizzui';
import cn from '@utils/class-names';
import { useFormContext } from 'react-hook-form';
import FormGroup from '@/app/shared/from-group-onboarding';

export default function CompanyName({ className }: { className?: string }) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Company Name"
      description="Input your company name"
      className={cn(className)}
    >
      <Input
        className="col-span-full"
        placeholder="Company Name"
        {...register('company_name')}
        error={errors.company_name?.message as string}
      />
    </FormGroup>
  );
}
