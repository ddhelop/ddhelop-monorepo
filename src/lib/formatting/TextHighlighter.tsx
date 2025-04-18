import type { ReactNode } from 'react';
import { Fragment } from 'react';

// 고유 키 생성을 위한 카운터
let keyCounter = 0;

type LinkMap = {
  [term: string]: string | undefined;
};

/**
 * 텍스트 내의 특정 용어를 하이라이트하는 함수
 * 줄바꿈(\n)도 처리하며 단어 분리를 방지합니다
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
  if (!terms || terms.length === 0) {
    // 하이라이트 용어가 없더라도 줄바꿈 처리
    if (text.includes('\n')) {
      return (
        <>
          {text.split('\n').map((line, lineIndex) => (
            <Fragment key={`plain-line-${text.substring(0, 10)}-${lineIndex}`}>
              {lineIndex > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </>
      );
    }
    return text;
  }

  // 줄바꿈으로 텍스트 분할
  const lines = text.split('\n');

  // 각 줄 별로 처리
  return (
    <>
      {lines.map((line, lineIndex) => {
        // 하이라이트할 용어로 텍스트 분할
        const parts: ReactNode[] = [line];

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
                    key={`highlight-${term}-${lineIndex}-${i}-${keyCounter++}`}
                    className="font-semibold text-gray-700 text-[13px] sm:text-[15px] whitespace-normal break-words"
                  >
                    {splitParts[i]}
                  </span>
                );

                // 링크가 있는 경우 링크로 감싸기
                if (links?.[term]) {
                  newParts.push(
                    <a
                      key={`link-${term}-${lineIndex}-${i}-${keyCounter++}`}
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

        return (
          <Fragment key={`line-${text.substring(0, 10)}-${lineIndex}`}>
            {lineIndex > 0 && <br />}
            {parts}
          </Fragment>
        );
      })}
    </>
  );
};

/**
 * 텍스트 내에서 코드 형식으로 표시할 부분을 처리하는 함수
 * 백틱(`)으로 둘러싸인 부분을 인라인 코드 스타일로 표시합니다
 * 예: "이것은 `코드` 형식입니다"
 *
 * @param text 코드 포맷을 적용할 텍스트
 * @returns 코드 스타일이 적용된 React 노드
 */
export const formatInlineCode = (text: string): ReactNode => {
  if (!text || !text.includes('`')) return text;

  // 줄바꿈으로 텍스트 분할
  const lines = text.split('\n');

  // 각 줄 별로 처리
  return (
    <>
      {lines.map((line, lineIndex) => {
        // 백틱으로 분할하여 코드 부분 찾기
        const parts = line.split(/(`[^`]+`)/g);

        const formattedParts = parts.map((part, i) => {
          // 백틱으로 시작하고 끝나는 부분이면 코드 스타일 적용
          if (part.startsWith('`') && part.endsWith('`')) {
            const code = part.slice(1, -1); // 백틱 제거
            return (
              <code
                key={`code-${lineIndex}-${i}-${keyCounter++}`}
                className="font-mono text-main-500 bg-gray-100 px-1.5 py-0.5 rounded text-sm whitespace-nowrap"
              >
                {code}
              </code>
            );
          }

          return part;
        });

        return (
          <Fragment key={`line-code-${lineIndex}-${keyCounter++}`}>
            {lineIndex > 0 && <br />}
            {formattedParts}
          </Fragment>
        );
      })}
    </>
  );
};

/**
 * 여러 텍스트 포매팅을 결합한 함수
 * 하이라이트와 코드 스타일을 동시에 적용합니다
 *
 * @param text 포매팅을 적용할 텍스트
 * @param terms 하이라이트할 용어 배열
 * @param links 특정 용어에 연결할 링크 맵 (선택적)
 * @returns 포매팅이 적용된 React 노드
 */
export const formatText = (
  text: string,
  terms?: string[],
  links?: LinkMap
): ReactNode => {
  // 백틱이 없고 하이라이트 용어가 없으면 원본 텍스트 반환
  if (!text.includes('`') && (!terms || terms.length === 0)) {
    // 줄바꿈만 처리
    if (text.includes('\n')) {
      return (
        <>
          {text.split('\n').map((line, lineIndex) => (
            <Fragment key={`plain-line-${text.substring(0, 10)}-${lineIndex}`}>
              {lineIndex > 0 && <br />}
              {line}
            </Fragment>
          ))}
        </>
      );
    }
    return text;
  }

  // 백틱이 없으면 하이라이트만 적용
  if (!text.includes('`')) {
    return highlightText(text, terms || [], links);
  }

  // 하이라이트할 용어가 없으면 코드 포맷만 적용
  if (!terms || terms.length === 0) {
    return formatInlineCode(text);
  }

  // 줄바꿈으로 텍스트 분할
  const lines = text.split('\n');

  // 각 줄 별로 처리
  return (
    <>
      {lines.map((line, lineIndex) => {
        // 백틱으로 분할
        const parts = line.split(/(`[^`]+`)/g);

        const formattedParts = parts.map((part, i) => {
          // 백틱으로 시작하고 끝나는 부분이면 코드 스타일 적용
          if (part.startsWith('`') && part.endsWith('`')) {
            const code = part.slice(1, -1); // 백틱 제거
            return (
              <code
                key={`code-${lineIndex}-${i}-${keyCounter++}`}
                className="font-mono text-main-500 bg-gray-100 px-1.5 py-0.5 rounded text-sm whitespace-nowrap"
              >
                {code}
              </code>
            );
          }

          // 일반 텍스트는 하이라이트 적용
          return highlightText(part, terms || [], links);
        });

        return (
          <Fragment key={`line-mixed-${lineIndex}-${keyCounter++}`}>
            {lineIndex > 0 && <br />}
            {formattedParts}
          </Fragment>
        );
      })}
    </>
  );
};
