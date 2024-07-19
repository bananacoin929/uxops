// import Image from 'next/image';
// import { useForm } from 'react-hook-form';
// import homeFront from '@public/home-front.png';
// import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
// import { useStepperOne } from '@/app/shared/multi-step/multi-step-1';

// export default function StepOne() {
//   const { step, gotoNextStep } = useStepperOne();

//   const { handleSubmit } = useForm();

//   const onSubmit = () => {
//     gotoNextStep();
//   };

//   return (
//     <>
//       <div className="col-span-full flex flex-col justify-center @4xl:col-span-5">
//         <FormSummary
//           descriptionClassName="@7xl:me-10"
//           title="Tell us about your place"
//           description="In this step, we'll ask you which type of property you have and if guests will book the entire place or just a room"
//         />
//       </div>

//       <form
//         id={`rhf-${step.toString()}`}
//         onSubmit={handleSubmit(onSubmit)}
//         className="col-span-full grid aspect-[4/3] gap-4 @3xl:grid-cols-12 @4xl:col-span-7 @5xl:gap-5 @7xl:gap-8"
//       >
//         <Image
//           src={homeFront}
//           alt="home front part 1"
//           className="mt-auto rounded-lg object-cover object-left-top @3xl:col-span-4 @3xl:h-96 @6xl:h-5/6"
//         />
//         <Image
//           src={homeFront}
//           alt="home front part 2"
//           className="my-auto hidden rounded-lg object-cover @3xl:col-span-4 @3xl:block @3xl:h-96 @6xl:h-5/6"
//         />
//         <Image
//           src={homeFront}
//           alt="home front part 3"
//           className="mb-auto hidden rounded-lg object-cover object-right-bottom @3xl:col-span-4 @3xl:block @3xl:h-96 @6xl:h-5/6"
//         />
//       </form>
//     </>
//   );
// }

'use client';

import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { AdvancedRadio, RadioGroup } from 'rizzui';
import {
  formDataAtom,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import HouseIcon from '@components/icons/house';
import RoomSharedIconColor from '@components/icons/room-shared-color';
import RoomSingleIconColor from '@components/icons/room-single-color';
import {
  situationSchema,
  SituationSchema,
} from '@/validators/multistep-form.schema';

const places: {
  value: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}[] = [
  {
    value: '1',
    name: 'Company',
    description:
      'A company admin can create and manage teams within the company.',
    icon: <HouseIcon />,
  },
  {
    value: '2',
    name: 'Team',
    description: `A team lead can manage their team members, assign tasks, etc.`,
    icon: <RoomSingleIconColor />,
  },
  {
    value: '3',
    name: 'Empolyee',
    description: `An employee or team member can view their details, tasks, and interact with other team members.
`,
    icon: <RoomSharedIconColor />,
  },
];

export default function StepTwo() {
  const { step, gotoNextStep } = useStepperOne();
  const [formData, setFormData] = useAtom(formDataAtom);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<SituationSchema>({
    resolver: zodResolver(situationSchema),
    defaultValues: {
      situation: formData.situation,
    },
  });

  useEffect(() => {
    if (errors.situation) {
      toast.error(errors.situation.message as string);
    }
  }, [errors]);

  const onSubmit: SubmitHandler<SituationSchema> = (data) => {
    console.log('data', data);
    setFormData((prev) => ({
      ...prev,
      situation: data.situation,
    }));
    gotoNextStep();
  };

  return (
    <>
      <div className=" w-0 @5xl:col-span-3" />
      <div className="col-span-full flex items-center justify-center @5xl:col-span-6">
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={handleSubmit(onSubmit)}
          className="flex-grow rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0"
        >
          <>
            <Controller
              name="situation"
              control={control}
              render={({ field: { value, onChange } }) => (
                <RadioGroup
                  value={value}
                  setValue={onChange}
                  className="col-span-full grid gap-4 @4xl:gap-6"
                >
                  {places.map((place) => (
                    <AdvancedRadio
                      key={place.value}
                      value={place.value}
                      className=" [&_.rizzui-advanced-radio]:flex [&_.rizzui-advanced-radio]:justify-between [&_.rizzui-advanced-radio]:gap-7 [&_.rizzui-advanced-radio]:px-6 [&_.rizzui-advanced-radio]:py-6"
                      inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-radio]:ring-2 [&~span_.icon]:opacity-0 [&:checked~span_.icon]:opacity-100"
                    >
                      <article>
                        <h4 className="text-sm font-semibold @5xl:text-base">
                          {place.name}
                        </h4>
                        <p>{place.description}</p>
                      </article>
                      <span className="h-8 min-w-[32px] [&_svg]:w-8">
                        {place.icon}
                      </span>
                    </AdvancedRadio>
                  ))}
                </RadioGroup>
              )}
            />
          </>
        </form>
      </div>
      <div className=" w-0 @5xl:col-span-3" />
    </>
  );
}
