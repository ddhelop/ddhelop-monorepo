export interface Tag {
  name: string;
  slug: string;
}

export interface TagWithCount extends Tag {
  count: number;
  isSelected: boolean;
}

export type TagClickHandler = (tag: TagWithCount) => void;

export function toggleTag(
  tags: TagWithCount[],
  clickedTag: TagWithCount
): TagWithCount[] {
  return tags.map((tag) => ({
    ...tag,
    isSelected: tag.slug === clickedTag.slug ? !tag.isSelected : tag.isSelected,
  }));
}
