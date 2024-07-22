'use client';

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { toast } from 'react-hot-toast';
import {
  Switch,
  Checkbox,
  Select,
  SelectOption,
  Button,
  Input,
  Textarea,
  ActionIcon,
  Text,
  Modal,
  CheckboxGroup,
} from 'rizzui';
import { PiXBold } from 'react-icons/pi';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, Controller } from 'react-hook-form';
import {
  formDataAtom,
  useStepperOne,
} from '@/app/(dashboard)/onboarding/Steps';
import {
  FormStep3Schema,
  formStep3Schema,
} from '@/validators/onboarding-form.schema';

export default function StepThree() {
  const { step, gotoNextStep } = useStepperOne();
  const [formData, setFormData] = useAtom(formDataAtom);

  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [modalData, setModalData] = useState<any>({});

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormStep3Schema>({
    resolver: zodResolver(formStep3Schema),
    defaultValues: {
      departments: formData.departments,
      all_departments: formData.all_departments,
    },
  });

  useEffect(() => {
    if (errors.departments) {
      toast.error(errors.departments.message as string);
    }
  }, [errors]);

  const onSubmit: SubmitHandler<FormStep3Schema> = (data) => {
    console.log('data', data, departments);
    setFormData((prev) => ({
      ...prev,
      departments: data.departments,
      all_departments: departments,
    }));
    console.log('formData', formData);
    gotoNextStep();
  };

  const [departments, setDepartments] = useState(formData.all_departments);

  const handleSaveDepartment = (department: any) => {
    const updatedDepartment = {
      id: departments.length + 1,
      name: department.name,
      value: department.value,
      selected: false,
    };
    console.log(updatedDepartment);
    setDepartments([...departments, updatedDepartment]);
    setIsDepartmentModalOpen(false);
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
          <div className="col-span-full">
            <h1 className="mb-4 text-2xl font-bold">Departments</h1>
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              Please edit the departments that are available to monitor in your
              organization.
            </p>
            <div className="flex w-full justify-between">
              <div className="flex w-full flex-col gap-4">
                <div className="flex w-full items-center justify-between">
                  <Text className="font-semibold text-gray-900">
                    Select all your organization departments!
                  </Text>
                  <Button
                    variant="outline"
                    size="md"
                    className=""
                    onClick={() => {
                      setIsDepartmentModalOpen(true);
                    }}
                  >
                    Create Department
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
                      {departments?.map((item: any) => {
                        return (
                          <Checkbox
                            key={`${item.name}-key-${item.id}`}
                            label={
                              <div className="flex items-center justify-between text-gray-800">
                                {item.name}
                              </div>
                            }
                            className="col-span-4"
                            labelClassName="w-full"
                            name={'home_type'}
                            value={item.name}
                          />
                        );
                      })}
                    </CheckboxGroup>
                  )}
                />
              </div>
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
                      label="Department Name"
                      value={modalData?.name}
                      onChange={(e) =>
                        setModalData({
                          ...modalData,
                          name: e.target.value,
                        })
                      }
                      className="rounded-lg bg-background"
                    />
                    <Input
                      type="text"
                      label="Department Value"
                      value={modalData?.value}
                      onChange={(e) =>
                        setModalData({
                          ...modalData,
                          value: e.target.value,
                        })
                      }
                      className="rounded-lg bg-background"
                    />
                  </div>
                </div>
                <div className="flex items-center justify-end gap-3">
                  <Button
                    type="submit"
                    size="md"
                    className="col-span-2"
                    onClick={() => handleSaveDepartment(modalData)}
                  >
                    Save
                  </Button>
                  <Button
                    size="md"
                    color="danger"
                    onClick={() => setIsDepartmentModalOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Modal>
        </form>
      </div>
      <div className=" w-0 @5xl:col-span-1" />
    </>
  );
}
