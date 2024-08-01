'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAtom } from 'jotai';
import { Switch, Select, Input, Loader, Button } from 'rizzui';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import Image from 'next/image';
import { PiCheckBold, PiXBold } from 'react-icons/pi';
import { Form } from '@ui/form-provider';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@components/form-footer';
import { useUserProfile } from '@/lib/providers/user-profile-provider';
import { useRouter } from 'next/navigation';
import { z } from 'zod';
import { createOrgProduct, updateOrgProduct } from '@/utils/org_products';
import { createOrgProductDepartment } from '@/utils/org_proudct_departments';
import { errorNotification, successNotification } from '@/utils/notification';

const productSchema = z.object({
  id: z.number(),
  status: z.boolean(),
  product_id: z.number(),
  departments: z.number().array(),
});

const productpageSchema = z.object({
  products: z.array(productSchema).optional(),
});

type ProductpageSchema = z.infer<typeof productpageSchema>;

export default function ProductPage() {
  const { userProfile } = useUserProfile();
  const [isMount, setIsMount] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const router = useRouter();

  // const options: any[] = [{ label: 'Company Wide', value: -1 }];

  async function getData() {
    setIsMount(true);
    const res = await axios.get(`/api/product/${userProfile?.org_id}`);
    console.log(res);
    const response = await axios.get(`/api/department/${userProfile?.org_id}`);
    if (res.status === 200) setProducts(res.data.data);
    if (response.status === 200)
      setOptions([
        { label: 'Company Wide', value: -1 },
        ...response.data.data.map((item: any) => {
          return { label: item.name, value: item.id };
        }),
      ]);
    setIsMount(false);
  }

  useEffect(() => {
    getData();
  }, []);

  const onSubmit: SubmitHandler<ProductpageSchema> = async (data: any) => {
    console.log(data);
    setProducts(
      products.map((it: any, index: number) => {
        return { ...it, ...data.products[index] };
      })
    );

    setIsLoading(true);
    let org_products: any[] =
      data?.products?.filter((pro: any) => pro.status === true) ?? [];

    console.log('****org_products', org_products);
    try {
      for (const item of org_products) {
        const { data: org_product, error } = await updateOrgProduct({
          id: item.id,
          org_id: userProfile?.org_id,
          product_id: item.product_id,
          status: item.status,
          updated_at: new Date(),
        });
        console.log('****org_product', org_product, error);
        if (org_product) {
          if (item.departments.find((val: number) => val === -1))
            for (const it of options.filter((it: any) => it.value !== -1)) {
              const { error } = await createOrgProductDepartment({
                org_product_id: org_product.id,
                org_dep_id: it.value,
              });
              console.log('****org_product_dep Error', error, {
                org_product_id: org_product.id,
                org_dep_id: it.value,
              });
            }
          else {
            for (const it of item.departments) {
              const { error: onlyError } = await createOrgProductDepartment({
                org_product_id: org_product.id,
                org_dep_id: it,
              });
              console.log('****org_product_dep Error', onlyError, {
                org_product_id: org_product.id,
                org_dep_id: it,
              });
            }
          }
        }
      }
      successNotification('Sucessfully Updated!');
    } catch (error) {
      errorNotification('Error!');
    }
    setIsLoading(false);
  };
  return isMount ? (
    <div className="flex w-full justify-center">
      <Loader size="lg" variant="threeDot" />
    </div>
  ) : products.length === 0 ? (
    <div className="flex w-full justify-center">
      <Button
        variant="outline"
        onClick={() => router.push('/settings/integration')}
      >
        Go to Integration Page
      </Button>
    </div>
  ) : (
    <Form
      validationSchema={productpageSchema}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          products: [],
        },
      }}
      resetValues={{ products }}
    >
      {({ control, setValue, formState: { errors } }) => {
        return (
          <>
            <FormGroup
              title="Product Selection"
              description="Now let’s get to the fun part, let’s add your products"
              className="@3xl:grid-cols-12"
            />
            <section className="mdlg:grid-cols-3 mb-6 mt-6 grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:gap-5 xl:grid-cols-3">
              <div className="col-span-full">
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
                    {value?.map((item: any, index) => (
                      <div
                        key={item.id}
                        className={`overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-950 ${
                          item.status === true
                            ? 'border-2 border-green-500 dark:border-green-500'
                            : 'border-2 border-gray-200 dark:border-gray-800'
                        }`}
                      >
                        <div className="flex w-full items-center justify-between gap-4 border-b p-4 dark:border-gray-800">
                          <div className="flex gap-3">
                            <Image
                              src={item?.vendor?.avatar_url}
                              alt={item?.vendor?.name}
                              width={40}
                              height={40}
                              className="h-10 w-10 rounded-full"
                            />
                            <span className="flex items-center font-medium text-gray-700 dark:text-gray-300">
                              {item?.product?.name}
                            </span>
                          </div>
                          <Switch
                            className="ml-auto"
                            defaultChecked={item.status}
                            onChange={async (e) => {
                              let updateData = value?.map(
                                (it: any, ind: number) => {
                                  if (ind === index) {
                                    return {
                                      ...it,
                                      status: e.target.checked,
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
                            {item.name}
                          </h3>
                          <p className="mb-4 text-gray-500 dark:text-gray-400">
                            {item?.product?.description}
                          </p>
                          <div className="mb-4 flex items-center">
                            <span className="mr-2 text-sm font-bold text-gray-600 dark:text-gray-400">
                              Category:
                            </span>
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                              {item?.product?.category}
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
                                  (errors.products as any)?.[index]?.departments
                                    ?.message as string
                                }
                                displayValue={(selected: any) => {
                                  let display: string[] = [];
                                  selected
                                    .sort((a: number, b: number) => a - b)
                                    .map((it: number) => {
                                      if (it === -1)
                                        display.push('Company Wide');
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
                                      {item.departments.find(
                                        (lo: number) => lo === option.value
                                      ) !== undefined ? (
                                        <PiCheckBold className="h-3.5 w-3.5" />
                                      ) : (
                                        ''
                                      )}
                                    </div>
                                  );
                                }}
                                value={item.departments}
                                onChange={(e: any) => {
                                  let updateData = value?.map(
                                    (it: any, ind: number) => {
                                      if (ind === index) {
                                        return {
                                          ...it,
                                          departments: e,
                                        };
                                      } else return it;
                                    }
                                  );
                                  setValue('products', updateData);
                                }}
                              />
                              {item.departments.length > 0 && (
                                <div className="mt-3 flex flex-wrap gap-2">
                                  {item.departments.map((text: any) => (
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
                                                  it.departments.filter(
                                                    (loc: number) =>
                                                      loc !== text
                                                  );
                                                return {
                                                  ...it,
                                                  departments: updateDepartment,
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
            <FormFooter
              isLoading={isLoading}
              altBtnText="Cancel"
              submitBtnText="Save"
              handleAltBtn={() => {}}
            />
          </>
        );
      }}
    </Form>
  );
}
