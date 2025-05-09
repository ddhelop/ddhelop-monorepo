import type { HTMLProps } from 'react';

export function MdxNextImage(props: HTMLProps<HTMLImageElement>) {
  const { src, alt, width, height, className } = props;

  if (!src) {
    return <p>이미지를 불러올 수 없습니다.</p>;
  }

  return (
    <img
      src={src}
      alt={alt || ''}
      width={width}
      height={height}
      className={`max-w-full object-cover ${className || ''}`}
    />
  );
}
