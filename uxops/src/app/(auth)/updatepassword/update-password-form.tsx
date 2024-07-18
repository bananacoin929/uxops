'use client';

import Link from 'next/link';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { SubmitHandler } from 'react-hook-form';
import { routes } from '@/config/routes';
import { Input, Button, Text, Password } from 'rizzui';
import { Form } from '@ui/form';
import { useMedia } from '@hooks/use-media';
import {
  resetPasswordSchema,
  ResetPasswordSchema,
} from '@/validators/forget-password.schema';
import { errorNotification, successNotification } from '@/utils/notification';
import { useSupabase } from '@/lib/providers/supabase-provider';
import { useRouter } from 'next/navigation';

const initialValues = {
  password: '',
};

export default function UpdatePasswordForm() {
  const { supabase } = useSupabase();
  const router = useRouter();

  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const onSubmit: SubmitHandler<ResetPasswordSchema> = async (data) => {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });
    if (error) {
      errorNotification(error.message);
    } else {
      // Go to Home page
      successNotification('Password updated.');
      router.replace('/');
    }

    setReset(initialValues);
  };

  return (
    <>
      <Form<ResetPasswordSchema>
        validationSchema={resetPasswordSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Password
              label="Password"
              placeholder="Enter your password"
              size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="block">
              <Button
                className="mt-1 w-full"
                type="submit"
                size={isMedium ? 'lg' : 'xl'}
              >
                Update Password
              </Button>
            </div>
          </div>
        )}
      </Form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t want to reset?{' '}
        <Link
          href={routes.auth.signin}
          className="font-semibold text-gray-700 transition-colors hover:text-gray-1000"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
