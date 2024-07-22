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
import { AdvancedRadio, FieldError, Input, RadioGroup } from 'rizzui';
import {
  formDataAtom,
  useStepperOne,
} from '@/app/(dashboard)/onboarding/Steps';
import {
  formStep1Schema,
  FormStep1Schema,
} from '@/validators/onboarding-form.schema';
import { PhoneNumber } from '@ui/phone-input';

export default function StepTwo() {
  const { step, gotoNextStep } = useStepperOne();
  const [formData, setFormData] = useAtom(formDataAtom);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormStep1Schema>({
    resolver: zodResolver(formStep1Schema),
    defaultValues: {
      first_name: formData.first_name,
      last_name: formData.last_name,
      email: formData.email,
      phone: formData.phone,
    },
  });

  useEffect(() => {
    if (errors.first_name) {
      toast.error(errors.first_name.message as string);
    }
    if (errors.last_name) {
      toast.error(errors.last_name.message as string);
    }
    console.log('**********', errors);
    if (errors.email) {
      toast.error(errors.email.message as string);
    }
    if (errors.phone) {
      toast.error(errors.phone.message as string);
    }
  }, [errors]);

  const onSubmit: SubmitHandler<FormStep1Schema> = (data) => {
    console.log('data', data);
    setFormData((prev) => ({
      ...prev,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
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
            <h1 className="mb-4 text-2xl font-bold">
              Organization Administrator Details
            </h1>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Please enter your organizational administrator details.
            </p>
            <div className="flex flex-col gap-5">
              <Controller
                name="first_name"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div className="flex items-center justify-between rounded-md border border-muted px-4 py-2.5">
                    <span>First Name</span>
                    <Input
                      defaultValue={value}
                      placeholder="James"
                      onChange={onChange}
                    />
                  </div>
                )}
              />
              <Controller
                name="last_name"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div className="flex items-center justify-between rounded-md border border-muted px-4 py-2.5">
                    <span>Last Name</span>
                    <Input
                      defaultValue={value}
                      placeholder="Potter"
                      onChange={onChange}
                    />
                  </div>
                )}
              />
              <Controller
                name="email"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div className="flex items-center justify-between rounded-md border border-muted px-4 py-2.5">
                    <span>Email</span>
                    <Input
                      defaultValue={value}
                      placeholder="kenzi.lawson@example.com"
                      onChange={onChange}
                    />
                  </div>
                )}
              />
              <Controller
                name="phone"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <div className="flex items-center justify-between rounded-md border border-muted px-4 py-2.5">
                    <span>Phone Number</span>
                    <PhoneNumber
                      country="us"
                      value={value}
                      onChange={onChange}
                      className="rtl:[&>.selected-flag]:right-0"
                      inputClassName="rtl:pr-12"
                      buttonClassName="rtl:[&>.selected-flag]:right-2 rtl:[&>.selected-flag_.arrow]:-left-6"
                    />
                  </div>
                )}
              />
            </div>
          </>
        </form>
      </div>
      <div className=" w-0 @5xl:col-span-3" />
    </>
  );
}
