import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  className?: string;
  linkTo?: string;
  width?: number;
}

export default function Logo({ className = '', linkTo = '/', width = 140 }: LogoProps) {
  // Aspect ratio of the SVG is approximately 2.76:1
  const height = Math.round(width / 2.76);
  
  const logo = (
    <Image
      src="/logo.svg"
      alt="Bang Industries"
      width={width}
      height={height}
      className={className}
      priority
    />
  );

  if (linkTo) {
    return (
      <Link href={linkTo} className="hover:opacity-70 transition-opacity">
        {logo}
      </Link>
    );
  }

  return logo;
}
