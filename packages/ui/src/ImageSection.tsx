import Image from 'next/image';

interface ImageSectionProps {
  image?: { src: string; alt: string };
  className?: string;
}

/**
 * 프로젝트 이미지를 표시하는 재사용 가능한 컴포넌트
 * 이미지가 없는 경우 아무것도 렌더링하지 않음
 */
const ImageSection = ({ image, className = '' }: ImageSectionProps) => {
  if (!image) return null;

  return (
    <div className={`relative rounded-lg overflow-hidden my-8 ${className}`}>
      <Image
        src={image.src}
        alt={image.alt}
        width={800}
        height={450}
        className="w-full h-auto object-cover"
      />
    </div>
  );
};

export default ImageSection;
