'use client';

import {
  useStepperOne,
} from '@/app/(dashboard)/onboarding/Steps';
import { AdvancedRadio, RadioGroup } from 'rizzui';

const Steps = [
  {
    name: 'Admin Info',
    description: 'We ’ll ask you a few more questions about your organization',
  },
  {
    name: 'Department Info',
    description: 'We ’ll ask you a few more question about your organization departments.',
  },
  {
    name: 'Products',
    description: 'We ’ll ask you a few more question about products.',
  },
];

export default function StepZero() {
  const { step, gotoNextStep } = useStepperOne();

  const onSubmit = () => {
    gotoNextStep();
  };

  return (
    <>
      <div className=" w-0 @5xl:col-span-1" />
      <div className="col-span-full flex items-center justify-center @5xl:col-span-10">
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={onSubmit}
          className="flex-grow rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0"
        >
          <h1 className="mb-4 text-2xl font-bold">Introduction</h1>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            This is our onboarding and we’ll ask you some questions.
          </p>
          <RadioGroup
            value=""
            setValue={() => {}}
            className="col-span-full grid gap-4 @4xl:gap-6"
          >
            {Steps.map((step, index) => (
              <AdvancedRadio
                key={index}
                className=" [&_.rizzui-advanced-radio]:flex [&_.rizzui-advanced-radio]:justify-between [&_.rizzui-advanced-radio]:gap-7 [&_.rizzui-advanced-radio]:px-6 [&_.rizzui-advanced-radio]:py-6"
                inputClassName="[&~span]:border-0 [&~span]:ring-1 [&~span]:ring-gray-200 [&~span:hover]:ring-primary [&:checked~span:hover]:ring-primary [&:checked~span]:border-1 [&:checked~.rizzui-advanced-radio]:ring-2 [&~span_.icon]:opacity-0 [&:checked~span_.icon]:opacity-100"
              >
                <article>
                  <h4 className="text-sm font-semibold @5xl:text-base">
                    {step.name}
                  </h4>
                  <p>{step.description}</p>
                </article>
              </AdvancedRadio>
            ))}
          </RadioGroup>
        </form>
      </div>
      <div className=" w-0 @5xl:col-span-1" />
    </>
  );
}
