'use client';

import { useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import { useResetAtom } from 'jotai/utils';
import { PiArrowUpLight, PiCheck } from 'react-icons/pi';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from 'rizzui';
import cn from '@utils/class-names';
import {
  formDataAtom,
  initialFormData,
  isClickedFooterSubmitButtonAtom,
  stepperAtomOne,
  useStepperOne,
} from '@/app/(onboarding)/onboarding/Steps';

interface FooterProps {
  formId?: number;
  className?: string;
  isLoading?: boolean;
}

function buttonLabel(formId?: number) {
  if (formId === 5) {
    return (
      <>
        Submit <PiCheck />
      </>
    );
  }
  if (formId === 6) {
    return 'Back to Home';
  }
  return (
    <>
      Continue <PiArrowUpLight className="rotate-90" />
    </>
  );
}

export default function Footer({ isLoading, className }: FooterProps) {
  const { push } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const setFormData = useSetAtom(formDataAtom);
  const [, setIsClickedFooterSubmitButton] = useAtom(isClickedFooterSubmitButtonAtom)
  const { step, gotoPrevStep } = useStepperOne();

  const resetLocation = useResetAtom(stepperAtomOne);

  useEffect(() => {
    resetLocation();
    setFormData(initialFormData);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, searchParams]);

  function buttonAttr() {
    if (step === 6) {
      return {
        onClick: () => push('/'),
      };
    }
    return { form: `rhf-${step?.toString()}` };
  }

  return (
    <footer
      className={cn(
        ' flex w-full items-center justify-between gap-3 px-4 py-5 lg:px-8 4xl:px-10 max-w-[1280px]',
        className
      )}
    >
      {step > 0 && step < 7 && (
        <Button
          rounded="pill"
          variant="outline"
          onClick={gotoPrevStep}
          className="gap-1 border-white  text-white backdrop-blur-lg hover:border-white hover:bg-white hover:text-black"
        >
          <PiArrowUpLight className="-rotate-90" />
          Back
        </Button>
      )}
      <Button
        isLoading={isLoading}
        disabled={isLoading}
        rounded="pill"
        {...buttonAttr()}
        type={'submit'}
        onClick={() => setIsClickedFooterSubmitButton(true)}
        className="ml-auto gap-1 bg-primary backdrop-blur-lg dark:bg-gray-0/[.35] dark:text-white dark:active:enabled:bg-gray-0/75"
      >
        {buttonLabel(step)}
      </Button>
    </footer>
  );
}
