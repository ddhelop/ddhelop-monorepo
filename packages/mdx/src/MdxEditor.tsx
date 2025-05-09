'use client';

import { useState, type ChangeEvent } from 'react';

interface Props {
  content: string;
  onChange: (value: string) => void;
}

export const MdxEditor = ({ content, onChange }: Props) => {
  const [value, setValue] = useState(content);

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <textarea
      value={value}
      onChange={handleChange}
      className="w-full h-full min-h-[300px] p-4 font-mono text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{
        resize: 'vertical',
        lineHeight: 1.6,
        fontFamily:
          'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
      }}
    />
  );
};
