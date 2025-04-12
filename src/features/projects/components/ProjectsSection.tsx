import linkitData from '../data/LinkitData';
import ProjectItem from './ProjectItem';

export default function ProjectsSection() {
  return (
    <section className="space-y-12">
      <h1 className="text-3xl font-bold">Projects</h1>
      <ProjectItem data={linkitData} />
    </section>
  );
}
