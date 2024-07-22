'use client';

// import Link from 'next/link';
// import Image from 'next/image';
import { FiSave } from 'react-icons/fi';
import { Button } from 'rizzui';
import cn from '@utils/class-names';
import { useMedia } from '@hooks/use-media';
// import { siteConfig } from '@/config/site.config';
// import FormSummary from '@/app/shared/multi-step/multi-step-1/form-summary';
import {
  // stepOneTotalSteps,
  useStepperOne,
} from '@/app/(dashboard)/onboarding/Steps';
import HeaderSummary from '@/app/(dashboard)/onboarding/Steps/header-summary';

interface FooterProps {
  className?: string;
}

export default function Header({ className }: FooterProps) {
  const isMobile = useMedia('(max-width: 767px)', false);
  const { step } = useStepperOne();

  let title: any = {
    0: 'Introduction',
    1: 'Organizational Administrator Details',
    2: 'Organization Info',
    3: 'Company’s Departments Info',
    4: 'Departments Details',
    5: 'Products Info',
  };
  console.log(step, typeof step);
  return (
    <header
      className={cn(
        'flex w-full items-center justify-between px-4 py-5 md:h-20 md:px-5 lg:px-8 4xl:px-10',
        className
      )}
    >
      {/* <Link href={'/'}>
        <Image
          src={isMobile ? siteConfig.icon : siteConfig.logo}
          alt={siteConfig.title}
          className="invert"
          priority
        />
        UxOps
      </Link> */}
      <HeaderSummary descriptionClassName="@7xl:me-10" title={title[step]} />
      <div className="flex items-center gap-2">
        {/* <Button variant="text" className="text-white hover:enabled:text-white">
          Questions?
        </Button> */}
        <Button
          rounded="pill"
          variant="outline"
          className="gap-2 whitespace-nowrap border-white text-white hover:border-white hover:bg-white hover:text-black"
        >
          <FiSave className="h-4 w-4" />
          Save & Exit
        </Button>
      </div>
    </header>
  );
}
