import Image from "next/image";
import Link from "next/link";

type BrandLogoProps = {
  className?: string;
  imageClassName?: string;
  textClassName?: string;
  onClick?: () => void;
};

export default function BrandLogo({
  className = "",
  imageClassName = "h-10 w-10 sm:h-11 sm:w-11",
  textClassName = "brand-name text-xl sm:text-2xl font-bold tracking-tight",
  onClick,
}: BrandLogoProps) {
  return (
    <Link href="/" onClick={onClick} className={`flex items-center gap-2.5 ${className}`}>
      <Image
        src="/logo/rocketsingh-logo.png"
        alt="RocketSingh logo"
        width={44}
        height={44}
        className={`rounded-full object-cover ${imageClassName}`}
        priority
      />
      <span className={textClassName}>RocketSingh</span>
    </Link>
  );
}
