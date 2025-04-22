if (process.env.NODE_ENV === 'production') {
  // console.log('🚀 프로덕션 환경입니다. 인증 건너뜁니다.');
  process.exit(0);
}

const path = require('node:path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const expectedSecret = 'p@N3l7!o$Jgq191b';
const userSecret = process.env.REQUIRED_SECRET;

if (!userSecret) {
  console.error(
    '\n⛔ 실행 실패: REQUIRED_SECRET 환경변수가 설정되지 않았습니다.'
  );
  process.exit(1);
}

if ((userSecret || '').trim() !== expectedSecret) {
  console.error('\n⛔ 실행 실패: 환경변수 값이 올바르지 않습니다.');

  process.exit(1);
}

console.log('✅ 인증 완료. 실행을 계속합니다...');
