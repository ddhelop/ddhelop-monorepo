// 모든 MDX 파일을 Supabase에 업로드
const fs = require('node:fs');
const path = require('node:path');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Supabase 클라이언트 생성
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// 수정: 서비스 역할 키만 사용하도록 변경
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Supabase 환경 변수가 설정되지 않았습니다.');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// MDX 파일 처리 함수
async function processMdxFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Front Matter에서 메타데이터 추출
    const frontMatterMatch = content.match(/---\n([\s\S]*?)\n---/);

    if (!frontMatterMatch) {
      console.error(`${filePath}: Front Matter를 찾을 수 없습니다.`);
      return false;
    }

    const frontMatter = frontMatterMatch[1];
    const metadata = {};

    // 메타데이터 필드 추출
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

    // 이미 존재하는지 확인
    const { data: existing, error: checkError } = await supabase
      .from('posts')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();

    if (checkError) {
      console.error(`${slug}: 기존 포스트 확인 오류:`, checkError);
      return false;
    }

    if (existing) {
      // 기존 포스트 업데이트
      const { data, error } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', existing.id)
        .select();

      if (error) {
        console.error(`${slug}: 업데이트 오류:`, error);
        return false;
      }

      console.log(`✅ ${slug}: 업데이트 완료`);
    } else {
      // 새 포스트 생성
      const { data, error } = await supabase
        .from('posts')
        .insert([postData])
        .select();

      if (error) {
        console.error(`${slug}: 생성 오류:`, error);
        return false;
      }

      console.log(`✅ ${slug}: 생성 완료`);
    }

    return true;
  } catch (error) {
    console.error(`${path.basename(filePath)}: 처리 중 오류:`, error);
    return false;
  }
}

// 모든 MDX 파일 업로드
async function uploadAllMdxFiles() {
  try {
    const contentDir = path.join(process.cwd(), 'content/blog');

    if (!fs.existsSync(contentDir)) {
      console.error(`디렉토리를 찾을 수 없습니다: ${contentDir}`);
      process.exit(1);
    }

    const files = fs.readdirSync(contentDir);
    const mdxFiles = files.filter((file) => path.extname(file) === '.mdx');

    console.log(`총 ${mdxFiles.length}개의 MDX 파일을 찾았습니다.`);

    let successCount = 0;
    let errorCount = 0;

    for (const file of mdxFiles) {
      const filePath = path.join(contentDir, file);
      console.log(`처리 중: ${file}`);

      const success = await processMdxFile(filePath);

      if (success) {
        successCount++;
      } else {
        errorCount++;
      }
    }

    console.log('\n===== 업로드 요약 =====');
    console.log(`총 파일: ${mdxFiles.length}`);
    console.log(`성공: ${successCount}`);
    console.log(`실패: ${errorCount}`);
  } catch (error) {
    console.error('스크립트 실행 오류:', error);
  }
}

// 실행
uploadAllMdxFiles();
