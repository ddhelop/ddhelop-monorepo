/**
 * 소개 섹션 문단 데이터 타입
 */
export interface IntroParagraph {
  id: string;
  text: string;
}

/**
 * 소개 섹션 구역 타입
 */
export interface IntroSection {
  id: string;
  title: string;
  paragraphs: string[];
}

/**
 * 소개 섹션 데이터 타입
 */
export interface IntroData {
  sections: IntroSection[];
}
