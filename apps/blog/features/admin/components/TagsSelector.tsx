'use client';

import { useEffect, useState } from 'react';

interface TagsSelectorProps {
  initialTags: string[];
  onChange: (tags: string[]) => void;
}

export default function TagsSelector({
  initialTags = [],
  onChange,
}: TagsSelectorProps) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [inputValue, setInputValue] = useState('');

  // 초기 태그가 변경되면 state 업데이트
  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  const updateTags = (newTags: string[]) => {
    setTags(newTags);
    onChange(newTags); // 태그가 변경될 때 바로 부모 컴포넌트에 알림
  };

  const addTag = () => {
    if (!inputValue.trim()) return;

    const newTag = inputValue.trim();
    if (!tags.includes(newTag)) {
      const newTags = [...tags, newTag];
      updateTags(newTags);
      setInputValue('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    const newTags = tags.filter((tag) => tag !== tagToRemove);
    updateTags(newTags);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
      // 입력 필드가 비어있고 Backspace 키를 누르면 마지막 태그 삭제
      const newTags = [...tags];
      newTags.pop();
      updateTags(newTags);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag) => (
          <div
            key={tag}
            className="bg-gray-100 rounded-full px-3 py-1 text-sm flex items-center"
          >
            <span className="mr-1">{tag}</span>
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              ×
            </button>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={addTag}
          placeholder="태그 입력 후 Enter"
          className="outline-none border-none text-sm flex-grow min-w-[150px]"
        />
      </div>
    </div>
  );
}
