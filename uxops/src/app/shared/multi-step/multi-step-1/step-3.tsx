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
import { PiXBold } from 'react-icons/pi';

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
import Image from 'next/image';
import Department from '../../appointment/dashboard/department';

export default function StepThree() {
  const { step, gotoNextStep } = useStepperOne();
  const [formData, setFormData] = useAtom(formDataAtom);

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
      teams: [
        {
          id: 1,
          name: 'Web Development',
          size: 10,
          manager: 'John Doe',
          product: 'Product A',
          members: ['John Doe', 'Jane Smith', 'Bob Johnson'],
        },
        {
          id: 2,
          name: 'Infrastructure',
          size: 8,
          manager: 'Sarah Lee',
          product: 'Product B',
          members: ['Sarah Lee', 'Alex Chen', 'Emily Park'],
        },
      ],
    },
    {
      id: 2,
      name: 'HR',
      teams: [
        {
          id: 3,
          name: 'Recruitment',
          size: 6,
          manager: 'Michael Brown',
          product: 'Product C',
          members: ['Michael Brown', 'Jessica Lee', 'David Kim'],
        },
      ],
    },
    {
      id: 3,
      name: 'Marketing',
      teams: [
        {
          id: 4,
          name: 'Digital Marketing',
          size: 9,
          manager: 'Emily Nguyen',
          product: 'Product A',
          members: ['Emily Nguyen', 'Tom Wilson', 'Sophia Garcia'],
        },
      ],
    },
  ]);
  const [selectedDepartment, setSelectedDepartment] = useState<any>(null);
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  const handleAddDepartment = () => {
    const newDepartment = {
      id: departments.length + 1,
      name: 'New Department',
      teams: [],
    };
    setDepartments([...departments, newDepartment]);
    setSelectedDepartment(newDepartment);
  };

  const handleDeleteTeam = (team: any) => {
    const updatedDepartment = {
      ...selectedDepartment,
      teams: selectedDepartment.teams.filter((t: any) => t.id !== team.id),
    };
    const updatedDepartments = departments.map((dept) =>
      dept.id === selectedDepartment.id ? updatedDepartment : dept
    );
    setDepartments(updatedDepartments);
    setIsTeamModalOpen(false);
    setSelectedTeam(null);
  };

  const handleSaveTeam = (team: any) => {
    const updatedDepartment = {
      ...selectedDepartment,
      teams: [...selectedDepartment.teams, team],
    };
    const updatedDepartments = departments.map((dept) =>
      dept.id === selectedDepartment.id ? updatedDepartment : dept
    );
    setDepartments(updatedDepartments);
    setIsTeamModalOpen(false);
    setSelectedTeam(null);
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
                Please edit the departments that are available to monitor in your
                organization.
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
                  <div className="text-sm text-muted-foreground">
                    {department.teams.length} teams
                  </div>
                </div>
                <div className="grid gap-4">
                  {department.teams.map((team) => (
                    <div
                      key={team.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedTeam(team);
                        setModalData(team);
                        setModalType('Edit');
                        setIsTeamModalOpen(true);
                      }}
                      className={`grid gap-2 border-b pb-4 last:border-b-0 last:pb-0 ${
                        selectedTeam?.id === team.id
                          ? 'rounded-md bg-muted/40 p-4'
                          : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="font-medium">{team.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {team.size} members
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Manager: {team.manager}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Product: {team.product}
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={(e) => {
                      e.stopPropagation();
                      console.log(department);
                      setSelectedDepartment(department);
                      setModalData({
                        id: department?.teams.length + 1,
                        name: 'New Team',
                        size: 0,
                        manager: '',
                        product: '',
                        members: [],
                      });
                      setModalType('Add');
                      setIsTeamModalOpen(true);
                    }}
                  >
                    Add Team
                  </Button>
                </div>
              </div>
            ))}
            <Modal
              isOpen={isTeamModalOpen}
              onClose={() => setIsTeamModalOpen(false)}
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
                      <div className="text-sm font-medium">Team Name</div>
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
                    <div className="grid gap-2">
                      <div className="text-sm font-medium">Team Size</div>
                      <Input
                        id="team-size"
                        type="number"
                        defaultValue={modalData?.size}
                        onChange={(e) =>
                          setModalData({
                            ...modalData,
                            size: parseInt(e.target.value),
                          })
                        }
                        className="rounded-lg bg-background"
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="text-sm font-medium">Team Manager</div>
                      <Input
                        id="team-manager"
                        type="text"
                        defaultValue={modalData?.manager}
                        onChange={(e) =>
                          setModalData({
                            ...modalData,
                            manager: e.target.value,
                          })
                        }
                        className="rounded-lg bg-background"
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="text-sm font-medium">Product</div>
                      <Input
                        id="team-product"
                        type="text"
                        defaultValue={modalData?.product}
                        onChange={(e) =>
                          setModalData({
                            ...modalData,
                            product: e.target.value,
                          })
                        }
                        className="rounded-lg bg-background"
                      />
                    </div>
                    <div className="grid gap-2">
                      <div className="text-sm font-medium">Team Members</div>
                      <Textarea
                        id="team-members"
                        defaultValue={modalData?.members?.join(', ')}
                        onChange={(e) =>
                          setModalData({
                            ...modalData,
                            members: e.target.value
                              .split(',')
                              .map((m) => m.trim()),
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
                      onClick={() => handleSaveTeam(modalData)}
                    >
                      Save
                    </Button>
                    {modalType === 'Add' ? (
                      <Button
                        size="md"
                        variant="outline"
                        onClick={() => setIsTeamModalOpen(false)}
                      >
                        Cancel
                      </Button>
                    ) : (
                      <Button
                        size="md"
                        color="danger"
                        onClick={() => handleDeleteTeam(modalData)}
                      >
                        Delete
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </Modal>
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
