'use client';

import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Input } from 'rizzui';
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
    if (errors.email) {
      toast.error(errors.email.message as string);
    }
    if (errors.phone) {
      toast.error(errors.phone.message as string);
    }
  }, [errors]);

  const onSubmit: SubmitHandler<FormStep1Schema> = (data) => {
    setFormData((prev) => ({
      ...prev,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      phone: data.phone,
    }));
    gotoNextStep({});
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
                  <div className="flex items-center rounded-md border border-muted px-4 py-2.5">
                    <span className="w-1/4">First Name</span>
                    <Input
                      className="w-3/4"
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
                    <span className="w-1/4">Last Name</span>
                    <Input
                      className="w-3/4"
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
                    <span className="w-1/4">Email</span>
                    <Input
                      className="w-3/4"
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
                    <span className="w-1/4">Phone Number</span>
                    <PhoneNumber
                      country="us"
                      value={value}
                      onChange={onChange}
                      className="w-3/4 rtl:[&>.selected-flag]:right-0"
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
