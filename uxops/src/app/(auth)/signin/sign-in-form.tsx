'use client';

import Link from 'next/link';
import { SubmitHandler } from 'react-hook-form';
import { Input, Text, Button, Password, Switch } from 'rizzui';
import { useMedia } from '@hooks/use-media';
import { Form } from '@ui/form';
import { routes } from '@/config/routes';
import { loginSchema, LoginSchema } from '@/validators/login.schema';
import { useSupabase } from '@/lib/providers/supabase-provider';
import { useRouter } from 'next/navigation';
import { errorNotification, successNotification } from '@/utils/notification';
import { setGlobalInLocal } from '@/lib/providers/session';
import { useUserProfile } from '@/lib/providers/user-profile-provider';

const initialValues: LoginSchema = {
  email: '',
  password: '',
  rememberMe: true,
};

export default function SignInForm() {
  const { supabase } = useSupabase();
  const router = useRouter();
  const { userProfile, refetchUserProfile } = useUserProfile();

  const isMedium = useMedia('(max-width: 1200px)', false);
  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    console.log('Sign in form data', data);

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });
    if (error) {
      errorNotification(error.message);
    } else {
      await refetchUserProfile({ isFreshData: true });
      setGlobalInLocal(JSON.stringify(userProfile));
      successNotification('Welcome to our homepage!');
      if (userProfile?.is_onboarding === false) router.replace('/onboarding');
      else router.replace('/');
    }
  };

  return (
    <>
      <Form<LoginSchema>
        validationSchema={loginSchema}
        onSubmit={onSubmit}
        useFormProps={{
          mode: 'onChange',
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
            <div className="flex items-center justify-between lg:pb-2">
              <Switch label="Remember Me" {...register('rememberMe')} />
              <Link
                href={routes.auth.forgotpassword}
                className="h-auto p-0 text-sm font-semibold text-gray-600 underline transition-colors hover:text-primary hover:no-underline"
              >
                Forget Password?
              </Link>
            </div>

            <Button
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
            >
              Sign In
            </Button>
          </div>
        )}
      </Form>
      <Text className="mt-5 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Don’t have an account?{' '}
        <Link
          href={routes.auth.signup}
          className="font-semibold text-gray-700 transition-colors hover:text-gray-1000"
        >
          Sign Up
        </Link>
      </Text>
    </>
  );
}
