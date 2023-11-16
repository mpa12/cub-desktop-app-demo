import React, {useEffect, useState} from "react";
import LoaderSpinner from "@ui/LoaderSpinner";
import IProject from "@cub-types/IProject";
import ProjectService from "@services/ProjectService";
import cn from "classnames";
import ProjectsNotFound from "@components/projects/ProjectsNotFound";
import ProjectsTable from "@components/projects/ProjectsTable";

const titleClassName = 'text-[25px] font-bold mb-[15px]';
const dataWrapperClassName = cn(
  'w-full min-h-[300px] rounded-[10px] bg-light flex items-center justify-center'
);

const Projects = () => {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ProjectService.index();
        setProjects(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData().then(() => {
    });
  }, []);

  return (
    <>
      <h1 className={titleClassName}>Список проектов</h1>
      <div className={dataWrapperClassName}>
        {isLoading && <LoaderSpinner loading={isLoading}/>}
        {(!isLoading && !projects.length) && <ProjectsNotFound/>}
        {(!isLoading && !!projects.length) && <ProjectsTable data={projects}/>}
      </div>
    </>
  );
};

export default Projects;
