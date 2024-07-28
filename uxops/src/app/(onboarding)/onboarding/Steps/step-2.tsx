'use client';

import { useAtom } from 'jotai';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import {
  formDataAtom,
  useStepperOne,
} from '@/app/(onboarding)/onboarding/Steps';

import { formCompanyParts } from '@/app/shared/ecommerce/product/create-edit/form-nav';

import MainLocation from './Step2/MainLocation';
import CompanyName from './Step2/CompanyName';
import CompanyIndustry from './Step2/CompanyIndustry';
import AddLocations from './Step2/AddLocations';
import NumberOfEmployees from './Step2/NumberOfEmployees';
import DataCenterLocations from './Step2/DataCenterLocations';
import PublicCloud from './Step2/PublicCloudProvider';

import { Element } from 'react-scroll';

import {
  formStep2Schema,
  FormStep2Schema,
  LocationSchema,
  RealLocationSchema,
} from '@/validators/onboarding-form.schema';

const MAP_STEP_TO_COMPONENT = {
  [formCompanyParts.companyName]: CompanyName,
  [formCompanyParts.companyIndustry]: CompanyIndustry,
  [formCompanyParts.mainLocation]: MainLocation,
  [formCompanyParts.addLocations]: AddLocations,
  [formCompanyParts.totalNumberOfEmployees]: NumberOfEmployees,
  [formCompanyParts.dataCenterLocations]: DataCenterLocations,
  [formCompanyParts.publicCloudProvider]: PublicCloud,
};

export default function StepTwo() {
  const { step, gotoNextStep } = useStepperOne();
  const [formData, setFormData] = useAtom(formDataAtom);

  const methods = useForm<FormStep2Schema>({
    resolver: zodResolver(formStep2Schema),
    defaultValues: {
      name: formData.name,
      industry_id: formData.industry_id,
      main_location: formData.main_location,
      secondary_location: formData.secondary_location,
      add_locations: formData.add_locations,
      total_employees: formData.total_employees,
      data_locations: formData.data_locations,
      public_cloud_provider: formData.public_cloud_provider,
    },
  });

  const onSubmit: SubmitHandler<FormStep2Schema> = (data) => {
    let add: RealLocationSchema[] =
      data.add_locations?.map((it: LocationSchema) => {
        return {
          type: 'ADD',
          address: undefined,
          name: it.name,
          country: it.country,
          state: it.state,
          city: it.city,
        };
      }) ?? [];
    let dataCenter: RealLocationSchema[] =
      data.data_locations?.map((it: LocationSchema) => {
        return {
          type: 'DATA_CENTER',
          address: undefined,
          name: it.name,
          country: it.country,
          state: it.state,
          city: it.city,
        };
      }) ?? [];
    setFormData((prev: any) => ({
      ...prev,
      name: data.name,
      industry_id: data.industry_id,
      locations: [
        {
          type: 'MAIN',
          address: data.main_location,
          name: null,
          country: null,
          state: null,
          city: null,
        },
        {
          type: 'SECONDARY',
          address: data.secondary_location,
          name: null,
          country: null,
          state: null,
          city: null,
        },
        ...add,
        ...dataCenter,
      ],
      main_location: data.main_location,
      secondary_location: data.secondary_location,
      add_locations: data.add_locations,
      total_employees: data.total_employees,
      data_locations: data.data_locations,
      public_cloud_provider: data.public_cloud_provider,
    }));
    gotoNextStep({
      name: data.name,
      industry_id: data.industry_id,
      locations: [
        {
          type: 'MAIN',
          address: data.main_location,
          name: null,
          country: null,
          state: null,
        },
        {
          type: 'SECONDARY',
          address: data.secondary_location,
          name: null,
          country: null,
          state: null,
        },
        ...add,
        ...dataCenter,
      ],
      main_location: data.main_location,
      secondary_location: data.secondary_location,
      add_locations: data.add_locations,
      total_employees: data.total_employees,
      data_locations: data.data_locations,
      public_cloud_provider: data.public_cloud_provider,
    });
  };

  return (
    <>
      <div className=" w-0 @5xl:col-span-2" />
      <div className="col-span-full flex items-center justify-center @5xl:col-span-8">
        <FormProvider {...methods}>
          <form
            id={`rhf-${step.toString()}`}
            onSubmit={methods.handleSubmit(onSubmit)}
            className="flex-grow rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0"
          >
            <h1 className="mb-4 text-2xl font-bold">Organization Infomation</h1>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              We’ll ask you a few more questions about your organization.
            </p>
            <div className="grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              {Object.entries(MAP_STEP_TO_COMPONENT).map(([key, Component]) => (
                <Element
                  key={key}
                  name={formCompanyParts[key as keyof typeof formCompanyParts]}
                >
                  {
                    <Component className="grid grid-cols-12 pt-7 @2xl:pt-9 @3xl:pt-11" />
                  }
                </Element>
              ))}
            </div>
          </form>
        </FormProvider>
      </div>
      <div className=" w-0 @5xl:col-span-2" />
    </>
  );
}
