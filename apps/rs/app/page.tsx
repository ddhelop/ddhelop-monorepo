import PersonalInfo from '../features/resume/components/PersonalInfo';
import Introduction from '../features/resume/components/Introduction';
import ProjectSection from '../features/resume/components/ProjectSection';
import ExperienceSection from '../features/resume/components/ExperienceSection';
import EducationSection from '../features/resume/components/EducationSection';
import SkillsSection from '../features/resume/components/SkillsSection';

export const dynamic = 'force-static';

export default function ResumePage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <div className="space-y-24">
        {/* 1-2. Personal Info */}
        <section className="pt-10 space-y-10">
          <PersonalInfo />
          <Introduction />
        </section>

        {/* 3. Projects */}
        <section>
          <ProjectSection />
        </section>

        {/* 4. Experience */}
        <section>
          <ExperienceSection />
        </section>

        {/* 5. Education */}
        <section>
          <EducationSection />
        </section>

        {/* 6. Skills */}
        <section>
          <SkillsSection />
        </section>
      </div>
    </main>
  );
}
