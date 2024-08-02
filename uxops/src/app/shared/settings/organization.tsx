'use client';

import { SubmitHandler } from 'react-hook-form';
import { Form } from '@ui/form-provider';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@components/form-footer';
import { formCompanyParts } from '@/app/shared/ecommerce/product/create-edit/form-nav';
import MainLocation from '@/app/(onboarding)/onboarding/Steps/Step2/MainLocation';
import CompanyName from '@/app/(onboarding)/onboarding/Steps/Step2/CompanyName';
import CompanyIndustry from '@/app/(onboarding)/onboarding/Steps/Step2/CompanyIndustry';
import AddLocations from '@/app/(onboarding)/onboarding/Steps/Step2/AddLocations';
import NumberOfEmployees from '@/app/(onboarding)/onboarding/Steps/Step2/NumberOfEmployees';
import DataCenterLocations from '@/app/(onboarding)/onboarding/Steps/Step2/DataCenterLocations';
import PublicCloud from '@/app/(onboarding)/onboarding/Steps/Step2/PublicCloudProvider';
import { Element } from 'react-scroll';
import { useAtom } from 'jotai';
import {
  formStep2Schema,
  FormStep2Schema,
  LocationSchema,
  RealLocationSchema,
} from '@/validators/onboarding-settings.schema';
import { useUserProfile } from '@/lib/providers/user-profile-provider';
import { useEffect, useState } from 'react';
import { getOrganization, updateOrganization } from '@/utils/organizations';
import { getOrgLocation, updateOrgLocation } from '@/utils/org_locations';
import {
  getOrgCloudProvider,
  updateOrgCloudProvider,
} from '@/utils/org_cloud_providers';
import { formDataAtom } from '@/app/(onboarding)/onboarding/Steps';
import { errorNotification, successNotification } from '@/utils/notification';
import { useSupabase } from '@/lib/providers/supabase-provider';

const MAP_STEP_TO_COMPONENT = {
  [formCompanyParts.companyName]: CompanyName,
  [formCompanyParts.companyIndustry]: CompanyIndustry,
  [formCompanyParts.mainLocation]: MainLocation,
  [formCompanyParts.addLocations]: AddLocations,
  [formCompanyParts.totalNumberOfEmployees]: NumberOfEmployees,
  [formCompanyParts.dataCenterLocations]: DataCenterLocations,
  [formCompanyParts.publicCloudProvider]: PublicCloud,
};

export default function StepTwo() {
  const { userProfile, refetchUserProfile } = useUserProfile();
  const { supabase } = useSupabase();
  const [organizationDetail, setOrganizationDetail] = useAtom(formDataAtom);
  const [isLoading, setIsLoading] = useState(false);

  async function getData() {
    const { data: organizationData } = await getOrganization({
      id: userProfile?.org_id,
    });
    const { data: locationData } = await getOrgLocation(userProfile?.org_id);
    const { data: cloudProvdierData } = await getOrgCloudProvider(
      userProfile?.org_id
    );
    let organizationInfo: any = {};
    organizationInfo.id = organizationData.id;
    organizationInfo.name = organizationData.name;
    organizationInfo.industry_id = organizationData.industry_id;
    organizationInfo.total_employees = organizationData.total_employees;
    organizationInfo.add_locations = [];
    organizationInfo.data_locations = [];
    locationData.map((it: any) => {
      if (it.type === 'MAIN') {
        organizationInfo.main_location = it.address;
      } else if (it.type === 'SECONDARY') {
        organizationInfo.secondary_location = it.address;
      } else if (it.type === 'ADD') {
        organizationInfo.add_locations = [
          ...organizationInfo.add_locations,
          it,
        ];
      } else if (it.type === 'DATA_CENTER') {
        organizationInfo.data_locations = [
          ...organizationInfo.data_locations,
          it,
        ];
      }
    });
    organizationInfo.public_cloud_provider = cloudProvdierData.map(
      (it: any) => it.provider_id
    );

    setOrganizationDetail(organizationInfo);
  }

  useEffect(() => {
    getData();
  }, []);

  const onSubmit: SubmitHandler<FormStep2Schema> = async (data) => {
    setOrganizationDetail({
      ...organizationDetail,
      id: data.id,
      name: data.name,
      industry_id: data.industry_id,
      total_employees: data.total_employees,
      main_location: data.main_location,
      secondary_location: data.secondary_location,
      add_locations: data.add_locations ?? [],
      data_locations: data.data_locations ?? [],
      public_cloud_provider: data.public_cloud_provider,
    });
    setIsLoading(true);
    try {
      if (userProfile?.onboarding_step < 2) {
        await supabase
          .from('users')
          .update({ onboarding_step: 2 })
          .eq('id', userProfile?.id);
        await refetchUserProfile({ isFreshData: true });
      }
      await updateOrganization({
        id: data.id ?? 0,
        name: data.name,
        industry_id: data.industry_id,
        total_employees: data.total_employees,
      });
      let add: RealLocationSchema[] =
        data.add_locations?.map((it: LocationSchema) => {
          return {
            type: 'ADD',
            address: null,
            name: it.name,
            country: it.country,
            state: it.state,
            city: it.city,
          };
        }) ?? [];
      let dataCenter: RealLocationSchema[] =
        data.data_locations?.map((it: LocationSchema) => {
          return {
            type: 'DATA_CENTER',
            address: null,
            name: it.name,
            country: it.country,
            state: it.state,
            city: it.city,
          };
        }) ?? [];
      const locations = [
        {
          type: 'MAIN',
          address: data.main_location,
          name: null,
          country: null,
          state: null,
          city: null,
        },
        {
          type: 'SECONDARY',
          address: data.secondary_location,
          name: null,
          country: null,
          state: null,
          city: null,
        },
        ...add,
        ...dataCenter,
      ];
      await updateOrgLocation({ org_id: userProfile?.org_id, locations });
      await updateOrgCloudProvider({
        org_id: userProfile?.org_id,
        public_cloud_providers: data.public_cloud_provider,
      });
      successNotification('Sucessfully Updated!');
    } catch (error) {
      errorNotification('Error!');
    }
    setIsLoading(false);
  };

  return (
    <Form<FormStep2Schema>
      validationSchema={formStep2Schema}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          id: undefined,
          name: '',
          industry_id: undefined,
          main_location: '',
          secondary_location: '',
          add_locations: [],
          total_employees: undefined,
          data_locations: [],
          public_cloud_provider: undefined,
        },
      }}
      resetValues={organizationDetail}
    >
      {() => {
        return (
          <>
            <FormGroup
              title="Organization Infomation"
              description="Please enter your organizational info"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />
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
