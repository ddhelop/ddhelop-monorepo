'use client';
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote';
import { serialize } from 'next-mdx-remote/serialize';
import { useEffect, useState } from 'react';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import remarkBreaks from 'remark-breaks';
import { MdxComponents } from './MdxComponents';

interface Props {
  source: string;
}

// 노드 타입 정의
interface NodeType {
  children: { type: string; value: string }[];
  properties?: {
    className: string[];
  };
}

export const MdxViewer = (props: Props) => {
  const { source } = props;
  const [content, setContent] = useState<MDXRemoteSerializeResult | null>(null);

  useEffect(() => {
    serialize(source, {
      mdxOptions: {
        remarkPlugins: [remarkBreaks],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ['subheading-anchor'],
                ariaLabel: 'Link to section',
              },
            },
          ],
          [
            rehypePrettyCode,
            {
              theme: 'slack-dark',
              onVisitLine(node: NodeType) {
                if (node.children.length === 0) {
                  node.children = [{ type: 'text', value: ' ' }];
                }
              },
              onVisitHighlightedLine(node: NodeType) {
                if (node.properties) {
                  node.properties.className.push('line--highlighted');
                }
              },
              onVisitHighlightedWord(node: NodeType) {
                if (node.properties) {
                  node.properties.className = ['word--highlighted'];
                }
              },
            },
          ],
        ],
      },
    }).then((res) => setContent(res));
  }, [source]);

  if (!content) {
    return null;
  }

  return <MDXRemote {...content} components={MdxComponents} />;
};
