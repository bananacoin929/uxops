import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createClient = () => {
  const cookieStore = cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};

export async function getSession() {
  const supabase = createClient();
  try {
    //getUser is server dependent and more reliabled
    const user = await getUser();
    if (!user) {
      return null;
    }
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return session;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}
export async function getUser() {
  const supabase = createClient();
  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();
    return user;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export async function getUserDetails() {
  const supabase = createClient();
  try {
    const { data: userDetails } = await supabase
      .from('users')
      .select('*')
      .single();
    return userDetails;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
}

export const getUserProfile = async (id: any) => {
  const supabase = createClient();
  try {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();
    return data;
  } catch (error) {
    console.error('Error:', error);
    return null;
  }
};
