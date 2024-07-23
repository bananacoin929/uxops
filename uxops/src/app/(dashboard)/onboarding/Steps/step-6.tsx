'use client';

import { useAtom } from 'jotai';
import { SubmitHandler } from 'react-hook-form';
import {
  formDataAtom,
  useStepperOne,
} from '@/app/(dashboard)/onboarding/Steps';

export default function StepTwo() {
  const [formData, setFormData] = useAtom(formDataAtom);
  const { step, gotoNextStep } = useStepperOne();

  const onSubmit = () => {
    gotoNextStep();
  };

  return (
    <>
      <div className=" w-0 @5xl:col-span-3" />
      <div className="col-span-full flex items-center justify-center @5xl:col-span-6 @6xl:col-span-6">
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={onSubmit}
          className="grid flex-grow gap-6 rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0"
        >
          <>
            <h1 className="mb-4 text-2xl font-bold">
              That wasn’t so bad, right?
            </h1>
            <article className="flex w-full gap-5">
              <h4 className="text-sm font-semibold @5xl:text-base">
                Next steps:
              </h4>
              <div className="flex flex-col gap-3">
                <p>1. Schedule a time with your account manager</p>
                <p>2. Watch how to videos</p>
              </div>
            </article>
            <h4 className="flex w-full items-center justify-center text-sm font-semibold @5xl:text-base">
              Thank you!
            </h4>
          </>
        </form>
      </div>
      <div className=" w-0 @5xl:col-span-3" />
    </>
  );
}
