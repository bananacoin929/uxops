import { useFormContext } from 'react-hook-form';
import { Button, Input } from 'rizzui';
import cn from '@utils/class-names';
import WidgetCard from '@components/cards/widget-card';

export const widgetData = [
  {
    name: 'Main Office Location',
    color: '#3872FA',
  },
  {
    name: 'Secondary Office Location',
    color: '#3872FA',
  },
];
import FormGroup from '@/app/shared/from-group-onboarding';

export default function OfficeLocation({ className }: { className?: string }) {
  return (
    <FormGroup
      title="Office Location"
      description="Input your office locations"
      className={cn(className)}
    >
      {widgetData.map((item) => (
        <WidgetCard
          key={item.name}
          title={item.name}
          rounded="lg"
          descriptionClassName="text-gray-500 mt-1.5"
          className={'col-span-4'}
        >
          <div className="mt-3 grid w-full grid-cols-1 justify-around gap-6 @sm:py-2 @7xl:gap-8">
            <div className="grid grid-cols-2 gap-2">
              <Input
                label="Region"
                placeholder="Region"
                className="col-span-full"
              />
              <Input
                label="State"
                placeholder="State"
                className="col-span-full"
              />
              <Input
                label="Address"
                placeholder="Address"
                className="col-span-full"
              />
            </div>
          </div>
        </WidgetCard>
      ))}
      <Button className=' col-span-full'>Add Location</Button>
    </FormGroup>
  );
}
