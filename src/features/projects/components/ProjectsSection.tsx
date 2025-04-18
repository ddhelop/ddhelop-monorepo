import linkitData from '../data/LinkitData';
import portfolioData from '../data/PortfolioData';
import moaData from '../data/MoaData';
import ProjectItem from './ProjectItem';

export default function ProjectsSection() {
  return (
    <section className="space-y-12">
      <h1 className="text-3xl font-bold ">Projects</h1>
      <div className="space-y-20">
        <ProjectItem data={moaData} />
        <ProjectItem data={portfolioData} />
        <ProjectItem data={linkitData} />
      </div>
    </section>
  );
}
