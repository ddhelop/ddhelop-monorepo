export default function IntroSection() {
  return (
    <section
      id="intro"
      className="py-24 space-y-10 text-left max-w-3xl mx-auto"
    >
      <h1 className="text-4xl font-bold text-foreground leading-relaxed">
        안녕하세요.
        <br />
        프론트엔드 개발자{' '}
        <span className="bg-gradient-to-r from-main-500 to-main-700 text-transparent bg-clip-text">
          김동혁
        </span>
        입니다.
      </h1>

      <div className="text-muted-foreground text-base leading-relaxed space-y-4 max-w-prose">
        <p>
          React, Next.js, TypeScript를 중심으로 한 프론트엔드 개발을 주로
          다룹니다. 최신 IT 트렌드와 개발 역량을 키우기 위해 실제 프로젝트
          경험을 지속적으로 쌓고 있으며, LinkedIn, Velog, YouTube, FE Articles
          등 다양한 매체를 통해 프론트엔드 기술과 산업 동향을 학습하고 있습니다.
        </p>
        <p>
          저의 가장 큰 강점은 꾸준함입니다. 편입과 군 전역(2023.02)을 시작으로
          단 한 번의 공백 없이 프론트엔드 개발을 학습하고 프로젝트에
          적용해왔습니다.
        </p>
        <p>
          현재는 창업 동아리에서 결성된 창업 준비 팀에서 팀 빌딩 플랫폼
          "링킷(Linkit)"을 개발 및 운영하고 있으며, 두 차례의 MVP 개발을
          완료했습니다. 프로덕트에 최신 기술 스택을 적극 도입하며, 새로운 기술을
          빠르게 학습하고 적용하는 데 강한 의지를 가지고 있습니다.
        </p>
        <p>
          아래 경험을 바탕으로 문제 해결 능력과 사용자 중심 개발 역량을 갖춘
          프론트엔드 개발자로 성장해 나가고 있습니다.
        </p>
        <p>감사합니다.</p>
      </div>
    </section>
  );
}
