import React from 'react';

export function useFormattedText() {
  const formatText = (text: string | undefined): React.ReactNode[] => {
    if (!text) return [];

    return text.split('\n').map((line) => {
      const processed = parseLine(line);
      return (
        <React.Fragment key={line.slice(0, 30)}>
          {processed}
          <br />
        </React.Fragment>
      );
    });
  };

  const tagMap = [
    {
      tag: '<md>',
      end: '</md>',
      render: (children: React.ReactNode, key: string) => (
        <span key={key} className="font-medium">
          {children}
        </span>
      ),
    },

    {
      tag: '<sb>',
      end: '</sb>',
      render: (children: React.ReactNode, key: string) => (
        <span key={key} className="font-semibold text-gray-900">
          {children}
        </span>
      ),
    },
    {
      tag: '<bsb>',
      end: '</bsb>',
      render: (children: React.ReactNode, key: string) => (
        <span key={key} className="font-semibold text-main-500">
          {children}
        </span>
      ),
    },

    {
      tag: '<b-sb>',
      end: '</b-sb>',
      render: (children: React.ReactNode, key: string) => (
        <span key={key} className="font-semibold text-main-500 text-[19px]">
          {children}
        </span>
      ),
    },
    {
      tag: '<code>',
      end: '</code>',
      render: (children: React.ReactNode, key: string) => (
        <code
          key={key}
          className="px-1.5 py-0.5 text-blue-900 dark:text-blue-200 bg-gray-100 dark:bg-gray-800 rounded-md font-mono text-[13px]"
        >
          {children}
        </code>
      ),
    },
    {
      tag: '<link',
      end: '</link>',
      render: (children: React.ReactNode, key: string, fullMatch: string) => {
        const hrefMatch = fullMatch.match(/href="([^"]*)"/);
        const href = hrefMatch?.[1] || '#';
        return (
          <a
            key={key}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="underline font-medium hover:text-main-500 transition-colors "
          >
            {children}
          </a>
        );
      },
    },
  ];

  const parseLine = (input: string): React.ReactNode[] => {
    const result: React.ReactNode[] = [];
    let currentIndex = 0;

    const hasMore = () => currentIndex < input.length;

    while (hasMore()) {
      let matched = null;
      let earliestIndex = -1;

      for (const tag of tagMap) {
        const index = input.indexOf(tag.tag, currentIndex);
        if (index !== -1 && (earliestIndex === -1 || index < earliestIndex)) {
          earliestIndex = index;
          matched = tag;
        }
      }

      if (!matched) {
        result.push(input.substring(currentIndex));
        break;
      }

      if (earliestIndex > currentIndex) {
        result.push(input.substring(currentIndex, earliestIndex));
      }

      let newIndex = currentIndex;
      let processedNode: React.ReactNode = null;

      if (matched.tag.startsWith('<link')) {
        const openEnd = input.indexOf('>', earliestIndex);
        const end = input.indexOf(matched.end, openEnd);
        if (openEnd !== -1 && end !== -1) {
          const innerContent = input.substring(openEnd + 1, end);
          const children = parseLine(innerContent);
          const fullMatch = input.substring(earliestIndex, openEnd + 1);
          processedNode = matched.render(
            children,
            `link-${earliestIndex}`,
            fullMatch
          );
          newIndex = end + matched.end.length;
        }
      } else {
        const end = input.indexOf(matched.end, earliestIndex);
        if (end !== -1) {
          const innerContent = input.substring(
            earliestIndex + matched.tag.length,
            end
          );
          const children = parseLine(innerContent);
          processedNode = matched.render(
            children,
            `tag-${earliestIndex}`,
            input.substring(earliestIndex, end)
          );
          newIndex = end + matched.end.length;
        }
      }

      if (processedNode) {
        result.push(processedNode);
        currentIndex = newIndex;
      } else {
        result.push(
          input.substring(currentIndex, earliestIndex + matched.tag.length)
        );
        currentIndex = earliestIndex + matched.tag.length;
      }
    }

    return result;
  };

  return { formatText };
}

export default useFormattedText;
