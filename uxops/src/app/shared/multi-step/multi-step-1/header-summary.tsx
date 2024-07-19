'use client';

import {
  stepOneTotalSteps,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import cn from '@utils/class-names';

interface HeaderSummaryProps {
  title: string;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export default function HeaderSummary({
  title,
  className,
  titleClassName,
}: HeaderSummaryProps) {
  const { step } = useStepperOne();
  return (
    <div className={cn('flex items-center gap-5 text-base text-white', className)}>
      <div className="flex">
        <span className="me-2 mt-2.5 h-0.5 w-11 bg-white/[.35]" /> Step{' '}
        {step + 1} of {stepOneTotalSteps - 1}
      </div>
      <article className="">
        <h1
          className={cn(
            'text-xl text-white @3xl:text-2xl @7xl:text-3xl @[113rem]:text-4xl',
            titleClassName
          )}
        >
          {title}
        </h1>
      </article>
    </div>
  );
}
