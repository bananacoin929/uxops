'use client';
import { useEffect, useState } from 'react';
import { Controller, SubmitHandler } from 'react-hook-form';
import { Input } from 'rizzui';
import {
  formStep1Schema,
  FormStep1Schema,
} from '@/validators/onboarding-settings.schema';
import { PhoneNumber } from '@ui/phone-input';
import FormGroup from '@/app/shared/form-group';
import FormFooter from '@components/form-footer';
import { Form } from '@ui/form';
import { PiEnvelopeSimple } from 'react-icons/pi';
import { getOrgAdmin, updateOrgAdmin } from '@/utils/org_admins';
import { useUserProfile } from '@/lib/providers/user-profile-provider';
import { errorNotification, successNotification } from '@/utils/notification';

export default function OrganizationAdmin() {
  const { userProfile } = useUserProfile();
  const [orgAdminData, setOrgAdminData] = useState<FormStep1Schema>({
    id: 0,
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  async function get() {
    const { data, error } = await getOrgAdmin(userProfile?.org_id);
    data &&
      setOrgAdminData({
        id: data?.id,
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        phone: data?.phone,
      });
    console.log('*******org_admin', data, error);
  }

  useEffect(() => {
    get();
  }, []);

  const onSubmit: SubmitHandler<FormStep1Schema> = async (data) => {
    console.log(data);
    setIsLoading(true);
    const { error } = await updateOrgAdmin({
      ...data,
      updated_at: new Date(),
    });
    if (error) errorNotification(error.message);
    else successNotification('Successfully updated!');
    setIsLoading(false);
  };

  return (
    <Form<FormStep1Schema>
      validationSchema={formStep1Schema}
      onSubmit={onSubmit}
      className="@container"
      useFormProps={{
        mode: 'onChange',
        defaultValues: {
          first_name: orgAdminData.first_name,
          last_name: orgAdminData.last_name,
          email: orgAdminData.email,
          phone: orgAdminData.phone,
        },
      }}
      resetValues={orgAdminData}
    >
      {({ register, control, formState: { errors } }) => {
        return (
          <>
            <FormGroup
              title="Organization Administrator Details"
              description="Please enter your organizational administrator details"
              className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
            />
            <input type="hidden" placeholder="id" {...register('id')} />
            <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
              <FormGroup
                title="Name"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  placeholder="First Name"
                  {...register('first_name')}
                  error={errors.first_name?.message}
                  className="flex-grow"
                />
                <Input
                  placeholder="Last Name"
                  {...register('last_name')}
                  error={errors.last_name?.message}
                  className="flex-grow"
                />
              </FormGroup>
              <FormGroup
                title="Email Address"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Input
                  className="col-span-full"
                  prefix={
                    <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
                  }
                  type="email"
                  placeholder="georgia.young@example.com"
                  {...register('email')}
                  error={errors.email?.message}
                />
              </FormGroup>
              <FormGroup
                title="Phone Number"
                className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
              >
                <Controller
                  name="phone"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <PhoneNumber
                      country="us"
                      value={value}
                      onChange={onChange}
                      className="col-span-full rtl:[&>.selected-flag]:right-0"
                      inputClassName="rtl:pr-12"
                      buttonClassName="rtl:[&>.selected-flag]:right-2 rtl:[&>.selected-flag_.arrow]:-left-6"
                    />
                  )}
                />
              </FormGroup>
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
