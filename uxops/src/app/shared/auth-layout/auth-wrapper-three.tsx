'use client';

import logoImg from '@public/logo-short.svg';
import Image from 'next/image';
import Link from 'next/link';
import { Button, Title } from 'rizzui';
import cn from '@utils/class-names';
import { PiArrowLeftBold } from 'react-icons/pi';
import { FcGoogle } from 'react-icons/fc';
import OrSeparation from '@/app/shared/auth-layout/or-separation';
import { useSupabase } from '@/lib/providers/supabase-provider';
import { SITE_URL } from '@/config';

export default function AuthWrapperThree({
  children,
  title,
  isSocialLoginActive = false,
  isSignIn = false,
  className = '',
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  isSocialLoginActive?: boolean;
  isSignIn?: boolean;
  className?: string;
}) {
  const { supabase } = useSupabase();

  const GoogleSign = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${SITE_URL}/auth/callback`,
        queryParams: {
          access_type: 'offline',
          prompt: 'consent',
        },
      },
    });

    if (error) {
      console.error('Error signing in with Google:', error.message);
    } else {
      console.log('User signed in with Google:', data);
    }
  };

  const MicrosoftSign = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'azure',
      options: {
        redirectTo: `${SITE_URL}/auth/callback`,
        scopes: 'email',
      },
    });

    if (error) {
      console.error('Error signing in with Google:', error.message);
    } else {
      console.log('User signed in with Google:', data);
    }
  };

  return (
    <>
      <div className="relative flex h-screen w-full flex-col justify-center bg-gradient-to-tr from-[#136A8A] to-[#267871] px-4 md:px-12 lg:px-28">
        <Link
          href={'/'}
          className="mb:pb-3 start-4 z-10 flex items-center justify-center pb-6 pt-3 text-sm font-medium text-white/80 hover:text-white md:absolute md:top-1/2 md:-translate-y-1/2 md:rounded-full "
        >
          <PiArrowLeftBold />
          <span className="-mt-px ms-1 font-lexend">Back to home</span>
        </Link>
        <div
          className={cn(
            'mx-auto w-full max-w-md rounded-xl bg-white px-4 py-9 dark:bg-gray-50 sm:px-6 md:max-w-xl md:px-10 md:py-12 lg:max-w-[700px] lg:px-16 xl:rounded-2xl 3xl:rounded-3xl',
            className
          )}
        >
          <div className="flex flex-col items-center">
            <Link href={'/'} className="mb-7 inline-block max-w-[64px] lg:mb-9">
              <Image src={logoImg} alt="Isomorphic" className="dark:invert" />
            </Link>
            <Title
              as="h2"
              className="mb-7 text-center text-[26px] leading-snug md:text-3xl md:!leading-normal lg:mb-10 lg:text-4xl lg:leading-normal"
            >
              {title}
            </Title>
          </div>
          {isSocialLoginActive && (
            <>
              <div className="flex flex-col gap-4 pb-6 md:flex-row md:gap-6 md:pb-7">
                <Button
                  className="h-11 w-full"
                  variant="outline"
                  onClick={() => MicrosoftSign()}
                >
                  <Image src="/Microsoft.ico" alt="microsoft" width={18} height={18}/>
                  <span className="truncate ml-2">Signin With Microsoft</span>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 w-full"
                  onClick={() => GoogleSign()}
                >
                  <FcGoogle className="me-2 h-5 w-5 shrink-0" />
                  <span className="truncate">Signin With Google</span>
                </Button>
              </div>
              <OrSeparation
                title={`Or, Sign ${isSignIn ? 'in' : 'up'} with your email`}
                isCenter
                className="mb-4"
              />
            </>
          )}
          {children}
        </div>
      </div>
    </>
  );
}
