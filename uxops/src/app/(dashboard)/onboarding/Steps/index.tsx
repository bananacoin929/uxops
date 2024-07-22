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
import StepSeven from '@/app/(dashboard)/onboarding/Steps/step-7';
import Congratulations from '@/app/(dashboard)/onboarding/Steps/congratulations';
import { FileSchema } from '@/validators/common-rules';
import { DepartSchema } from '@/validators/onboarding-form.schema';

type FormDataType = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  departments: string[] | undefined;
  all_departments: DepartSchema[];

  situation: string;
  companyInfo: any;

  propertyType: string;
  placeType: string;
  address: string | undefined;
  lat: number | undefined;
  lng: number | undefined;
  guests: number | undefined;
  bedrooms: number | undefined;
  beds: number | undefined;
  bedroomLock: string;
  guestType: string;
  indoorAmenities: string[] | undefined;
  outdoorAmenities: string[] | undefined;
  propertyName: string;
  propertyDescription: string | undefined;
  priceRange: number[] | undefined;
  photos: FileSchema[] | undefined;
};

export const initialFormData = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  departments: [],
  all_departments: [
    {
      id: 1,
      name: 'Executive',
      value: 'xecutive',
      selected: false,
    },
    {
      id: 2,
      name: 'Human Resources',
      value: 'human_resources',
      selected: false,
    },
    {
      id: 3,
      name: 'Finance',
      value: 'finance',
      selected: false,
    },
    {
      id: 4,
      name: 'Accounting',
      value: 'accounting',
      selected: false,
    },
    {
      id: 5,
      name: 'Operations',
      value: 'operations',
      selected: false,
    },
    {
      id: 6,
      name: 'Marketing',
      value: 'marketing',
      selected: false,
    },
    {
      id: 7,
      name: 'Sales',
      value: 'sales',
      selected: false,
    },
    {
      id: 8,
      name: 'Information Technology',
      value: 'information_technology',
      selected: false,
    },
    {
      id: 9,
      name: 'Research & Development',
      value: 'research_evelopment',
      selected: false,
    },
    {
      id: 10,
      name: 'Legal',
      value: 'legal',
      selected: false,
    },
    {
      id: 11,
      name: 'Administrative',
      value: 'administrative',
      selected: false,
    },
    {
      id: 12,
      name: 'General Counsel',
      value: 'general_counsel',
      selected: false,
    },
    {
      id: 13,
      name: 'Public Relations',
      value: 'public_relations',
      selected: false,
    },
    {
      id: 14,
      name: 'Corporate Communications',
      value: 'corporate_communications',
      selected: false,
    },
    {
      id: 15,
      name: 'Business Development',
      value: 'business_development',
      selected: false,
    },
  ],

  situation: '',
  companyInfo: {},

  propertyType: '',
  placeType: '',
  address: '',
  lat: undefined,
  lng: undefined,
  guests: undefined,
  bedrooms: undefined,
  beds: undefined,
  bedroomLock: '',
  guestType: '',
  indoorAmenities: [],
  outdoorAmenities: [],
  propertyName: '',
  propertyDescription: '',
  priceRange: undefined,
  photos: undefined,
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
  // StepSix,
  // StepSeven,
  StepEight,
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
  // [Step.StepSix]: StepSix,
  // [Step.StepSeven]: StepSeven,
  [Step.StepEight]: Congratulations,
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
