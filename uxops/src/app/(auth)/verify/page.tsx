import Image from 'next/image';

const Verify = () => {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-gradient-to-tr from-[#136A8A] to-[#267871] px-4 md:px-12 lg:px-28">
      <div className="shadow-auth mx-4 inline-flex w-full flex-col items-center gap-6 rounded-xl bg-white p-8 md:mx-0 md:w-[540px]">
        <Image src="/mailbox.png" alt="Mainbox" width={100} height={100} />
        <div className="text-2xl">
          Success! Please verify your e-mail.
        </div>
        <div className="">We just e-mailed you a link to verify.</div>
      </div>
    </div>
  );
};

export default Verify;
