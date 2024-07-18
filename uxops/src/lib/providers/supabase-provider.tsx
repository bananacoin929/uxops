'use client';

import { type SupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { createContext, useContext, useEffect, useState } from 'react';
import { createClient } from '../supabase/client';

type SupabaseContext = {
  supabase: SupabaseClient;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createClient());
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        // The user has signed in.
        // let userEmail = session?.user.email;
        // Check if user with this email already exists
        // supabase
        //   .from("users")
        //   .select("id")
        //   .eq("email", userEmail)
        //   .single()
        //   .then(({ data: existingUser, error: existingUserError, status }) => {
        //     if (existingUserError && status !== 406) {
        //       console.log("Error checking user:", existingUserError.message);
        //     } else if (existingUser) {
        //       // User with this email already exists, link the new provider
        //       supabase
        //         .from("users")
        //         .update({ provider: "google" })
        //         .eq("id", existingUser.id)
        //         .then(({ error: linkError }) => {
        //           if (linkError) {
        //             console.log("Error linking provider:", linkError.message);
        //           }
        //         });
        //     }
        //   });
      }
      // router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  return (
    <Context.Provider value={{ supabase }}>
      <>{children}</>
    </Context.Provider>
  );
}

export const useSupabase = () => {
  const context = useContext(Context);

  if (context === undefined) {
    throw new Error('useSupabase must be used inside SupabaseProvider');
  }

  return context;
};
