import PersonalInfo from '../features/resume/components/PersonalInfo';
import Introduction from '../features/resume/components/Introduction';
import ProjectSection from '../features/resume/components/ProjectSection';
import ExperienceSection from '../features/resume/components/ExperienceSection';
import EducationSection from '../features/resume/components/EducationSection';
import FloatingNav from '../shared/ui/FloatingNav';

export const dynamic = 'force-static';

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <FloatingNav />
      <div className="space-y-24">
        {/* 1-2. Personal Info */}
        <section id="personal-info" className="pt-10 space-y-10">
          <PersonalInfo />
          <Introduction />
        </section>

        {/* 3. Projects */}
        <section id="projects">
          <ProjectSection />
        </section>

        {/* 4. Experience */}
        <section id="experience">
          <ExperienceSection />
        </section>

        {/* 5. Education */}
        <section id="education">
          <EducationSection />
        </section>
      </div>
    </main>
  );
}
