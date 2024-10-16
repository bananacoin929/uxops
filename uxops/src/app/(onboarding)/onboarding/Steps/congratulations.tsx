'use client';

import Image from 'next/image';
import Confetti from 'react-confetti';
import congratulationsImg from '@public/hat-confetti.png';
import { useElementSize } from '@hooks/use-element-size';

export default function Congratulations() {
  const [ref, { width, height }] = useElementSize();
  return (
    <>
      <div ref={ref} className="col-span-full grid place-content-center">
        <figure className="relative mx-auto grid place-content-center">
          <Image
            src={congratulationsImg}
            alt="congratulation image"
            priority
            className="mx-auto object-contain"
          />
          <figcaption className="mx-auto max-w-lg text-center">
            <h2 className="text-2xl text-white @7xl:text-3xl @[113rem]:text-4xl">
              Congratulations on Finishing Onboarding!
            </h2>
          </figcaption>
        </figure>
        <Confetti className="!fixed mx-auto" width={width} height={height} />
      </div>
    </>
  );
}
