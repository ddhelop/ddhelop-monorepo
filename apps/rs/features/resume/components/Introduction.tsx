// Introduction.tsx
'use client';

import useFormattedText from '@ddhelop/hooks/useFormattedText';

export const introductionText = [
  '안녕하세요, 성장의 즐거움을 아는 <b-sb>프론트엔드 개발자 김동혁</b-sb>입니다.\n지식을 나누고 배우는 것을 좋아해 커뮤니티 활동과 글쓰기, 블로그 운영을 꾸준히 이어가고 있으며, <sb>일상 속 서비스에서도 작은 불편을 관찰하고, 구조적 흐름을 고민하는 습관</sb>을 갖고 있습니다',
  '지난 1년간 <link href="https://github.com/ddhelop">5,000개 이상의 커밋을 기록하며</link>, 다양한 프로젝트를 경험했고, 특히 Next.js와 TypeScript 기반의 반응형 웹 서비스 개발에 익숙합니다. 디자인과 실제 구현 사이의 미세한 차이까지 조율할 수 있는 <sb>섬세한 감각을 갖추었으며,</sb> 성능·접근성·유지보수를 고려한 <sb>구조 설계와 reflow 최적화에도 꾸준히 집중</sb>해왔습니다.',
  '단순한 구현을 넘어 ‘왜 만드는지’, ‘누구를 위한 것인지’를 고민하며, 수치 기반의 사용자 경험 개선과 UI/UX 설계에 흥미를 느끼고 있습니다. 최근에는 이러한 경험을 바탕으로 AI 도구를 활용하여 <sb>디자인 없이도 혼자서 빠르게 서비스의 MVP를 기획하고 구현할 수 있는 역량</sb>을 갖추게 되었습니다.',
];

export default function Introduction() {
  const { formatText } = useFormattedText();

  return (
    <div className="space-y-5 text-lg leading-9 font-normal text-gray-700">
      {introductionText.map((line, i) => (
        <p key={line.slice(0, 10)}>{formatText(line)}</p>
      ))}
    </div>
  );
}
