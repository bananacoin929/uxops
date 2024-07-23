'use client';

import { useAtom } from 'jotai';
import { atomWithReset, atomWithStorage } from 'jotai/utils';
import cn from '@utils/class-names';
import Footer from '@/app/(dashboard)/onboarding/footer';
import StepZero from '@/app/(dashboard)/onboarding/Steps/step-0';
import StepOne from '@/app/(dashboard)/onboarding/Steps/step-1';
import StepTwo from '@/app/(dashboard)/onboarding/Steps/step-2';
import StepThree from '@/app/(dashboard)/onboarding/Steps/step-3';
import StepFour from '@/app/(dashboard)/onboarding/Steps/step-4';
import StepFive from '@/app/(dashboard)/onboarding/Steps/step-5';
import StepSix from '@/app/(dashboard)/onboarding/Steps/step-6';
import Congratulations from '@/app/(dashboard)/onboarding/Steps/congratulations';
import {
  DepartDetailSchema,
  DepartSchema,
  LocationSchema,
  ProductSchema,
} from '@/validators/onboarding-form.schema';

type FormDataType = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_name: string;
  industry: string;
  main_location: string;
  secondary_location: string;
  add_locations: LocationSchema[];
  total_employees: number;
  data_locations: LocationSchema[];
  public_cloud_provider: string[];
  departments: string[] | undefined;
  all_departments: DepartSchema[];
  departments_details: DepartDetailSchema[] | undefined;
  products: ProductSchema[];
};

export const initialFormData = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  company_name: '',
  industry: '',
  main_location: '',
  secondary_location: '',
  add_locations: [],
  total_employees: 0,
  data_locations: [],
  public_cloud_provider: [],

  departments: [],
  all_departments: [
    {
      id: 1,
      name: 'Executive',
      selected: false,
    },
    {
      id: 2,
      name: 'Human Resources',
      selected: false,
    },
    {
      id: 3,
      name: 'Finance',
      selected: false,
    },
    {
      id: 4,
      name: 'Accounting',
      selected: false,
    },
    {
      id: 5,
      name: 'Operations',
      selected: false,
    },
    {
      id: 6,
      name: 'Marketing',
      selected: false,
    },
    {
      id: 7,
      name: 'Sales',
      selected: false,
    },
    {
      id: 8,
      name: 'Information Technology',
      selected: false,
    },
    {
      id: 9,
      name: 'Research & Development',
      selected: false,
    },
    {
      id: 10,
      name: 'Legal',
      selected: false,
    },
    {
      id: 11,
      name: 'Administrative',
      selected: false,
    },
    {
      id: 12,
      name: 'General Counsel',
      selected: false,
    },
    {
      id: 13,
      name: 'Public Relations',
      selected: false,
    },
    {
      id: 14,
      name: 'Corporate Communications',
      selected: false,
    },
    {
      id: 15,
      name: 'Business Development',
      selected: false,
    },
  ],
  departments_details: [],
  products: [
    {
      id: 1,
      vendor: {
        name: 'M365 Apps for enterprise',
        logo: '/placeholder.svg',
      },
      category: 'Office Applications',
      name: 'Microsoft Office 365',
      description:
        'A subscription service offering access to various Microsoft tools and applications, including Word, Excel, PowerPoint, and Outlook.',
      isActive: false,
      department: [],
    },
    {
      id: 2,
      vendor: {
        name: 'Microsoft',
        logo: '/placeholder.svg',
      },
      category: 'Office Applications',
      name: 'Teams',
      description:
        'A platform for communication and collaboration, offering features like chat, video meetings, and file storage.',
      isActive: false,
      department: [],
    },
    {
      id: 3,
      vendor: {
        name: 'Microsoft',
        logo: '/placeholder.svg',
      },
      category: 'Office Applications',
      name: 'Microsoft Outlook',
      description:
        'A personal information manager from Microsoft, primarily used as an email application.',
      isActive: true,
      department: [],
    },
    {
      id: 4,
      vendor: {
        name: 'Microsoft',
        logo: '/placeholder.svg',
      },
      category: 'Development',
      name: 'Microsoft Edge',
      description:
        'A web browser developed by Microsoft, available on various platforms including Windows, macOS, iOS, and Android.',
      isActive: false,
      department: [],
    },
    {
      id: 5,
      vendor: {
        name: 'Microsoft',
        logo: '/placeholder.svg',
      },
      category: 'Office Applications',
      name: 'Microsoft Project',
      description:
        'A project management software to help project managers with planning, resource allocation, progress tracking, and budget management.',
      isActive: true,
      department: [],
    },
    {
      id: 6,
      vendor: {
        name: 'Microsoft',
        logo: '/placeholder.svg',
      },
      category: 'Office Applications',
      name: 'Microsoft Visio',
      description:
        'A project management software to help project managers with planning, resource allocation, progress tracking, and budget management.',
      isActive: true,
      department: [],
    },
  ],
};

export const formDataAtom = atomWithStorage<FormDataType>(
  'onboardingStepForm',
  initialFormData
);

export enum Step {
  StepZero,
  StepOne,
  StepTwo,
  StepThree,
  StepFour,
  StepFive,
  StepSix,
  StepSeven,
}

const firstStep = Step.StepZero;
export const stepperAtomOne = atomWithReset<Step>(firstStep);

export function useStepperOne() {
  const [step, setStep] = useAtom(stepperAtomOne);

  // function gotoStep(step: Step) {
  //   setStep(step);
  // }
  function gotoNextStep() {
    setStep(step + 1);
  }
  function gotoPrevStep() {
    setStep(step > firstStep ? step - 1 : step);
  }
  function resetStepper() {
    setStep(firstStep);
  }
  return {
    step,
    setStep,
    // gotoStep,
    resetStepper,
    gotoNextStep,
    gotoPrevStep,
  };
}

const MAP_STEP_TO_COMPONENT = {
  [Step.StepZero]: StepZero,
  [Step.StepOne]: StepOne,
  [Step.StepTwo]: StepTwo,
  [Step.StepThree]: StepThree,
  [Step.StepFour]: StepFour,
  [Step.StepFive]: StepFive,
  [Step.StepSix]: StepSix,
  [Step.StepSeven]: Congratulations,
};

export const stepOneTotalSteps = Object.keys(MAP_STEP_TO_COMPONENT).length;

export default function MultiStepFormOne() {
  const [step] = useAtom(stepperAtomOne);
  const Component = MAP_STEP_TO_COMPONENT[step];

  return (
    <>
      <div
        className={cn(
          'mx-auto grid w-full max-w-screen-2xl grid-cols-12 place-content-center gap-6 px-5 py-10 @3xl:min-h-[calc(100vh-10rem)] @5xl:gap-8 @6xl:gap-16 xl:px-7'
        )}
      >
        <Component />
      </div>
      <Footer />
    </>
  );
}
