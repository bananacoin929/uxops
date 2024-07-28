'use client';

const Steps = [
  {
    name: 'Admin Info',
    description:
      'We’ll ask you a few more questions about your organization admin info.',
  },
  {
    name: 'Organization Info',
    description: 'We’ll ask you a few more question about organization.',
  },
  {
    name: 'Department Info',
    description:
      'We’ll ask you a few more question about your organization departments.',
  },
  {
    name: 'Products',
    description: 'We’ll ask you a few more question about products.',
  },
];

export default function StepZero() {
  return (
    <>
      <div className=" w-0 @5xl:col-span-3" />
      <div className="col-span-full flex items-center justify-center @5xl:col-span-6">
        <form className="flex-grow rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0">
          <p className="mb-6 text-2xl font-bold">
            This is our onboarding and we’ll ask you some questions.
          </p>
          <div className="col-span-full grid gap-4 @4xl:gap-6">
            {Steps.map((step, index) => (
              <div
                key={index}
                className=" rounded-xl border-[1px] border-muted px-4 py-5"
              >
                <article>
                  <h4 className="text-base font-semibold @5xl:text-xl">
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
