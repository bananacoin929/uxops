import { Input, Select } from 'rizzui';
import cn from '@utils/class-names';

import FormGroup from '@/app/shared/from-group-onboarding';
import { useState } from 'react';

const options = [
  { label: 'Microsoft', value: 'EST' },
  { label: 'Google', value: 'PST' },
];

export default function PublicCloud({
  className,
}: {
  className?: string;
}) {
  const [value, setValue] = useState([]);

  return (
    <FormGroup
      title="Public Cloud"
      description="Public Cloud"
      className={cn(className)}
    >
      <Select
        className={'col-span-full'}
        value={value}
        options={options}
        onChange={setValue}
      />
    </FormGroup>
  );
}
