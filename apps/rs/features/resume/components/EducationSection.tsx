'use client';

import useFormattedText from '@ddhelop/hooks/useFormattedText';
import educationData from '../data/EducationData';

export default function EducationSection() {
  const { formatText } = useFormattedText();

  return (
    <section className="space-y-6">
      <h2 className="text-5xl font-bold">Education</h2>
      <div className="border-t border-gray-200 pt-6">
        <div className="space-y-8">
          {educationData.items.map((education) => (
            <div key={education.id} className="pb-8 last:pb-0">
              <div className="flex flex-col space-y-1">
                <h3 className="text-2xl font-semibold">{education.name}</h3>
                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <p className="text-lg text-gray-700">{education.position}</p>
                  <span className="text-sm text-gray-500">
                    {education.period}
                  </span>
                </div>

                {education.description && (
                  <div className="mt-2">
                    {typeof education.description === 'string' ? (
                      <p className="text-base text-gray-600">
                        {formatText(education.description)}
                      </p>
                    ) : (
                      <ul className="list-disc pl-5 space-y-2">
                        {education.description.map((desc, index) => (
                          <li
                            key={`${education.id}-desc-${index}`}
                            className="text-base text-gray-600"
                          >
                            {formatText(desc)}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
