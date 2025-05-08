// 특정 MDX 파일을 Supabase에 업로드
const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// 명령줄 인자로 MDX 파일 경로 받기
const mdxFilePath = process.argv[2];

if (!mdxFilePath) {
  console.error('MDX 파일 경로를 지정해주세요.');
  console.error('사용법: node upload-mdx-file.js content/blog/hello-world.mdx');
  process.exit(1);
}

// Supabase 클라이언트 생성
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY; // 또는 SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase 환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadMdxFile() {
  try {
    // MDX 파일 읽기
    const filePath = path.resolve(process.cwd(), mdxFilePath);
    console.log(`파일 경로: ${filePath}`);

    if (!fs.existsSync(filePath)) {
      console.error(`파일을 찾을 수 없습니다: ${filePath}`);
      process.exit(1);
    }

    const content = fs.readFileSync(filePath, 'utf8');

    // Front Matter에서 메타데이터 추출 (간단한 방식으로)
    const frontMatterMatch = content.match(/---\n([\s\S]*?)\n---/);

    if (!frontMatterMatch) {
      console.error('Front Matter를 찾을 수 없습니다.');
      process.exit(1);
    }

    const frontMatter = frontMatterMatch[1];
    const metadata = {};

    // 기본 메타데이터 필드 추출
    const titleMatch = frontMatter.match(/title:\s*['"]?(.*?)['"]?\s*$/m);
    const descriptionMatch = frontMatter.match(
      /description:\s*['"]?(.*?)['"]?\s*$/m
    );
    const dateMatch = frontMatter.match(/date:\s*['"]?(.*?)['"]?\s*$/m);
    const publishedMatch = frontMatter.match(
      /published:\s*['"]?(.*?)['"]?\s*$/m
    );
    const tagsMatch = frontMatter.match(/tags:\s*(\[.*?\])/m);

    metadata.title = titleMatch ? titleMatch[1].trim() : '제목 없음';
    metadata.description = descriptionMatch ? descriptionMatch[1].trim() : '';
    metadata.date = dateMatch ? dateMatch[1].trim() : new Date().toISOString();
    metadata.published = publishedMatch
      ? publishedMatch[1].trim() === 'true'
      : true;

    // 태그 처리
    if (tagsMatch) {
      try {
        metadata.tags = JSON.parse(tagsMatch[1].replace(/'/g, '"'));
      } catch (e) {
        metadata.tags = tagsMatch[1]
          .replace(/[\[\]']/g, '')
          .split(',')
          .map((tag) => tag.trim());
      }
    } else {
      metadata.tags = [];
    }

    // 파일 이름에서 슬러그 추출
    const slug = path.basename(filePath, path.extname(filePath));

    const postData = {
      title: metadata.title,
      slug,
      content,
      description: metadata.description,
      tags: metadata.tags,
      is_published: metadata.published,
      published_at: metadata.date,
      updated_at: new Date().toISOString(),
      author_id: '1',
    };

    console.log('메타데이터:', metadata);
    console.log('포스트 데이터 준비 완료, Supabase에 업로드 중...');

    // 이미 존재하는지 확인
    const { data: existing, error: checkError } = await supabase
      .from('posts')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (checkError) {
      console.error('기존 포스트 확인 오류:', checkError);
      return;
    }

    if (existing) {
      // 기존 포스트 업데이트
      const { data, error } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', existing.id)
        .select();

      if (error) throw error;
      console.log(`포스트 "${slug}"가 업데이트되었습니다.`);
    } else {
      // 새 포스트 생성
      const { data, error } = await supabase
        .from('posts')
        .insert([postData])
        .select();

      if (error) throw error;
      console.log(`포스트 "${slug}"가 생성되었습니다.`);
    }

    console.log('업로드 성공!');
  } catch (error) {
    console.error('업로드 오류:', error);
  }
}

// 실행
uploadMdxFile();
