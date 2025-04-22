import linkitData from '../data/LinkitData';
import portfolioData from '../data/PortfolioData';
import moaData from '../data/MoaData';
import ibtData from '../data/IBTData';
import ProjectItem from './ProjectItem';

export default function ProjectsSection() {
  return (
    <section id="projects" className="space-y-12">
      <h1 className="text-3xl font-bold">Projects</h1>
      <div className="space-y-20">
        <div id="project-linkit">
          <ProjectItem data={linkitData} />
        </div>
        <div id="project-portfolio">
          <ProjectItem data={portfolioData} />
        </div>
        <div id="project-ibt">
          <ProjectItem data={ibtData} />
        </div>
        <div id="project-moa">
          <ProjectItem data={moaData} />
        </div>
      </div>
    </section>
  );
}
