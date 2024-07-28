'use client';

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Switch, Checkbox, Select, Button, Input } from 'rizzui';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import {
  formDataAtom,
  useStepperOne,
} from '@/app/(onboarding)/onboarding/Steps';
import {
  FormStep5Schema,
  formStep5Schema,
} from '@/validators/onboarding-form.schema';
import Image from 'next/image';
import { PiCheckBold, PiXBold } from 'react-icons/pi';

export default function StepFour() {
  const { step, gotoNextStep } = useStepperOne();
  const [formData, setFormData] = useAtom(formDataAtom);

  const {
    control,
    setValue,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<FormStep5Schema>({
    resolver: zodResolver(formStep5Schema),
    defaultValues: {
      products: formData.products,
    },
  });

  const options: any[] = [{ label: 'Company Wide', value: -1 }];
  formData.departments?.forEach((it: string, index) => {
    options.push({ label: it, value: index });
  });

  const onSubmit: SubmitHandler<FormStep5Schema> = (data) => {
    setFormData((prev: any) => ({
      ...prev,
      products: data.products,
    }));
    gotoNextStep({ products: data.products });
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
          <section className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 md:gap-4 md:p-6 lg:grid-cols-3 lg:gap-5 xl:grid-cols-3">
            <div className="col-span-full">
              <h1 className="mb-4 text-2xl font-bold">Product Info</h1>
              <p className="mb-6 text-gray-500 dark:text-gray-400">
                Now let’s get to the fun part, let’s add your products.
              </p>
              <div className="mb-6 flex w-full items-center">
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="rounded-lg bg-background sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
              </div>
            </div>
            <Controller
              name="products"
              control={control}
              render={({ field: { value } }) => (
                <>
                  {getValues().products?.map((product, index) => (
                    <div
                      key={product.id}
                      className={`overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-950 ${
                        product.isActive === true
                          ? 'border-2 border-green-500 dark:border-green-500'
                          : 'border-2 border-gray-200 dark:border-gray-800'
                      }`}
                    >
                      <div className="flex w-full items-center justify-between gap-4 border-b p-4 dark:border-gray-800">
                        <div className="flex gap-3">
                          <Image
                            src="/Microsoft.ico"
                            alt={product.vendor.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 rounded-full"
                          />
                          <span className="flex items-center font-medium text-gray-700 dark:text-gray-300">
                            {product.vendor.name}
                          </span>
                        </div>
                        <Switch
                          className="ml-auto"
                          defaultChecked={product.isActive}
                          onChange={(e) => {
                            let updateData = value?.map(
                              (it: any, ind: number) => {
                                if (ind === index) {
                                  return {
                                    ...it,
                                    isActive: e.target.checked,
                                  };
                                } else return it;
                              }
                            );
                            setValue('products', updateData);
                          }}
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="mb-2 text-lg font-semibold">
                          {product.name}
                        </h3>
                        <p className="mb-4 text-gray-500 dark:text-gray-400">
                          {product.description}
                        </p>
                        <div className="mb-4 flex items-center">
                          <span className="mr-2 text-sm font-bold text-gray-600 dark:text-gray-400">
                            Category:
                          </span>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            {product.category}
                          </span>
                        </div>
                        <div className="mb-4 flex flex-col items-center justify-start gap-4">
                          <span className=" w-full text-sm font-bold text-gray-600 dark:text-gray-400">
                            Department Tags:
                          </span>
                          <div className="flex w-full flex-col gap-4">
                            <Select
                              multiple
                              placeholder="Select the departments"
                              className={'col-span-full w-full'}
                              options={options}
                              error={
                                (errors.products as any)?.[index]?.department
                                  ?.message as string
                              }
                              displayValue={(selected: any) => {
                                let display: string[] = [];
                                selected
                                  .sort((a: number, b: number) => a - b)
                                  .map((it: number) => {
                                    if (it === -1) display.push('Company Wide');
                                    else
                                      display.push(
                                        options.find((op) => op.value === it)
                                          ?.label ?? ''
                                      );
                                  });
                                return display.join(', ');
                              }}
                              getOptionValue={(option) => option.value}
                              getOptionDisplayValue={(option: {
                                value: any;
                                label: any;
                              }) => {
                                return (
                                  <div className="flex w-full items-center gap-5">
                                    {option.label}
                                    {product.department.find(
                                      (lo: number) => lo === option.value
                                    ) !== undefined ? (
                                      <PiCheckBold className="h-3.5 w-3.5" />
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                );
                              }}
                              value={product.department}
                              onChange={(e: any) => {
                                let updateData = value?.map(
                                  (it: any, ind: number) => {
                                    if (ind === index) {
                                      return {
                                        ...it,
                                        department: e,
                                      };
                                    } else return it;
                                  }
                                );
                                setValue('products', updateData);
                              }}
                            />
                            {product.department.length > 0 && (
                              <div className="mt-3 flex flex-wrap gap-2">
                                {product.department.map((text: any) => (
                                  <div
                                    key={text}
                                    className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"
                                  >
                                    {options.find((op) => op.value === text)
                                      ?.label ?? ''}
                                    <button
                                      onClick={() => {
                                        let updateData = value?.map(
                                          (it: any, ind: number) => {
                                            if (ind === index) {
                                              let updateDepartment =
                                                it.department.filter(
                                                  (loc: number) => loc !== text
                                                );
                                              return {
                                                ...it,
                                                department: updateDepartment,
                                              };
                                            } else return it;
                                          }
                                        );
                                        setValue('products', updateData);
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
                      </div>
                    </div>
                  ))}
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
