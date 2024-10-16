'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Password, Switch, Button, Input, Text } from 'rizzui';
import { useMedia } from '@hooks/use-media';
import { Form } from '@ui/form';
import { routes } from '@/config/routes';
import { SignUpSchema, signUpSchema } from '@/validators/signup.schema';
import { useRouter } from 'next/navigation';
import { useSupabase } from '@/lib/providers/supabase-provider';
import { SITE_URL } from '@/config';
import { errorNotification } from '@/utils/notification';

const initialValues = {
  email: '',
  password: '',
  isAgreed: false,
};

export default function SignUpForm() {
  const router = useRouter();
  const isMedium = useMedia('(max-width: 1200px)', false);
  const { supabase } = useSupabase();

  const [reset, setReset] = useState({});
  const onSubmit: SubmitHandler<SignUpSchema> = async (data) => {
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${SITE_URL}/auth/callback`,
      },
    });

    if (error) {
      errorNotification(error.message);
    } else {
      router.push('/verify');
    }
    setReset({ ...initialValues, isAgreed: false });
  };

  return (
    <>
      <Form<SignUpSchema>
        validationSchema={signUpSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />
            <div className="col-span-2 flex items-start pb-1 text-gray-700">
              <Switch
                {...register('isAgreed')}
                className="[&>label>span.transition]:shrink-0 [&>label>span]:font-medium"
                label={
                  <Text className="ps-1 text-gray-500">
                    By signing up you have agreed to our{' '}
                    <Link
                      href="/"
                      className="font-semibold text-gray-700 transition-colors hover:text-primary"
                    >
                      Terms
                    </Link>{' '}
                    &{' '}
                    <Link
                      href="/"
                      className="font-semibold text-gray-700 transition-colors hover:text-primary"
                    >
                      Privacy Policy
                    </Link>
                  </Text>
                }
              />
            </div>
            <Button
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
            >
              Create Account
            </Button>
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
