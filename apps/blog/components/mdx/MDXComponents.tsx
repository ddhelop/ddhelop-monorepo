import Link from 'next/link';
import Image from 'next/image';

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
}

const CustomLink = ({ href, children }: CustomLinkProps) => {
  const isInternalLink = href.startsWith('/') || href.startsWith('#');

  if (isInternalLink) {
    return <Link href={href}>{children}</Link>;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary hover:text-primary/80 transition-colors underline underline-offset-2"
    >
      {children}
    </a>
  );
};

interface CustomImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

const CustomImage = ({ src, alt, width, height }: CustomImageProps) => {
  return (
    <div className="my-8 overflow-hidden rounded-lg">
      <Image
        src={src}
        alt={alt}
        width={width || 800}
        height={height || 450}
        className="object-cover w-full"
      />
      {alt && <p className="text-center text-sm text-gray-500 mt-2">{alt}</p>}
    </div>
  );
};

export const MDXComponents = {
  a: CustomLink,
  img: CustomImage,
  Image: CustomImage,
};
