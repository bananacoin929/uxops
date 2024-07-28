import Header from '@/app/(onboarding)/onboarding/header';

export default function MultiStepLayoutTwo({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-[#0bb5f3] to-[#378ba9] @container flex flex-col items-center">
      <Header />
      {children}
    </div>
  );
}
