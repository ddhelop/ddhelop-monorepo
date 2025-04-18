import type { IntroData } from '@/types/introType';

/**
 * 소개 섹션 데이터
 * 이 파일에서 소개 섹션의 모든 문단 데이터를 정의합니다.
 */

const introData: IntroData = {
  sections: [
    {
      id: 'intro-section-1',
      title: '센스와 책임감은 남들과 차별되는 저만의 강점입니다.',
      paragraphs: [
        '<highlight>디자인 감각과 흐름을 읽는 눈</highlight>이 있습니다. UI/UX 개선 아이디어를 자주 제안하고, 프로젝트에 반영한 경험이 많습니다.',
        '<highlight>사용자 경험에 진심입니다.</highlight> 일상 속 서비스에서도 불편을 관찰하고, 왜 이렇게 만들었을지 고민하는 습관이 있습니다.',
        '<highlight>모든 상황을 예외까지 고려해 판단합니다.</highlight> 흐름이 끊기지 않는 제품을 만드는 데 집중합니다.',
        '<highlight>기존 방식에 안주하지 않습니다.</highlight> 더 나은 구조나 새로운 방식이 있다면 주저 없이 실험하고 제안합니다.',
        '<highlight>지킬 수 있는 약속만 합니다.</highlight> 커뮤니케이션에 신중하고, 책임감 있게 협업합니다.',
      ],
    },
    {
      id: 'intro-section-2',
      title: '제품 개발에 폭넓게 기여할 수 있는 역량을 갖추고 있습니다.',
      paragraphs: [
        '기획부터 디자인, 프론트엔드 개발까지의 흐름을 이해하고 연결할 수 있는 감각이 있습니다.',
        'AI 도구를 활용해 <highlight>Figma 없이도 퀄리티있는 UI를 구현</highlight>할 수 있으며, <highlight>빠르게 기획을 구체화하고 MVP 수준의 프로토타입을 빠르게 제작할 수 있습니다.</highlight> <link href="https://www.mo-a.kr">⤷ 모아 커뮤니티</link>, <link href="">⤷ 포트폴리오</link>',
        '<highlight>Next.js, TypeScript 기반의 프론트엔드 개발에 익숙</highlight>하며, 상태 관리부터 서버 통신, 실시간 기능 구현까지 경험해봤습니다',
        '<highlight>사용자 경험과 데이터를 근거로 기능을 설계하고, 이를 실제로 구현하는 데에 흥미를 느낍니다.</highlight>',
        '제품뿐만 아니라 <highlight>코드의 구조와 퀄리티를 개선하는 데에도 흥미를 느끼며</highlight>, Feature-Sliced Design과 같은 아키텍처로 설계와 리팩터링 과정에서 큰 성취감을 느낍니다.',
      ],
    },
  ],
};

export default introData;
