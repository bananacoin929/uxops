'use client';

import BannerCard from '@components/banners/banner-card';
import Link from 'next/link';
import { Button, Text } from 'rizzui';
import { PiCheckCircleFill, PiCircle } from 'react-icons/pi';
import { useState } from 'react';
import { useUserProfile } from '@/lib/providers/user-profile-provider';

const features = [
  'Admin Info',
  'Organization Info',
  'Departments',
  'Departments Info',
];

export default function UpgradeStorage({ className }: { className?: string }) {
  const { userProfile } = useUserProfile();
  const [hide, setHide] = useState(false);

  return (
    <div className={`${className} `}>
      <BannerCard
        title="Onboarding Status"
        className={`min-h-[280px] overflow-hidden rounded-lg w-full  ${hide ? 'absolute -translate-y-[350px] invisible' : 'visible relative translate-y-0'} transition-all duration-300 ease-in-out`}
        setHide={setHide}
      >
        <div className="my-5">
          {features.map((feature, index) => (
            <Text
              key={`feature-${index}`}
              className="flex items-center gap-2 py-1 text-sm font-medium text-white"
            >
              {userProfile?.onboarding_step > index ? (
                <PiCheckCircleFill className="h-5 w-5 text-xl text-white" />
              ) : (
                <PiCircle className="h-5 w-5 text-xl text-white" />
              )}
              {feature}
            </Text>
          ))}
        </div>
        <Link
          href={'/settings'}
          className="inline-block rounded-md bg-white px-4 py-2.5 text-sm font-medium text-gray-900 dark:bg-gray-100"
        >
          Continue
        </Link>
      </BannerCard>
      <div className={`flex w-full justify-end ${hide ? 'block' : 'hidden'}`}>
        <Button
          onClick={() => setHide(false)}
          variant="outline"
          rounded="pill"
          className="inline-block rounded-md bg-white px-4 py-[2px] text-sm font-medium text-gray-900 dark:bg-gray-100"
        >
          Show
        </Button>
      </div>
    </div>
  );
}
