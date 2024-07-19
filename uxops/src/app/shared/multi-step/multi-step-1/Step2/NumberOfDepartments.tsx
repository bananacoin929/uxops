import { Input } from 'rizzui';
import cn from '@utils/class-names';

import FormGroup from '@/app/shared/from-group-onboarding';



export default function NumberOfDepartments({
  className,
}: {
  className?: string;
}) {

  return (
    <FormGroup
      title="Number Of Departments"
      description="Number Of Departments"
      className={cn(className)}
    >
      <Input className="col-span-full" type='number'/>
    </FormGroup>
  );
}
