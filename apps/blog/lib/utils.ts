// MDX 메타데이터 유효성 검사
export function validateMdxMetadata(metadata: Record<string, unknown>) {
  const required = ['title', 'description', 'tags'];
  const missing = required.filter((field) => !metadata[field]);

  if (missing.length > 0) {
    throw new Error(`Missing required metadata fields: ${missing.join(', ')}`);
  }

  // 태그가 배열인지 확인하고 아니면 쉼표로 구분된 문자열에서 배열로 변환
  if (metadata.tags && typeof metadata.tags === 'string') {
    metadata.tags = metadata.tags.split(',').map((tag: string) => tag.trim());
  }

  return metadata;
}
