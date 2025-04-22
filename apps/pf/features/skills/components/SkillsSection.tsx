'use client';

import useFormattedText from '@ddhelop/hooks/useFormattedText';
import skillsData from '../data/SkillsData';

export default function SkillsSection() {
  const { formatText } = useFormattedText();

  return (
    <section id="skills" className="space-y-6">
      <h2 className="text-3xl font-bold">Skills</h2>
      <div className="border-t border-gray-200 pt-6">
        <div className="space-y-8">
          {skillsData.items.map((skill) => (
            <div key={skill.id} className="pb-8 last:pb-0">
              <div className="flex flex-col space-y-2">
                <h3 className="text-2xl font-semibold">{skill.name}</h3>

                {skill.description && (
                  <div>
                    {typeof skill.description === 'string' ? (
                      <p className="text-base text-gray-600">
                        {formatText(skill.description)}
                      </p>
                    ) : (
                      <ul className="list-disc pl-5 space-y-2">
                        {skill.description.map((desc, index) => (
                          <li
                            key={`${skill.id}-desc-${index}`}
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
