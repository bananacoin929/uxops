'use client';

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Select, Input } from 'rizzui';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import {
  formDataAtom,
  useStepperOne,
} from '@/app/(dashboard)/onboarding/Steps';
import { PiXBold, PiCheckBold } from 'react-icons/pi';
import {
  FormStep4Schema,
  formStep4Schema,
  LocationSchema,
} from '@/validators/onboarding-form.schema';

export default function StepThree() {
  const { step, gotoNextStep } = useStepperOne();
  const [formData, setFormData] = useAtom(formDataAtom);
  const [officeOptions, setOfficeOptions] = useState([]);

  const {
    control,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<FormStep4Schema>({
    resolver: zodResolver(formStep4Schema),
    defaultValues: {
      departments_details: formData.departments_details,
    },
  });

  useEffect(() => {
    let options: any = [];
    if (formData.main_location)
      options.push({ label: 'Main Office', value: -1 });
    if (formData.secondary_location)
      options.push({
        label: 'Secondary Office',
        value: -2,
      });
    if (formData.add_locations?.length)
      formData.add_locations.map((item: LocationSchema) =>
        options.push({ label: item.name, value: item.id })
      );
    setOfficeOptions(options);
  }, [
    formData.add_locations,
    formData.main_location,
    formData.secondary_location,
  ]);

  const onSubmit: SubmitHandler<FormStep4Schema> = (data) => {
    console.log('data', data);
    setFormData((prev) => ({
      ...prev,
      departments_details: data.departments_details,
    }));
    gotoNextStep();
  };

  return (
    <>
      <div className=" w-0 @5xl:col-span-1" />
      <div className="col-span-full flex items-center justify-center @5xl:col-span-10">
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={handleSubmit(onSubmit)}
          className="flex-grow rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0"
        >
          <section className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 md:gap-8 md:p-6 lg:grid-cols-2 lg:gap-10 xl:grid-cols-2">
            <div className="col-span-full">
              <h1 className="mb-4 text-2xl font-bold">
                Departments Detail Info
              </h1>
              <p className="mb-6 text-gray-500 dark:text-gray-400">
                Please enter additional information for each department you
                selected.
              </p>
            </div>
            <Controller
              name="departments_details"
              control={control}
              render={({ field: { value } }) => (
                <>
                  {getValues().departments_details?.map(
                    (department: any, index: number) => (
                      <div
                        key={index}
                        className={
                          'flex cursor-pointer flex-col gap-4 rounded-lg border bg-background p-4 transition-colors'
                        }
                      >
                        <div className="mb-4">
                          <div className="text-lg font-bold text-black">
                            {department.name}
                          </div>
                        </div>
                        <Input
                          label="Total Team Members"
                          className="col-span-full"
                          type="number"
                          value={department.total_teammembers}
                          error={
                            (errors.departments_details as any)?.[index]
                              ?.total_teammembers?.message as string
                          }
                          onChange={(e) => {
                            let updateData = value?.map(
                              (it: any, ind: number) => {
                                if (ind === index)
                                  return {
                                    ...it,
                                    total_teammembers: parseInt(e.target.value),
                                  };
                                else return it;
                              }
                            );
                            setValue('departments_details', updateData);
                          }}
                        />
                        <div className="flex flex-col gap-4">
                          <Select
                            multiple
                            label="Department Locations"
                            placeholder='Select the department locations'
                            className={'col-span-full'}
                            options={officeOptions}
                            error={
                              (errors.departments_details as any)?.[index]
                                ?.locations?.message as string
                            }
                            displayValue={(selected: any) => {
                              return selected
                                .map((it: any) => it.label)
                                .join(', ');
                            }}
                            getOptionDisplayValue={(option: {
                              value: any;
                              label: any;
                            }) => {
                              return (
                                <div className="flex w-full items-center gap-5">
                                  {option.label}
                                  {department.locations.filter(
                                    (lo: any) => lo.value === option.value
                                  )?.length ? (
                                    <PiCheckBold className="h-3.5 w-3.5" />
                                  ) : (
                                    ''
                                  )}
                                </div>
                              );
                            }}
                            value={department.locations}
                            onChange={(e: any) => {
                              console.log(e);
                              let updateData = value?.map(
                                (it: any, ind: number) => {
                                  if (ind === index) {
                                    const mergedArray = it.locations.concat(
                                      e.filter(
                                        (item2: any) =>
                                          !it.locations.some(
                                            (item1: any) =>
                                              item1.label === item2.label &&
                                              item1.value === item2.value
                                          )
                                      )
                                    );
                                    return {
                                      ...it,
                                      locations: mergedArray,
                                    };
                                  } else return it;
                                }
                              );
                              setValue('departments_details', updateData);
                            }}
                          />
                          {department.locations.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {department.locations.map((text: any) => (
                                <div
                                  key={text?.value}
                                  className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"
                                >
                                  {text?.label}
                                  <button
                                    onClick={() => {
                                      let updateData = value?.map(
                                        (it: any, ind: number) => {
                                          if (ind === index) {
                                            let updatelocations =
                                              it.locations.filter(
                                                (loc: any) =>
                                                  loc?.value !== text?.value
                                              );
                                            return {
                                              ...it,
                                              locations: updatelocations,
                                            };
                                          } else return it;
                                        }
                                      );
                                      setValue(
                                        'departments_details',
                                        updateData
                                      );
                                    }}
                                    className="ps-2 text-gray-500 hover:text-gray-900"
                                  >
                                    <PiXBold className="h-3.5 w-3.5" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  )}
                </>
              )}
            />
          </section>
        </form>
      </div>
      <div className=" w-0 @5xl:col-span-1" />
    </>
  );
}
