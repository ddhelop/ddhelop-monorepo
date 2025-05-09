import type { MDXComponents as MDXComponentsType } from 'mdx/types';
import type { AnchorHTMLAttributes, HTMLAttributes } from 'react';
import { MdxNextLink } from './MdxNextLink';
import { PostMeta } from './PostMeta';

type AnchorProps = AnchorHTMLAttributes<HTMLAnchorElement>;
type HeadingProps = HTMLAttributes<HTMLHeadingElement>;
type ParagraphProps = HTMLAttributes<HTMLParagraphElement>;
type ElementProps = HTMLAttributes<HTMLElement>;
type PreProps = HTMLAttributes<HTMLPreElement>;

export const MdxComponents: MDXComponentsType = {
  PostMeta,
  a: ({ className, href, ...props }: AnchorProps) => (
    <MdxNextLink
      className="underline underline-offset-4 text-primary hover:text-primary/80 transition-colors"
      target="_blank"
      href={href}
      {...props}
    />
  ),
  img: (props) => {
    return (
      <div className="my-8 relative w-full h-64 md:h-96">
        <img
          className="transition-all duration-200 rounded-md hover:opacity-90 max-w-full max-h-full object-contain mx-auto"
          src={props.src ?? ''}
          alt={props.alt ?? ''}
          title={props.alt ?? ''}
        />
      </div>
    );
  },
  h1: ({ className, ...props }: HeadingProps) => (
    <h1 className="mt-10 mb-4 text-3xl font-bold" {...props} />
  ),
  h2: ({ className, ...props }: HeadingProps) => (
    <h2 className="mt-8 mb-4 text-2xl font-bold" {...props} />
  ),
  h3: ({ className, ...props }: HeadingProps) => (
    <h3 className="mt-6 mb-4 text-xl font-bold" {...props} />
  ),
  h4: ({ className, ...props }: HeadingProps) => (
    <h4 className="mt-6 mb-4 text-lg font-bold" {...props} />
  ),
  h5: ({ className, ...props }: HeadingProps) => (
    <h5 className="mt-6 mb-4 text-base font-bold" {...props} />
  ),
  h6: ({ className, ...props }: HeadingProps) => (
    <h6 className="mt-6 mb-4 text-base font-semibold" {...props} />
  ),
  p: ({ className, ...props }: ParagraphProps) => (
    <p className="my-4 text-base" {...props} />
  ),
  pre: ({ className, ...props }: PreProps) => (
    <pre
      className="my-6 overflow-x-auto rounded-md bg-gray-50 p-4"
      {...props}
    />
  ),
  hr: (_props) => <hr className="border-t border-gray-200 my-8" />,
  code: ({ className, ...props }: ElementProps) => (
    <code className="whitespace-pre-wrap text-gray-800 text-sm" {...props} />
  ),
  ul: ({ className, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="my-4 pl-8 list-disc" {...props} />
  ),
  ol: ({ className, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="my-4 pl-8 list-decimal" {...props} />
  ),
  li: ({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) => (
    <li className="mt-2" {...props} />
  ),
  table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
    <div className="my-6 w-full overflow-y-auto">
      <table className="w-full" {...props} />
    </div>
  ),
  tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
    <tr className="m-0 border-t p-0 even:bg-gray-50" {...props} />
  ),
  th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <th className="border px-4 py-2 text-left font-bold" {...props} />
  ),
  td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
    <td className="border px-4 py-2 text-left" {...props} />
  ),
  strong: ({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) => (
    <span className="font-bold text-primary" {...props} />
  ),
};
