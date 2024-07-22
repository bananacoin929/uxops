import { Input, Select } from 'rizzui';
import cn from '@utils/class-names';

import FormGroup from '@/app/shared/from-group-onboarding';

import { useState } from 'react';

const options = [
  { label: 'Eastern Time (US & Canada)', value: 'EST' },
  { label: 'Pacific Time (US & Canada)', value: 'PST' },
];

export default function MainOfficeTimeZone({
  className,
}: {
  className?: string;
}) {
  const [value, setValue] = useState([]);

  return (
    <FormGroup
      title="Main Office Timezone"
      description="Main Office Timezone"
      className={cn(className)}
    >
      <Select
        className={'col-span-full'}
        multiple
        value={value}
        options={options}
        onChange={setValue}
      />
    </FormGroup>
  );
}
