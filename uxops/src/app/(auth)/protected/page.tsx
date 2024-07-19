import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function ProtectedPage() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    const { data: userInfo, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', user?.id)
      .single();
    if (!error) {
      if (userInfo.is_onboarding === false) return redirect('/onboarding');
      else return redirect('/');
    } else return redirect('/');
  }

  return (
    <div className="relative flex h-screen w-full flex-col justify-center bg-gradient-to-tr from-[#136A8A] to-[#267871] px-4 md:px-12 lg:px-28">
      <div className="w-full text-center text-2xl text-white">Dashboard</div>
    </div>
  );
}
