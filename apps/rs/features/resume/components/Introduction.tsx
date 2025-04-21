// Introduction.tsx
'use client';

import useFormattedText from '@ddhelop/hooks/useFormattedText';

export const introductionText = [
  '안녕하세요, 성장의 즐거움을 아는 프론트엔드 개발자 김동혁입니다.\n지식을 나누고 배우는 것을 좋아해 커뮤니티 활동과 글쓰기, 블로그 운영을 꾸준히 이어가고 있으며, 일상 속 서비스에서도 작은 불편을 관찰하고, 구조적 흐름을 고민하는 습관을 갖고 있습니다',
  '지난 1년간 <link href="https://">5,000개 이상의 커밋을 기록하며</link>, 다양한 사이드 프로젝트와 실무를 경험했습니다. 특히 Next.js와 TypeScript 기반의 <sb>반응형 웹 서비스 개발에 익숙하며,</sb> 최근에는 성능, 접근성, 유지보수를 고려한 구조 설계에 대해 학습하고 있으며, 개인 프로젝트를 통해 이를 실제로 적용해보는 경험을 쌓고 있습니다.',
  '단순한 구현을 넘어서 ‘왜’ 만들고 ‘누구를 위한 것인지’를 고민하며, 사용자 경험을 수치 기반으로 개선하는 UI/UX 설계에 흥미를 갖고 있습니다. <sb>AI 도구를 활용한 빠른 프로토타이핑과 기획–디자인–개발을 아우르는 연결 감각을 바탕으로, 혼자서도 서비스 MVP를 빠르게 구상하고 구현할 수 있습니다.</sb>',
];

export default function Introduction() {
  const { formatText } = useFormattedText();

  return (
    <div className="space-y-4 text-lg leading-8 font-normal text-gray-900 ">
      {introductionText.map((line, i) => (
        <p key={line.slice(0, 10)}>{formatText(line)}</p>
      ))}
    </div>
  );
}
