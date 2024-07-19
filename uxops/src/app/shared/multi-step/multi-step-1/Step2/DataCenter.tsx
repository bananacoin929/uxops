import { Input, Select } from 'rizzui';
import cn from '@utils/class-names';

import FormGroup from '@/app/shared/from-group-onboarding';

import { useState } from 'react';

const options = [
  { label: 'Eastern Time (US & Canada)', value: 'EST' },
  { label: 'Pacific Time (US & Canada)', value: 'PST' },
];

export default function DataCenter({ className }: { className?: string }) {
  const [value, setValue] = useState([]);

  return (
    <FormGroup
      title="Data Center"
      description="Data Center"
      className={cn(className)}
    >
      <Input className="col-span-full" />
    </FormGroup>
  );
}
