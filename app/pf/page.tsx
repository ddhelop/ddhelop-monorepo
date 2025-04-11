import ContactSection from './sections/ContactSection';
import IntroSection from './sections/IntroSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';

export const dynamic = 'force-static';

export default function PortFolioPage() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 space-y-32">
      <IntroSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
