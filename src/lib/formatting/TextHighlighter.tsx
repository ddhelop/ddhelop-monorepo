import type { ReactNode } from 'react';

// 고유 키 생성을 위한 카운터
let keyCounter = 0;

type LinkMap = {
  [term: string]: string | undefined;
};

/**
 * 텍스트 내의 특정 용어를 하이라이트하는 함수
 * @param text 원본 텍스트
 * @param terms 하이라이트할 용어 배열
 * @param links 특정 용어에 연결할 링크 맵 (선택적)
 * @returns 하이라이트된 텍스트가 포함된 React 노드
 */
export const highlightText = (
  text: string,
  terms: string[],
  links?: LinkMap
): ReactNode => {
  if (!terms || terms.length === 0) return text;

  // 하이라이트할 용어로 텍스트 분할
  const parts: ReactNode[] = [text];

  for (const term of terms) {
    const newParts: ReactNode[] = [];

    for (const part of parts) {
      if (typeof part !== 'string') {
        newParts.push(part);
        continue;
      }

      const splitParts = part.split(new RegExp(`(${term})`, 'gi'));
      for (let i = 0; i < splitParts.length; i++) {
        if (i % 2 === 0) {
          // 일치하지 않는 부분
          if (splitParts[i]) newParts.push(splitParts[i]);
        } else {
          // 일치하는 부분 (하이라이트 처리)
          const content = (
            <span
              key={`highlight-${term}-${i}-${keyCounter++}`}
              className="text-main-500 font-bold"
            >
              {splitParts[i]}
            </span>
          );

          // 링크가 있는 경우 링크로 감싸기
          if (links?.[term]) {
            newParts.push(
              <a
                key={`link-${term}-${i}-${keyCounter++}`}
                href={links[term]}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                {content}
              </a>
            );
          } else {
            newParts.push(content);
          }
        }
      }
    }

    if (newParts.length > 0) {
      parts.length = 0;
      parts.push(...newParts);
    }
  }

  return <>{parts}</>;
};
