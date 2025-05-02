import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { compileMDX } from 'next-mdx-remote/rsc';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import remarkGfm from 'remark-gfm';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  content: string;
  readingTime: string;
};

// 모든 블로그 포스트 가져오기
export async function getAllPosts(): Promise<BlogPost[]> {
  const files = fs.readdirSync(contentDirectory);

  const posts = await Promise.all(
    files
      .filter((file) => path.extname(file) === '.mdx')
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, '');
        const post = await getPostBySlug(slug);
        return post;
      })
  );

  // 날짜별로 정렬 (최신순)
  return posts
    .filter((post) => post.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// 슬러그로 특정 포스트 가져오기
export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const filePath = path.join(contentDirectory, `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf8');

  const { data, content } = matter(fileContent);
  const readingTimeResult = readingTime(content);

  return {
    slug,
    title: data.title,
    description: data.description,
    date: data.date,
    tags: data.tags || [],
    published: data.published !== false,
    content,
    readingTime: readingTimeResult.text,
  };
}

// MDX 컨텐츠 컴파일
export async function compileMDXContent(source: string) {
  const { content } = await compileMDX({
    source,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeSlug,
          [
            rehypePrettyCode,
            {
              theme: 'github-dark',
              keepBackground: true,
            },
          ],
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ['anchor'],
              },
            },
          ],
        ],
      },
    },
  });

  return content;
}
