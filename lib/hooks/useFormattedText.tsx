import React from 'react';

/**
 * Hook to process text containing markup tags and convert them to React elements
 *
 * 사용법:
 * 1. 컴포넌트에서 hook 가져오기:
 *    const { formatText } = useFormattedText();
 *
 * 2. 텍스트에 적용하기:
 *    {formatText("이것은 <highlight>강조</highlight> 텍스트입니다.")}
 *
 * 지원하는 태그:
 * - <highlight>텍스트</highlight> - 굵게 강조 표시
 * - <code>코드</code> - 인라인 코드로 포맷팅
 * - <link href="URL">텍스트</link> - 링크 생성
 *
 * 태그는 중첩 사용 가능 (예: <highlight><link href="URL">강조된 링크</link></highlight>)
 */
export function useFormattedText() {
  /**
   * Process text with embedded markup tags for highlighting, links, and code
   */
  const formatText = (text: string | undefined): React.ReactNode[] => {
    if (!text) return [];

    // Split text by line breaks and process each line
    return text.split('\n').map((line, lineIndex) => {
      // Process the line's content recursively
      const processed = parseLine(line);

      // Add a line break after each line except the last one
      const lineKey = `line-${line.substring(0, 10)}-${lineIndex}`;

      return lineIndex < text.split('\n').length - 1 ? (
        <React.Fragment key={lineKey}>
          {processed}
          <br />
        </React.Fragment>
      ) : (
        <React.Fragment key={lineKey}>{processed}</React.Fragment>
      );
    });
  };

  /**
   * Parse an input string and return React elements
   */
  const parseLine = (input: string): React.ReactNode[] => {
    const result: React.ReactNode[] = [];
    let currentIndex = 0;

    // Helper function to check if we have more text to process
    const hasMoreText = () => currentIndex < input.length;

    // Process the input string
    while (hasMoreText()) {
      // Find the next opening tag
      const highlightTagIndex = input.indexOf('<highlight>', currentIndex);
      const codeTagIndex = input.indexOf('<code>', currentIndex);
      const linkTagIndex = input.indexOf('<link', currentIndex);

      // Find the earliest tag (if any)
      let earliestTagIndex = -1;
      let tagType: 'highlight' | 'code' | 'link' | null = null;

      if (
        highlightTagIndex !== -1 &&
        (earliestTagIndex === -1 || highlightTagIndex < earliestTagIndex)
      ) {
        earliestTagIndex = highlightTagIndex;
        tagType = 'highlight';
      }

      if (
        codeTagIndex !== -1 &&
        (earliestTagIndex === -1 || codeTagIndex < earliestTagIndex)
      ) {
        earliestTagIndex = codeTagIndex;
        tagType = 'code';
      }

      if (
        linkTagIndex !== -1 &&
        (earliestTagIndex === -1 || linkTagIndex < earliestTagIndex)
      ) {
        earliestTagIndex = linkTagIndex;
        tagType = 'link';
      }

      // If no tag found, add the rest of the string as text and finish
      if (tagType === null) {
        if (currentIndex < input.length) {
          result.push(input.substring(currentIndex));
        }
        break;
      }

      // Add any text before the tag
      if (earliestTagIndex > currentIndex) {
        result.push(input.substring(currentIndex, earliestTagIndex));
      }

      // Process the tag
      let processedNode: React.ReactNode | null = null;
      let newIndex = currentIndex;

      switch (tagType) {
        case 'highlight': {
          const highlightEndIndex = input.indexOf(
            '</highlight>',
            earliestTagIndex
          );
          if (highlightEndIndex !== -1) {
            const contentStart = earliestTagIndex + '<highlight>'.length;
            const content = input.substring(contentStart, highlightEndIndex);
            // Recursively process the content inside the highlight tag
            const innerContent = parseLine(content);
            processedNode = (
              <span
                key={`highlight-${earliestTagIndex}`}
                className="font-bold text-[15px]"
              >
                {innerContent}
              </span>
            );
            newIndex = highlightEndIndex + '</highlight>'.length;
          }
          break;
        }

        case 'code': {
          const codeEndIndex = input.indexOf('</code>', earliestTagIndex);
          if (codeEndIndex !== -1) {
            const contentStart = earliestTagIndex + '<code>'.length;
            const content = input.substring(contentStart, codeEndIndex);
            // Recursively process the content inside the code tag
            const innerContent = parseLine(content);
            processedNode = (
              <code
                key={`code-${earliestTagIndex}`}
                className="px-1.5 py-0.5 text-main-500 dark:text-main-400 bg-gray-100 dark:bg-gray-800 rounded-md font-mono text-[13px]"
              >
                {innerContent}
              </code>
            );
            newIndex = codeEndIndex + '</code>'.length;
          }
          break;
        }

        case 'link': {
          // Find the closing of the opening tag
          const openingTagEndIndex = input.indexOf('>', earliestTagIndex);
          if (openingTagEndIndex !== -1) {
            // Extract href attribute
            const hrefMatch = input
              .substring(earliestTagIndex, openingTagEndIndex)
              .match(/href="([^"]*)"/);
            if (hrefMatch) {
              const href = hrefMatch[1];
              const linkEndIndex = input.indexOf('</link>', openingTagEndIndex);
              if (linkEndIndex !== -1) {
                const contentStart = openingTagEndIndex + 1;
                const content = input.substring(contentStart, linkEndIndex);
                // Recursively process the content inside the link tag
                const innerContent = parseLine(content);
                processedNode = (
                  <a
                    key={`link-${earliestTagIndex}`}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-main-500 transition-colors"
                  >
                    {innerContent}
                  </a>
                );
                newIndex = linkEndIndex + '</link>'.length;
              }
            }
          }
          break;
        }
      }

      // Add the processed node if we have one
      if (processedNode !== null) {
        result.push(processedNode);
        currentIndex = newIndex;
      } else {
        // If we couldn't process the tag, add it as plain text and move on
        result.push(input.substring(currentIndex, earliestTagIndex + 1));
        currentIndex = earliestTagIndex + 1;
      }
    }

    return result;
  };

  return { formatText };
}

export default useFormattedText;
