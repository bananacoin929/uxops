'use client';

import {
  createContext,
  useMemo,
  useState,
  useContext,
  useEffect,
  type PropsWithChildren,
} from 'react';
import type { Session } from '@supabase/auth-helpers-nextjs';
// import { UserProfile } from "../types";
import { useSupabase } from './supabase-provider';
import { useRouter, useSearchParams } from 'next/navigation';
import { getAllDataFromLocal, setGlobalInLocal } from './session';

export interface UserProfileContextStateProps {
  userProfile: any;
  // eslint-disable-next-line no-unused-vars
  refetchUserProfile: ({ isFreshData }?: any) => Promise<void>;
}

export const initialUserProfileContextState: UserProfileContextStateProps = {
  userProfile: null,
  refetchUserProfile: async () => {},
};

export const UserProfileContext = createContext<UserProfileContextStateProps>(
  initialUserProfileContextState
);

export const AuthProvider = ({
  children,
  initialSession,
  initialUserProfile,
}: PropsWithChildren<{
  initialSession: Session | null;
  initialUserProfile: any;
}>) => {
  const router = useRouter();
  const { supabase } = useSupabase();
  const [session, setSession] = useState<Session | null>(initialSession);
  const [userProfile, setUserProfile] = useState<any>(initialUserProfile);

  useEffect(() => {
    init();
  }, [supabase]);

  async function init() {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    setSession(session);
    if (session) {
      const { data } = await supabase
        .from('users')
        .select('*')
        .eq('id', session?.user?.id)
        .single();
      if (data) {
        setUserProfile(data);
      }
    }
  }

  const value: UserProfileContextStateProps = useMemo(() => {
    async function refetchUserProfile(params?: any) {
      try {
        const isFreshData = params?.isFreshData || false;
        const userData: any = getAllDataFromLocal();

        if (userData?.user?.id) {
          if (!userData?.user?.id || isFreshData) {
            const { data } = await supabase
              .from('users')
              .select('*')
              .eq('id', userData?.user?.id || session?.user?.id)
              .single();
            if (data) {
              setUserProfile(data);
            } else {
              setUserProfile(data);
            }
            setGlobalInLocal(JSON.stringify(data));
          } else {
            setUserProfile(userData);
          }
        } else init();
      } catch (error) {
        setUserProfile(null);
      }
    }

    const baseContextValue = {
      userProfile,
      refetchUserProfile,
    };
    return baseContextValue;
  }, [session?.user?.id || null, userProfile, session]);

  return (
    <UserProfileContext.Provider value={value}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (context === undefined) {
    throw new Error(`useUserProfile must be used within a AuthProvider.`);
  }
  return {
    userProfile: context.userProfile ?? null,
    refetchUserProfile: context.refetchUserProfile,
  };
};
