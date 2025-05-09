export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  published: boolean;
  content?: string;
  readingTime?: string;
  image?: string;
  author?: string;
}
