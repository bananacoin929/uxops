'use client';

import { useEffect } from 'react';
import { useAtom } from 'jotai';
import { toast } from 'react-hot-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  formDataAtom,
  useStepperOne,
} from '@/app/shared/multi-step/multi-step-1';
import {
  CompanyInfoSchema,
  companyInfoSchema,
} from '@/validators/multistep-form.schema';

import { formCompanyParts } from '@/app/shared/ecommerce/product/create-edit/form-nav';

import OfficeLocation from './Step2/OfficeLocation';
import MainOfficeTimeZone from './Step2/MainOfficeTimeZone';
import NumberOfDepartments from './Step2/NumberOfDepartments';
import NumberOfEmployees from './Step2/NumberOfEmployees';
import OrganizationName from './Step2/OrganizationName';
import OrganizationIndustry from './Step2/OrganizationIndustry';
import AdminContactInfo from './Step2/AdminContactInfo';
import DataCenter from './Step2/DataCenter';
import PublicCloud from './Step2/PublicCloud';

import { Element } from 'react-scroll';

const MAP_STEP_TO_COMPONENT = {
  // [formCompanyParts.location]: OfficeLocation,
  // [formCompanyParts.timezone]: MainOfficeTimeZone,
  // [formCompanyParts.numberOfDepartments]: NumberOfDepartments,
  [formCompanyParts.totalNumberOfEmployees]: NumberOfEmployees,
  // [formCompanyParts.organizationName]: OrganizationName,
  // [formCompanyParts.organizationIndustry]: OrganizationIndustry,
  // [formCompanyParts.adminContactInfo]: AdminContactInfo,
  // [formCompanyParts.dateCenter]: DataCenter,
  // [formCompanyParts.publicCloud]: PublicCloud,
};

export default function StepTwo() {
  const { step, gotoNextStep } = useStepperOne();
  const [formData, setFormData] = useAtom(formDataAtom);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<CompanyInfoSchema>({
    resolver: zodResolver(companyInfoSchema),
    defaultValues: {
      // companyInfo: formData.companyInfo,
    },
  });

  // useEffect(() => {
  //   if (errors.propertyType) {
  //     toast.error(errors.propertyType.message as string);
  //   }
  // }, [errors]);

  const onSubmit: SubmitHandler<CompanyInfoSchema> = (data) => {
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
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={onSubmit}
          className="flex-grow rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0"
        >
          <h1 className="mb-4 text-2xl font-bold">Organization Infomation</h1>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            Please input the organization information.
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
      </div>
      <div className=" w-0 @5xl:col-span-1" />
    </>
  );
}
