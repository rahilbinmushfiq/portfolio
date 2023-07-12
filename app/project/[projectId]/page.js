import Section from "@/app/components/projectDetails/Section";
import { projects } from "@/app/data/projects";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map(project => ({
    projectId: project.id.toString(),
  }));
}

export default function ProjectDetails({ params: { projectId } }) {
  const requestedProject = projects[Number(projectId)];

  return (
    <main id="project-details" className="mt-20 lg:mt-[86px]">
      <Section project={requestedProject} />
    </main>
  );
}
