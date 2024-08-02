import Image from "next/image";
import { Button, Title } from "rizzui";
import cn from "../../utils/class-names";

type BannerCardProps = {
  title: string;
  className?: string;
  titleClassName?: string;
  bgImage?: string;
  imageClassName?: string;
  hide?: any;
  setHide?: any;
};
export default function BannerCard({
  bgImage,
  className,
  titleClassName = "text-white",
  children,
  title,
  imageClassName,
  setHide,
}: React.PropsWithChildren<BannerCardProps>) {
  return (
    <div className={cn("relative p-8", className)}>
      <Image
        src={
          bgImage
            ? bgImage
            : "https://isomorphic-furyroad.s3.amazonaws.com/public/upgrade-storage-bg.webp"
        }
        alt="Upgrade Storage"
        fill
        sizes="(max-width: 768px) 100vw"
        className={imageClassName}
      />
      <div className="relative z-10">
        <div className="flex w-full justify-between items-center">
          <Title
            as="h2"
            className={cn("text-2xl font-semibold", titleClassName)}
          >
            {title}
          </Title>
          <Button
            onClick={() => setHide(true)}
            variant="outline"
            className="inline-block rounded-md px-4 py-[2px] hover:border-white hover:bg-white hover:text-gray-900 bg-transparent text-sm font-medium text-white dark:bg-gray-100"
          >
            Hide
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}

