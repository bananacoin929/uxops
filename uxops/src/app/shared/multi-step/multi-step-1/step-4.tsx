'use client';

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { Switch, Checkbox, Select, Button } from 'rizzui';
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

export default function StepFour() {
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

  const [products, setProducts] = useState([
    {
      id: 1,
      vendor: {
        name: 'Microsoft',
        logo: '/placeholder.svg',
      },
      category: 'Productivity',
      name: 'Microsoft Office 365',
      description: 'Powerful productivity suite for work and home',
      features: [
        {
          name: 'Word, Excel, PowerPoint',
          isSelected: false,
        },
        {
          name: 'OneDrive cloud storage',
          isSelected: false,
        },
        {
          name: 'Outlook email and calendar',
          isSelected: false,
        },
        {
          name: 'Teams for collaboration',
          isSelected: false,
        },
        {
          name: 'Continuous updates',
          isSelected: false,
        },
      ],
      isActive: true,
      type: 'desktop',
      department: 'IT',
      usage: 'Office',
      office: 'US',
      region: 'North America',
    },
    {
      id: 2,
      vendor: {
        name: 'Microsoft',
        logo: '/placeholder.svg',
      },
      category: 'Operating System',
      name: 'Windows 11',
      description: 'The latest and greatest Windows operating system',
      features: [
        {
          name: 'Modern user interface',
          isSelected: false,
        },
        {
          name: 'Improved multitasking',
          isSelected: false,
        },
        {
          name: 'Enhanced security features',
          isSelected: false,
        },
        {
          name: 'Seamless integration with Microsoft apps',
          isSelected: false,
        },
      ],
      isActive: false,
      type: 'desktop',
      department: 'IT',
      usage: 'Office',
      office: 'EU',
      region: 'Europe',
    },
    {
      id: 3,
      vendor: {
        name: 'Microsoft',
        logo: '/placeholder.svg',
      },
      category: 'Gaming',
      name: 'Xbox Game Pass Ultimate',
      description: 'Unlimited access to a vast library of games',
      features: [
        {
          name: 'Play on Xbox or PC',
          isSelected: false,
        },
        {
          name: 'Cloud gaming',
          isSelected: false,
        },
        {
          name: 'EA Play included',
          isSelected: false,
        },
        {
          name: 'Xbox Live Gold',
          isSelected: false,
        },
      ],
      isActive: true,
      type: 'mobile',
      department: 'Marketing',
      usage: 'Entertainment',
      office: 'New York',
      region: 'North America',
    },
    {
      id: 4,
      vendor: {
        name: 'Microsoft',
        logo: '/placeholder.svg',
      },
      category: 'Development',
      name: 'Visual Studio Code',
      description: 'Powerful code editor for any language',
      features: [
        {
          name: 'Syntax highlighting',
          isSelected: false,
        },
        {
          name: 'Intelligent code completion',
          isSelected: false,
        },
        {
          name: 'Integrated debugging',
          isSelected: false,
        },
        {
          name: 'Extensions for customization',
          isSelected: false,
        },
      ],
      isActive: false,
      type: 'web',
      department: 'IT',
      usage: 'Development',
      office: 'Washington',
      region: 'North America',
    },
    {
      id: 5,
      vendor: {
        name: 'Intuit',
        logo: '/placeholder.svg',
      },
      category: 'Finance',
      name: 'QuickBooks Online',
      description: 'Accounting software for small businesses',
      features: [
        {
          name: 'Invoicing and billing',
          isSelected: false,
        },
        {
          name: 'Expense tracking',
          isSelected: false,
        },
        {
          name: 'Financial reporting',
          isSelected: false,
        },
        {
          name: 'Tax preparation',
          isSelected: false,
        },
      ],
      isActive: true,
      type: 'web',
      department: 'Finance',
      usage: 'Accounting',
      office: 'US',
      region: 'North America',
    },
    {
      id: 6,
      vendor: {
        name: 'Adobe',
        logo: '/placeholder.svg',
      },
      category: 'Design',
      name: 'Adobe Creative Cloud',
      description: 'Suite of creative tools for design and media',
      features: [
        {
          name: 'Photoshop',
          isSelected: false,
        },
        {
          name: 'Illustrator',
          isSelected: false,
        },
        {
          name: 'InDesign',
          isSelected: false,
        },
        {
          name: 'After Effects',
          isSelected: false,
        },
      ],
      isActive: true,
      type: 'desktop',
      department: 'Marketing',
      usage: 'Design',
      office: 'EU',
      region: 'Europe',
    },
  ]);
  const toggleProductStatus = (id: number) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, isActive: !product.isActive }
          : product
      )
    );
  };
  const toggleFeatureSelected = (productId: number, featureIndex: number) => {
    setProducts(
      products.map((product) =>
        product.id === productId
          ? {
              ...product,
              features: product.features.map((feature, index) =>
                index === featureIndex
                  ? { ...feature, isSelected: !feature.isSelected }
                  : feature
              ),
            }
          : product
      )
    );
  };
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedOffice, setSelectedOffice] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const handleDepartmentChange = (id: number, department: any) => {
    console.log(id, department);
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, department } : product
      )
    );
  };
  const handleOfficeChange = (id: number, office: any) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, office } : product
      )
    );
  };
  const handleRegionChange = (id: number, region: any) => {
    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, region } : product
      )
    );
  };
  console.log(products, selectedDepartment);
  return (
    <>
      <div className=" w-0 @5xl:col-span-1" />
      <div className="col-span-full flex items-center justify-center @5xl:col-span-10">
        <form
          id={`rhf-${step.toString()}`}
          onSubmit={onSubmit}
          className="flex-grow rounded-lg bg-white p-5 @4xl:p-7 dark:bg-gray-0"
        >
          <section className="grid grid-cols-1 gap-3 p-4 md:grid-cols-2 md:gap-4 md:p-6 lg:grid-cols-3 lg:gap-5 xl:grid-cols-3">
            <div className="col-span-full">
              <h1 className="mb-4 text-2xl font-bold">Product Selection</h1>
              <p className="mb-6 text-gray-500 dark:text-gray-400">
                Please select the products that are available to monitor in your
                organization.
              </p>
              <div className="mb-6 flex w-full items-center gap-4">
                <Select
                  id="department-select"
                  label="Department:"
                  value={selectedDepartment}
                  onChange={(e: any) => setSelectedDepartment(e.value)}
                  options={[
                    { value: '', label: 'All' },
                    {
                      value: 'IT',
                      label: 'IT',
                    },
                    {
                      value: 'Finance',
                      label: 'Finance',
                    },
                    {
                      value: 'Marketing',
                      label: 'Marketing',
                    },
                  ]}
                  className="w-full"
                />
                <Select
                  id="office-select"
                  label="Office:"
                  value={selectedOffice}
                  onChange={(e: any) => setSelectedOffice(e.value)}
                  className="w-full"
                  options={[
                    { value: '', label: 'All' },
                    {
                      value: 'US',
                      label: 'US',
                    },
                    {
                      value: 'EU',
                      label: 'EU',
                    },
                    {
                      value: 'New York',
                      label: 'New York',
                    },
                    {
                      value: 'Washington',
                      label: 'Washington',
                    },
                  ]}
                />
                <Select
                  id="region-select"
                  label="Region:"
                  value={selectedRegion}
                  onChange={(e: any) => setSelectedRegion(e.value)}
                  className="w-full"
                  options={[
                    { value: '', label: 'All' },
                    {
                      value: 'North America',
                      label: 'North America',
                    },
                    {
                      value: 'Europe',
                      label: 'Europe',
                    },
                  ]}
                />
              </div>
            </div>
            {products
              .filter((product) =>
                selectedDepartment
                  ? product.department === selectedDepartment
                  : true
              )
              .filter((product) =>
                selectedOffice ? product.office === selectedOffice : true
              )
              .filter((product) =>
                selectedRegion ? product.region === selectedRegion : true
              )
              .map((product) => (
                <div
                  key={product.id}
                  className={`overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-950 ${
                    'border-2 border-green-500 dark:border-green-500'
                    // : 'border-2 border-gray-200 dark:border-gray-800'
                  }`}
                >
                  <div className="flex items-center gap-4 border-b p-4 dark:border-gray-800">
                    <Image
                      src="/Microsoft.ico"
                      alt={product.vendor.name}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                    <span className="font-medium text-gray-700 dark:text-gray-300">
                      {product.vendor.name}
                    </span>
                    <span className="ml-auto font-medium text-gray-700 dark:text-gray-300">
                      {product.category}
                    </span>
                    <Button>Integrate</Button>
                    {/* <Switch
                      id={`product-${product.id}-toggle`}
                      className="ml-auto"
                      defaultChecked={product.isActive}
                      onChange={() => toggleProductStatus(product.id)}
                    /> */}
                  </div>
                  <div className="p-4">
                    <h3 className="mb-2 text-lg font-semibold">
                      {product.name}
                    </h3>
                    <p className="mb-4 text-gray-500 dark:text-gray-400">
                      {product.description}
                    </p>
                    <div className="mb-4 flex items-center">
                      <span className="mr-2 text-sm text-gray-600 dark:text-gray-400">
                        Type:
                      </span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {product.type}
                      </span>
                    </div>
                    <div className="mb-4 flex items-center">
                      <span className="mr-2 text-sm text-gray-600 dark:text-gray-400">
                        Department:
                      </span>
                      <Select
                        value={product.department}
                        onChange={(department) =>
                          handleDepartmentChange(product.id, department)
                        }
                        className="w-full max-w-[150px]"
                        options={[
                          { value: '', label: 'All' },
                          {
                            value: 'IT',
                            label: 'IT',
                          },
                          {
                            value: 'Finance',
                            label: 'Finance',
                          },
                          {
                            value: 'Marketing',
                            label: 'Marketing',
                          },
                        ]}
                      />
                    </div>
                    <div className="mb-4 flex items-center">
                      <span className="mr-2 text-sm text-gray-600 dark:text-gray-400">
                        Office:
                      </span>
                      <Select
                        value={product.office}
                        onChange={(office) =>
                          handleOfficeChange(product.id, office)
                        }
                        className="w-full max-w-[150px]"
                        options={[
                          { value: '', label: 'All' },
                          {
                            value: 'US',
                            label: 'US',
                          },
                          {
                            value: 'EU',
                            label: 'EU',
                          },
                          {
                            value: 'New York',
                            label: 'New York',
                          },
                          {
                            value: 'Washington',
                            label: 'Washington',
                          },
                        ]}
                      />
                    </div>
                    <div className="mb-4 flex items-center">
                      <span className="mr-2 text-sm text-gray-600 dark:text-gray-400">
                        Region:
                      </span>
                      <Select
                        value={product.region}
                        onChange={(region) =>
                          handleRegionChange(product.id, region)
                        }
                        className="w-full max-w-[150px]"
                        options={[
                          { value: '', label: 'All' },
                          {
                            value: 'North America',
                            label: 'North America',
                          },
                          {
                            value: 'Europe',
                            label: 'Europe',
                          },
                        ]}
                      />
                    </div>
                    <div className="mb-4 flex items-center">
                      <span className="mr-2 text-sm text-gray-600 dark:text-gray-400">
                        Usage:
                      </span>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {product.usage}
                      </span>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
                      {product.features.map((feature, index) => (
                        <li key={index}>
                          <div
                            className="flex cursor-pointer items-center"
                            onClick={() =>
                              toggleFeatureSelected(product.id, index)
                            }
                          >
                            <Checkbox
                              id={`product-${product.id}-feature-${index}`}
                              defaultChecked={feature.isSelected}
                              className="mr-2"
                            />
                            {feature.name}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </section>
        </form>
      </div>
      <div className=" w-0 @5xl:col-span-1" />
    </>
  );
}
