'use client';

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
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
} from 'rizzui';

import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm, useFormContext } from 'react-hook-form';
import {
  formDataAtom,
  useStepperOne,
} from '@/app/(dashboard)/onboarding/Steps';
import {
  CompanyInfoSchema,
  companyInfoSchema,
} from '@/validators/multistep-form.schema';
import { PiTagBold, PiXBold } from 'react-icons/pi';

export default function StepThree() {
  const { step, gotoNextStep } = useStepperOne();
  const [formData, setFormData] = useAtom(formDataAtom);
  const [items, setItems] = useState<string[]>([]);

  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isDepartmentModalOpen, setIsDepartmentModalOpen] = useState(false);
  const [modalType, setModalType] = useState('Add');
  const [modalData, setModalData] = useState<any>({});

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
  const [departments, setDepartments] = useState([
    {
      id: 1,
      name: 'IT',
      totalMember: 0,
    },
    {
      id: 2,
      name: 'HR',
      totalMember: 0,
    },
    {
      id: 3,
      name: 'Marketing',
      totalMembers: 0,
    },
  ]);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  const handleAddDepartment = () => {
    const newDepartment = {
      id: departments.length + 1,
      name: 'New Department',
      totalMembers: 0,
    };
    setDepartments([...departments, newDepartment]);
    setSelectedDepartment(newDepartment);
  };

  const handleSaveDepartment = (department: any) => {
    const updatedDepartment = {
      ...selectedDepartment,
      name: department.name,
    };
    const updatedDepartments = departments.map((dept) =>
      dept.id === selectedDepartment.id ? updatedDepartment : dept
    );
    setDepartments(updatedDepartments);
    setIsDepartmentModalOpen(false);
    setSelectedTeam(null);
  };

  const handleDeleteDepartment = (department: any) => {
    const updatedDepartments = departments.filter(
      (dept) => dept.id !== department.id
    );
    setDepartments(updatedDepartments);
    setIsDepartmentModalOpen(false);
    setSelectedTeam(null);
  };

  // const { register, setValue } = useFormContext();
  const [itemText, setItemText] = useState<string>('');

  function handleItemAdd(): void {
    if (itemText.trim() !== '') {
      const newItem: string = itemText;

      setItems([...items, newItem]);
      // setValue('departments', [...items, newItem]);
      setItemText('');
    }
  }

  function handleItemRemove(text: string): void {
    const updatedItems = items.filter((item) => item !== text);
    setItems(updatedItems);
  }

  return (
    <>
      <div className=" w-0 @5xl:col-span-1" />
      <div className="col-span-full flex items-center justify-center @5xl:col-span-10">
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={onSubmit}
          className="flex-grow rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0"
        >
          <section className="grid grid-cols-1 gap-6 p-4 md:grid-cols-2 md:gap-8 md:p-6 lg:grid-cols-3 lg:gap-10 xl:grid-cols-3">
            <div className="col-span-full">
              <h1 className="mb-4 text-2xl font-bold">Departments</h1>
              <p className="mb-6 text-gray-500 dark:text-gray-400">
                Please edit the departments that are available to monitor in
                your organization.
              </p>
              <div className="flex items-center justify-between">
                <Input
                  type="search"
                  placeholder="Search departments..."
                  className="rounded-lg bg-background sm:w-[300px] md:w-[200px] lg:w-[300px]"
                />
                <Button
                  variant="outline"
                  size="md"
                  className=""
                  onClick={handleAddDepartment}
                >
                  Add Department
                </Button>
              </div>
            </div>
            {departments.map((department) => (
              <div
                key={department.id}
                onClick={() => {
                  setSelectedDepartment(department);
                  setModalData(department);
                  setIsDepartmentModalOpen(true);
                }}
                className={`cursor-pointer rounded-lg border bg-background p-4 transition-colors ${
                  selectedDepartment?.id === department.id ? 'bg-muted' : ''
                }`}
              >
                <div className="mb-4">
                  <div className="text-lg font-bold text-black">
                    {department.name}
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center">
                    <Input
                      value={itemText}
                      // placeholder={`Enter a ${name}`}
                      onChange={(e) => setItemText(e.target.value)}
                      prefix={<PiTagBold className="h-4 w-4" />}
                      className="w-full"
                    />
                    <input type="hidden" />
                    <Button
                      onClick={handleItemAdd}
                      className="ms-4 shrink-0 text-sm @lg:ms-5"
                    >
                      Add
                    </Button>
                  </div>

                  {items.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {items.map((text, index) => (
                        <div
                          key={index}
                          className="flex items-center rounded-full border border-gray-300 py-1 pe-2.5 ps-3 text-sm font-medium text-gray-700"
                        >
                          {text}
                          <button
                            onClick={() => handleItemRemove(text)}
                            className="ps-2 text-gray-500 hover:text-gray-900"
                          >
                            <PiXBold className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <Input
                    label="TotalNumber"
                    className="col-span-full"
                    type="number"
                  />
                  {/* <div className="font-medium">{department.locations}</div> */}
                  {/* <div className="font-medium">{department.totalMembers}</div> */}
                </div>
              </div>
            ))}
            <Modal
              isOpen={isDepartmentModalOpen}
              onClose={() => setIsDepartmentModalOpen(false)}
            >
              <div className="m-auto px-7 pb-8 pt-6">
                <div className="mb-7 flex items-center justify-between">
                  <Text as="b" className="text-lg">
                    {modalType} Team
                  </Text>
                  <ActionIcon
                    size="sm"
                    variant="text"
                    onClick={() => setIsTeamModalOpen(false)}
                  >
                    <PiXBold className="h-5 w-5 text-base" />
                  </ActionIcon>
                </div>
                <div className="grid grid-cols-1 gap-x-5 gap-y-6 [&_label>span]:font-medium">
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <div className="text-sm font-medium">Department Name</div>
                      <Input
                        id="team-name"
                        type="text"
                        defaultValue={modalData?.name}
                        onChange={(e) =>
                          setModalData({
                            ...modalData,
                            name: e.target.value,
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
                      onClick={() => handleDeleteDepartment(modalData)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </Modal>
          </section>
        </form>
      </div>
      <div className=" w-0 @5xl:col-span-1" />
    </>
  );
}
