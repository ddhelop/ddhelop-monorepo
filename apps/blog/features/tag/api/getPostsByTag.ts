import { getAllTags as getSupabaseAllTags } from '../../../lib/supabase';
import type { TagWithCount } from '../../../entities/tag';

export async function getAllTagsWithCount(): Promise<TagWithCount[]> {
  // 모든 태그 정보 가져오기
  const allTags = await getSupabaseAllTags();

  // 태그별 카운트 계산
  const tagCounts = allTags.reduce(
    (acc: Record<string, number>, tag: string) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    },
    {}
  );

  // TagWithCount 포맷으로 변환
  return Object.entries(tagCounts).map(([name, count]) => ({
    name,
    count: count as number,
    slug: name.toLowerCase(),
    isSelected: false,
  }));
}
