'use client';

import { useStepperOne } from '@/app/(dashboard)/onboarding/Steps';

const Steps = [
  {
    name: 'Admin Info',
    description:
      'We ’ll ask you a few more questions about your organization admin info',
  },
  {
    name: 'Organization Info',
    description: 'We ’ll ask you a few more question about organization.',
  },
  {
    name: 'Department Info',
    description:
      'We ’ll ask you a few more question about your organization departments.',
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
      <div className=" w-0 @5xl:col-span-3" />
      <div className="col-span-full flex items-center justify-center @5xl:col-span-6">
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={onSubmit}
          className="flex-grow rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0"
        >
          <h1 className="mb-4 text-2xl font-bold">Introduction</h1>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            This is our onboarding and we’ll ask you some questions.
          </p>
          <div className="col-span-full grid gap-4 @4xl:gap-6">
            {Steps.map((step, index) => (
              <div
                key={index}
                className=" rounded-xl border-[1px] border-muted px-3 py-4"
              >
                <article>
                  <h4 className="text-sm font-semibold @5xl:text-base">
                    {step.name}
                  </h4>
                  <p>{step.description}</p>
                </article>
              </div>
            ))}
          </div>
        </form>
      </div>
      <div className=" w-0 @5xl:col-span-3" />
    </>
  );
}
