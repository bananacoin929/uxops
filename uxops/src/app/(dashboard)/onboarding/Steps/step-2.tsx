'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import {
  formDataAtom,
  useStepperOne,
} from '@/app/(dashboard)/onboarding/Steps';
import {
  CompanyInfoSchema,
  companyInfoSchema,
} from '@/validators/multistep-form.schema';

import { formCompanyParts } from '@/app/shared/ecommerce/product/create-edit/form-nav';

import MainLocation from './Step2/MainLocation';
import CompanyName from './Step2/CompanyName';
import CompanyIndustry from './Step2/CompanyIndustry';
import AddLocations from './Step2/AddLocations';
import NumberOfEmployees from './Step2/NumberOfEmployees';
import DataCenterLocations from './Step2/DataCenterLocations';
import AdminContactInfo from './Step2/AdminContactInfo';
import DataCenter from './Step2/DataCenter';
import PublicCloud from './Step2/PublicCloud';

import { Element } from 'react-scroll';

import {
  formStep2Schema,
  FormStep2Schema,
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
    defaultValues: {},
  });

  const onSubmit: SubmitHandler<FormStep2Schema> = (data) => {
    console.log('data', data);
    setFormData((prev) => ({
      ...prev,
      // companyInfo: data.companyInfo,
    }));
    gotoNextStep();
  };

  return (
    <>
      <div className=" w-0 @5xl:col-span-1" />
      <div className="col-span-full flex items-center justify-center @5xl:col-span-10">
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
      <div className=" w-0 @5xl:col-span-1" />
    </>
  );
}
