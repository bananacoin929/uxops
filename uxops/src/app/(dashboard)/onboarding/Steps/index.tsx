'use client';

import { atom, useAtom } from 'jotai';
import { atomWithReset, atomWithStorage } from 'jotai/utils';
import cn from '@utils/class-names';
import Header from '@/app/(dashboard)/onboarding/header';
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
  RealLocationSchema,
} from '@/validators/onboarding-form.schema';
import { useState } from 'react';
import { createOrganization } from '@/utils/organizations';
import { useUserProfile } from '@/lib/providers/user-profile-provider';
import { createOrgAdmin } from '@/utils/org_admins';
import { createOrgDepartment } from '@/utils/org_departments';
import { createOrgCloudProvider } from '@/utils/org_cloud_providers';
import { createDepDetail } from '@/utils/dep_details';
import { createDepDetailLocation } from '@/utils/dep_detail_locations';
import { createOrgLocation } from '@/utils/org_locations';
import { createOrgProduct } from '@/utils/org_products';
import { createOrgProductDepartment } from '@/utils/org_proudct_departments';
import { successNotification } from '@/utils/notification';
import { useRouter } from 'next/navigation';
import { routes } from '@/config/routes';

type FormDataType = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  company_name: string;
  industry: number | undefined;
  main_location: string;
  secondary_location: string;
  add_locations: LocationSchema[];
  total_employees: number;
  data_locations: LocationSchema[];
  public_cloud_provider: number[];
  departments: string[] | undefined;
  all_departments: DepartSchema[];
  departments_details: DepartDetailSchema[] | undefined;
  products: ProductSchema[];
  locations: RealLocationSchema[];
};

export const initialFormData = {
  first_name: '',
  last_name: '',
  email: '',
  phone: '',
  company_name: '',
  industry: undefined,
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

  locations: [],
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
  // StepFive,
  StepSix,
  StepSeven,
}

const firstStep = Step.StepZero;
export const stepperAtomOne = atomWithReset<Step>(firstStep);
export const isClickedFooterSubmitButtonAtom = atom(false);
export const isSaveLoading = atom(false);

export function useStepperOne() {
  const { userProfile } = useUserProfile();
  const router = useRouter();
  const [step, setStep] = useAtom(stepperAtomOne);
  const [formData] = useAtom(formDataAtom);
  const [isClickedFooterSubmitButton, setIsClickedFooterSubmitButton] = useAtom(
    isClickedFooterSubmitButtonAtom
  );
  const [, setIsLoading] = useAtom(isSaveLoading);

  async function gotoNextStep(data: any) {
    if (isClickedFooterSubmitButton === true) {
      setStep(step + 1);
      setIsClickedFooterSubmitButton(false);
    } else {
      setIsLoading(true);
      const onboardingData = {
        ...formData,
        ...data,
      };
      console.log('onboardingData', onboardingData);
      let organizationData: any = undefined;
      let org_departments: any[] = [];
      let org_locations: any[] = [];
      try {
        if (step > 1) {
          const { data: organization } = await createOrganization({
            user_id: userProfile?.id,
            name: onboardingData.company_name,
            industry_id: onboardingData.industry,
            total_employees: onboardingData.total_employees,
          });
          if (organization) {
            console.log('****organization', organization);
            organizationData = organization;
            const { data: org_admin } = await createOrgAdmin({
              org_id: organization.id,
              first_name: onboardingData.first_name,
              last_name: onboardingData.last_name,
              email: onboardingData.email,
              phone: onboardingData.phone,
            });
            console.log('****org_admin', org_admin);
            for (const item of onboardingData.locations) {
              const { data: org_location } = await createOrgLocation({
                org_id: organization.id,
                type: item.type,
                address: item.address,
                name: item.name,
                country: item.country,
                state: item.state,
                city: item.city,
              });
              org_location && org_locations.push(org_location);
            }
            console.log('****org_locations', org_locations);
            for (const item of onboardingData.public_cloud_provider) {
              await createOrgCloudProvider({
                org_id: organizationData.id,
                provider_id: item,
              });
            }
          }
        }
        if (step > 2 && organizationData) {
          for (const depart of onboardingData.departments) {
            const { data: org_department } = await createOrgDepartment({
              org_id: organizationData.id,
              name: depart,
            });
            org_departments.push(org_department);
          }
          console.log('****org_departments', org_departments);
        }
        if (step > 3 && org_departments.length) {
          let index = 0;
          for (const item of org_departments) {
            const { data: dep_detail } = await createDepDetail({
              org_dep_id: item.id,
              total_members:
                onboardingData.departments_details[index].total_teammembers,
            });
            if (dep_detail) {
              for (const it of onboardingData.departments_details[index]
                .locations) {
                await createDepDetailLocation({
                  dep_detail_id: dep_detail.id,
                  location_id: org_locations[it].id,
                });
              }
            }
            index++;
          }
        }
        // if (step > 4 && onboardingData.products.length) {
        //   let org_products = onboardingData.products.filter(
        //     (pro: any) => pro.isActive === true
        //   );
        //   console.log('****org_products', org_products);
        //   for (const item of org_products) {
        //     const { data: org_product } = await createOrgProduct({
        //       org_id: organizationData.id,
        //       product_id: item.id,
        //     });
        //     console.log('****org_product', org_product);
        //     if (org_product) {
        //       if (item.department.find((val: number) => val === -1))
        //         for (const it of org_departments) {
        //           const { error } = await createOrgProductDepartment({
        //             org_product_id: org_product.id,
        //             org_dep_id: it.id,
        //           });
        //           console.log('****org_product_dep Error', error, {
        //             org_product_id: org_product.id,
        //             org_dep_id: it.id,
        //           });
        //         }
        //       else {
        //         for (const it of item.department) {
        //           const { error: onlyError } = await createOrgProductDepartment(
        //             {
        //               org_product_id: org_product.id,
        //               org_dep_id: org_departments[it].id,
        //             }
        //           );
        //           console.log('****org_product_dep Error', onlyError, {
        //             org_product_id: org_product.id,
        //             org_dep_id: org_departments[it].id,
        //           });
        //         }
        //       }
        //     }
        //   }
        // }
        setIsLoading(false);
        successNotification('Onboarding Steps is saved.');
        router.push(routes.main);
      } catch (err) {
        console.log('*******error', err);
        setIsLoading(false);
      }
    }
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
  // [Step.StepFive]: StepFive,
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
