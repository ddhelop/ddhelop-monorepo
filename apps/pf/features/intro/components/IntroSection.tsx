import useFormattedText from '@ddhelop/hooks/useFormattedText';
import introData from '../data/IntroData';

interface IntroSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export default function IntroSection() {
  const { formatText } = useFormattedText();

  return (
    <section
      id="intro"
      className="py-10 space-y-10 text-left max-w-4xl mx-auto"
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

      <div className="space-y-6 w-full">
        {introData.sections.map((section: IntroSection, index: number) => (
          <div key={section.id} className="space-y-2 w-full">
            <h2 className="font-bold text-base sm:text-lg text-foreground">
              {section.title}
            </h2>
            <ul className="space-y-2 pl-5 sm:pl-6 list-disc w-full">
              {section.paragraphs.map((paragraph: string, pIndex: number) => (
                <li
                  key={`${section.id}-p${pIndex}`}
                  className="text-sm text-muted-foreground leading-relaxed w-full"
                >
                  {formatText(paragraph)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
