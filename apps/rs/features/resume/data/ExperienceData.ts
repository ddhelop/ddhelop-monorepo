import type { ResumeItemData } from '../../../types/resumeType';

interface ExperienceItem {
  id: string;
  name: string;
  period: string;
  position?: string;
  description?: string | string[];
  achievements?: string[];
}

const experienceData: ResumeItemData & { items: ExperienceItem[] } = {
  title: '경력',
  items: [
    {
      id: 'exp-liaison',
      name: 'Liaison',
      period: '2024.05 - 진행 중',
      description: [
        'Linkit 프로젝트의 초기 실행 팀 Liaison의 일원으로 활동 ---대학생 구성 팀으로 0 → 1 서비스를 기획하고 직접 MVP를 두 차례 개발',
        '정기적 코어타임(주 2회 대면 회의) 기반의 팀 협업 주도',
        '후속 프로젝트 LinkCulture의 기획 참여',
      ],
      achievements: [
        '공공·민간 빅데이터 활용 국민생활 서비스 활용·창업경진대회 (보건복지부 장관상)---<link href="https://www.etnews.com/20240807000314">관련기사</link> / <link href="https://www.ssis.or.kr/lay1/bbs/S1T67C101/B/101/view.do?article_seq=126067">사회보장원 홈페이지</link> / <link href="https://www.hongik.ac.kr/kr/newscenter/news.do?mode=view&articleNo=118742">홍익대학교 홈페이지</link>',
        '벤처부 공공데이터 활용 창업경진대회 (중소벤처기업부 장관상) ---<link href="https://www.data.go.kr/tcs/eds/ctm/selectContestData.do?contestId=40178">누리집</link>',
        '홍익대학교 창업 경진대회 (최우수상)',
        '하나 소셜벤처유니버시티 서강대 (창업팀 선정)',
        '홍익대학교 창업동아리 선정',
        '학생창업 유망팀 300 선정',
      ],
    },
    {
      id: 'exp-ceos',
      name: 'CEOS 19기, 20기, 21기',
      period: '2024.03 - 진행 중',
      description: [
        '기획자, 디자이너, 개발자가 함께 결실을 위한 MVP 프로젝트를 제작하는 IT 창업 동아리',
        '19기: 프론트엔드 부원, 스터디, BeatBuddy 프로젝트 참여',
        '20기: 프론트엔드 파트장, 파트 및 스터디 운영, 팀 프로젝트 멘토링',
        '21기: 프론트엔드 파트 멘토',
      ],
      achievements: ['19기 최우수 프로젝트 선정 (BeatBuddy)'],
    },
    {
      id: 'exp-hive',
      name: 'HIVe 29기',
      period: '2024.05 - 2024.12',
      description: [
        '홍익대학교 벤처창업기관 동아리, 실제 사업 기획 및 실행, 홍익대학교 창업 경진 대회 수상',
      ],
    },
    {
      id: 'exp-hana',
      name: '하나 소셜 벤처 유니버시티 서강대',
      period: '2024.11 - 2024.12',
      description: [
        '하나금융 주관 청년 창업가 육성 프로그램',
        '비즈니스모델 수립, 시장 분석, 투자 전략 등 창업 실무를 익혔습니다.',
        '링킷 프로젝트를 정의하고 이를 기반으로 교육기간동안 MVP 개발',
      ],
    },
    {
      id: 'exp-umc',
      name: 'UMC 5기',
      period: '2023.10 - 2025.02',
      description: [
        '기획자, 디자이너, 개발자들이 협업하여 사이드 프로젝트를 진행하는 IT 연합 동아리',
        '홍익대학교 5기 - 스터디 진행, 우수정기팀 프로젝트 참여',
      ],
    },
  ],
};

export default experienceData;
