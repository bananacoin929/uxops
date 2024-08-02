import { Input, Switch, Password, Button } from 'rizzui';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { createIntegration, updateIntegration } from '@/utils/integrations';
import { useUserProfile } from '@/lib/providers/user-profile-provider';
import { errorNotification, successNotification } from '@/utils/notification';

interface AzureSchema {
  enabled: boolean;
  clientID: string;
  clientSecret: string;
  tenantID: string;
}

const azureSchema = z.object({
  enabled: z.boolean(),
  clientID: z.string().min(1, 'Application (client) ID is Required'),
  clientSecret: z.string().min(1, 'Secret Value is Required'),
  tenantID: z.string().min(1, 'Azure Tenant ID is Required'),
});

export default function CompanyName({
  data,
  setData,
  getData,
}: {
  data: any;
  setData: any;
  getData: any;
}) {
  const { userProfile } = useUserProfile();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<AzureSchema>({
    resolver: zodResolver(azureSchema),
    defaultValues: {
      enabled: false,
      clientID: '',
      clientSecret: '',
      tenantID: '',
    },
  });

  useEffect(() => {
    setValue('clientID', data['azure']?.clientID);
    setValue('clientSecret', data['azure']?.clientSecret);
    setValue('tenantID', data['azure']?.tenantID);
    setValue('enabled', data['azure']?.enabled);
  }, [data]);

  const onSubmit: SubmitHandler<AzureSchema> = async (updates) => {
    console.log(updates);
    try {
      if (!data?.id) {
        await createIntegration({ user_id: userProfile.id, azure: updates });
      } else {
        await updateIntegration({ ...data, azure: updates });
      }
      setData({ ...data, azure: updates });
      getData();
      successNotification('Sucessfully Updated!');
    } catch (err) {
      errorNotification('Error');
      console.log(err);
    }
    // setData({ ...data, azure: updates });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col items-center justify-center gap-4"
    >
      <Switch
        variant="flat"
        label="Azure enabled"
        className="w-3/5"
        {...register('enabled')}
        error={errors.enabled?.message as string}
      />
      <Input
        label="Application (client) ID"
        placeholder="Enter your name"
        className="w-3/5"
        {...register('clientID')}
        error={errors.clientID?.message as string}
      />
      <Password
        label="Secret Value"
        placeholder="Enter your name"
        className="w-3/5"
        {...register('clientSecret')}
        error={errors.clientSecret?.message as string}
      />
      <Input
        label="Azure Tenant ID"
        placeholder="Enter your name"
        className="w-3/5"
        {...register('tenantID')}
        error={errors.tenantID?.message as string}
      />
      <div className="flex w-3/5 items-center justify-end gap-2">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button type="submit" size="sm">
          Save
        </Button>
      </div>
    </form>
  );
}
