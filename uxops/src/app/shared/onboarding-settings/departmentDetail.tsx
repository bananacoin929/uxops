'use client';

import { useEffect, useState } from 'react';
import { Form } from '@ui/form-provider';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@components/form-footer';
import { Select, Input } from 'rizzui';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiXBold, PiCheckBold } from 'react-icons/pi';
import {
  DepartDetailSchema,
  FormStep4Schema,
  formStep4Schema,
} from '@/validators/onboarding-settings.schema';
import { getOrgLocation } from '@/utils/org_locations';
import { useUserProfile } from '@/lib/providers/user-profile-provider';
import { getDepDetail, updateDepDetail } from '@/utils/dep_details';
import { successNotification, errorNotification } from '@/utils/notification';

export default function StepThree() {
  const { userProfile } = useUserProfile();

  const [options, setOptions] = useState<any[]>([]);
  const [departmentDetails, setDepartmentDetails] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function getData() {
    const { data: locationData, error } = await getOrgLocation(
      userProfile?.org_id
    );
    let opts: any[] = [];
    if (!error) {
      locationData.map((location: any) => {
        if (location.type === 'MAIN')
          opts.push({ label: 'Main Office', value: location.id });
        else if (location.type === 'SECONDARY') {
          if (location.address !== '')
            opts.push({
              label: 'Secondary Office',
              value: location.id,
            });
        } else opts.push({ label: location.name, value: location.id });
      });
    }
    console.log(opts);
    setOptions(opts);
    const { data: depDetailData, error: getDetailError } = await getDepDetail({
      org_id: userProfile?.org_id,
    });
    console.log(getDetailError, depDetailData);
    if (!getDetailError) {
      let data: DepartDetailSchema[] = [];
      depDetailData.map((item: any) => {
        if (item.dep_details) {
          item?.dep_details.map((it: any) => {
            data.push({
              id: item.id,
              name: item.name,
              total_members: it.total_members,
              locations: it.locations.map((lo: any) => lo.location_id),
            });
          });
        } else {
          data.push({
            id: item.id,
            name: item.name,
            total_members: undefined,
            locations: [],
          });
        }
      });
      console.log(data);
      setDepartmentDetails(data);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const onSubmit: SubmitHandler<FormStep4Schema> = async (data) => {
    console.log(data);
    setDepartmentDetails(data.departments_details ?? []);
    setIsLoading(true);
    const { error } = await updateDepDetail({
      dep_ids: data.departments_details?.map((it) => it.id),
      department_details: data.departments_details ?? [],
    });
    if (error) errorNotification(error.message);
    else successNotification('Successfully Updated!');
    setIsLoading(false);
  };

  return (
    <Form<FormStep4Schema>
      validationSchema={formStep4Schema}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          departments_details: departmentDetails,
        },
      }}
      resetValues={{ departments_details: departmentDetails }}
    >
      {({ control, setValue, formState: { errors } }) => {
        return (
          <>
            <FormGroup
              title="Departments Detail"
              description="Please enter additional information for each department you selected"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-5 @3xl:pt-11"
            />
            <section className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 md:gap-8 md:p-6 lg:grid-cols-2 lg:gap-10 xl:grid-cols-2">
              <Controller
                name="departments_details"
                control={control}
                render={({ field: { value } }) => (
                  <>
                    {value?.map((department: any, index: number) => (
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
                          value={department.total_members}
                          error={
                            (errors.departments_details as any)?.[index]
                              ?.total_members?.message as string
                          }
                          onChange={(e) => {
                            let updateData = value?.map(
                              (it: any, ind: number) => {
                                if (ind === index)
                                  return {
                                    ...it,
                                    total_members: parseInt(e.target.value),
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
                            placeholder="Select the department locations"
                            className={'col-span-full'}
                            options={options}
                            error={
                              (errors.departments_details as any)?.[index]
                                ?.locations?.message as string
                            }
                            displayValue={(selected: any) => {
                              let display: string[] = [];
                              selected
                                .sort((a: number, b: number) => a - b)
                                .map((sel: number) =>
                                  display.push(
                                    options.find((op: any) => op.value === sel)
                                      ?.label ?? ''
                                  )
                                );
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
                                  {department.locations.find(
                                    (lo: number) => lo === option.value
                                  ) !== undefined ? (
                                    <PiCheckBold className="h-3.5 w-3.5" />
                                  ) : (
                                    ''
                                  )}
                                </div>
                              );
                            }}
                            value={department.locations}
                            onChange={(e: any) => {
                              let updateData = value?.map(
                                (it: any, ind: number) => {
                                  if (ind === index) {
                                    return {
                                      ...it,
                                      locations: e,
                                    };
                                  } else return it;
                                }
                              );
                              setValue('departments_details', updateData);
                            }}
                          />
                          {department.locations.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {department.locations
                                .sort((a: number, b: number) => a - b)
                                .map((text: any) => (
                                  <div
                                    key={text?.value}
                                    className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"
                                  >
                                    {options.find(
                                      (op: any) => op.value === text
                                    )?.label ?? ''}
                                    <button
                                      onClick={() => {
                                        let updateData = value?.map(
                                          (it: any, ind: number) => {
                                            if (ind === index) {
                                              let updatelocations =
                                                it.locations.filter(
                                                  (loc: any) => loc !== text
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
