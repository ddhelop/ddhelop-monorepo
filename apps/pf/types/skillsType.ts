export interface SkillsItemData {
  title: string;
  items: {
    id: string;
    name: string;
    description?: string | string[];
  }[];
}
