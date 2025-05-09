'use client';

import type { AnchorHTMLAttributes } from 'react';

type MdxNextLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>;

export const MdxNextLink = (props: MdxNextLinkProps) => {
  const { href, children, ...rest } = props;

  if (!href) {
    return null;
  }

  const isExternalLink = href.startsWith('http') || href.startsWith('https');

  if (isExternalLink) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
};
