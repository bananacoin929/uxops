'use client';

import { useEffect, useState } from 'react';
import { Form } from '@ui/form-provider';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@components/form-footer';
import {
  Checkbox,
  Button,
  Input,
  ActionIcon,
  Text,
  Modal,
  CheckboxGroup,
} from 'rizzui';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiPlusBold, PiXBold } from 'react-icons/pi';
import { errorNotification, successNotification } from '@/utils/notification';
import { getOrgDepartment, updateOrgDepartment } from '@/utils/org_departments';
import { useUserProfile } from '@/lib/providers/user-profile-provider';
import {
  FormStep3Schema,
  formStep3Schema,
  defaultDepartments,
  DepartSchema,
} from '@/validators/onboarding-settings.schema';

export default function StepThree() {
  const { userProfile } = useUserProfile();

  const [isLoading, setIsLoading] = useState(false);

  // Data
  const [allDepartments, setAllDepartments] =
    useState<DepartSchema[]>(defaultDepartments);
  const [departments, setDepartments] = useState<string[]>([]);
  const [errors, setErrors] = useState<any>();

  // Modal
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [departmentName, setDepartmentName] = useState<string>('');

  async function getData() {
    const { data: departmentData } = await getOrgDepartment({
      org_id: userProfile?.org_id,
    });
    console.log(departmentData);
    setDepartments(departmentData?.map((it: any) => it.name));
    let mergedArray = defaultDepartments;
    departmentData.map((item: any) => {
      let m = mergedArray.find((it: any) => it.name === item.name);
      if (m) m.selected = true;
      else mergedArray.push({ name: item.name, selected: true });
    });
    setAllDepartments(mergedArray);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (errors?.departments)
      errorNotification('Please select your departments!');
  }, [errors]);

  const onSubmit: SubmitHandler<FormStep3Schema> = async (data) => {
    console.log(data);
    setDepartments(data.departments);
    setAllDepartments(data.all_departments ?? []);
    setIsLoading(true);
    const { error } = await updateOrgDepartment({
      org_id: userProfile?.org_id,
      departments: data.departments,
    });
    if (error) errorNotification(error.message);
    else successNotification('Successfully Updated!');
    setIsLoading(false);
  };

  const handleSaveDepartment = () => {
    if (departmentName) {
      const updatedDepartment = {
        name: departmentName,
        selected: false,
      };
      setAllDepartments([...allDepartments, updatedDepartment]);
      setDepartmentName('');
      setIsDepartmentModalOpen(false);
    } else errorNotification('Please enter the department name.');
  };

  return (
    <Form<FormStep3Schema>
      validationSchema={formStep3Schema}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          departments: departments,
          all_departments: allDepartments,
        },
      }}
      resetValues={{ departments, all_departments: allDepartments }}
    >
      {({ control, formState: { errors } }) => {
        return (
          <div className="flex flex-col gap-4">
            <FormGroup
              title="Departments"
              description="Please edit the departments that are available to monitor in your organization"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-5 @3xl:pt-11"
            />
            <div className="flex w-full justify-between">
              <div className="flex w-full flex-col gap-4">
                <div className="flex w-full items-center justify-between">
                  {errors.departments ? (
                    <Text className="font-semibold text-red-500">
                      Please select the departments
                    </Text>
                  ) : (
                    <Text className="font-semibold text-gray-900">
                      Select all your organization departments.
                    </Text>
                  )}
                  <Button
                    variant="outline"
                    size="md"
                    className=""
                    onClick={() => {
                      setIsDepartmentModalOpen(true);
                    }}
                  >
                    <PiPlusBold className="me-1.5 h-4 w-4" />
                    Add Department
                  </Button>
                </div>
                <Controller
                  name="departments"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <CheckboxGroup
                      values={value}
                      setValues={onChange}
                      className="mt-5 grid grid-cols-12 gap-4"
                    >
                      {allDepartments?.map((item: any) => {
                        return (
                          <Checkbox
                            key={`${item.name}-key-${item.id}`}
                            label={
                              <div className="flex items-center justify-between text-gray-800">
                                {item.name}
                              </div>
                            }
                            className="col-span-6 @xl:col-span-4 @3xl:col-span-3"
                            labelClassName="w-full"
                            name={'department'}
                            value={item.name}
                          />
                        );
                      })}
                    </CheckboxGroup>
                  )}
                />
              </div>
            </div>
            <Modal
              isOpen={isDepartmentModalOpen}
              onClose={() => setIsDepartmentModalOpen(false)}
            >
              <div className="m-auto px-7 pb-8 pt-6">
                <div className="mb-7 flex items-center justify-between">
                  <Text as="b" className="text-lg">
                    Add Department
                  </Text>
                  <ActionIcon
                    size="sm"
                    variant="text"
                    onClick={() => setIsDepartmentModalOpen(false)}
                  >
                    <PiXBold className="h-5 w-5 text-base" />
                  </ActionIcon>
                </div>
                <div className="grid grid-cols-1 gap-x-5 gap-y-6 [&_label>span]:font-medium">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Input
                        type="text"
                        placeholder="Department Name"
                        value={departmentName}
                        onChange={(e) => setDepartmentName(e.target.value)}
                        className="rounded-lg bg-background"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-3">
                    <Button
                      type="submit"
                      size="md"
                      className="col-span-2"
                      onClick={() => handleSaveDepartment()}
                    >
                      Save
                    </Button>
                    <Button
                      size="md"
                      variant="outline"
                      onClick={() => setIsDepartmentModalOpen(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            </Modal>
            <FormFooter
              isLoading={isLoading}
              altBtnText="Cancel"
              submitBtnText="Save"
              handleAltBtn={() => {}}
            />
          </div>
        );
      }}
    </Form>
  );
}
