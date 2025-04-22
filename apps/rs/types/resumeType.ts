export interface ResumeItem {
  id: string;
  name: string;
  period?: string;
  position?: string;
  description?: string | string[];
  links?: {
    github?: string;
    website?: string;
  };
  technologies?: string[];
  logo?: string;
  achievements?: string[];
}

export interface ResumeItemData {
  title: string;
  items: ResumeItem[];
}
