import cn from '@utils/class-names';
import Autocomplete from '@components/google-map/autocomplete';

import { PiMapPin } from 'react-icons/pi';
import FormGroup from '@/app/shared/from-group-onboarding';
import { Controller, useFormContext } from 'react-hook-form';

export default function MainLocation({ className }: { className?: string }) {
  const handlePlaceSelect = (place: any) => {
    setValue('main_location', place.address);
  };

  const handleSecondaryPlaceSelect = (place: any) => {
    setValue('secondary_location', place.address);
  };

  const {
    setValue,
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <FormGroup
      title="Main Location"
      description="Input your main location"
      className={cn(className)}
    >
      <Controller
        name="main_location"
        control={control}
        render={({ field: { value } }) => {
          return (
            <div className="relative col-span-full">
              <Autocomplete
                apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string}
                onPlaceSelect={handlePlaceSelect}
                spinnerClassName="hidden"
                hideMap
                value={value}
                inputProps={{
                  prefix: <PiMapPin className="h-5 w-5" />,
                  placeholder: 'City, Neighborhood, ZIP, Address',
                  inputClassName:
                    'dark:[&_input::placeholder]:!text-gray-600 [&_input]:pe-3 [&_input]:ps-10',
                  prefixClassName: 'absolute start-3',
                  className: '[&_label>div]:p-0',
                  clearable: false,
                  label: 'Main Location',
                  error: errors.main_location?.message as string,
                }}
                mapClassName="rounded-lg"
              />
            </div>
          );
        }}
      />
      <Controller
        name="secondary_location"
        control={control}
        render={({ field: { value } }) => (
          <div className="relative col-span-full">
            <Autocomplete
              apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY as string}
              onPlaceSelect={handleSecondaryPlaceSelect}
              spinnerClassName="hidden"
              hideMap
              value={value}
              inputProps={{
                prefix: <PiMapPin className="h-5 w-5" />,
                placeholder: 'City, Neighborhood, ZIP, Address',
                inputClassName:
                  'dark:[&_input::placeholder]:!text-gray-600 [&_input]:pe-3 [&_input]:ps-10',
                prefixClassName: 'absolute start-3',
                className: '[&_label>div]:p-0',
                clearable: false,
                label: 'Secondary Location (Optional)',
                error: errors.secondary_location?.message as string,
              }}
              mapClassName="rounded-lg"
            />
          </div>
        )}
      />
    </FormGroup>
  );
}
