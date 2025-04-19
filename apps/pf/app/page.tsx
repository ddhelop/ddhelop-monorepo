import IntroSection from '../features/intro/components/IntroSection';
import ProjectsSection from '../features/projects/components/ProjectsSection';

export const dynamic = 'force-static';

export default function PortFolioPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 pt-24 pb-16 space-y-20">
      <IntroSection />
      <ProjectsSection />
      {/* <SkillsSection />
      <ContactSection /> */}
    </main>
  );
}
