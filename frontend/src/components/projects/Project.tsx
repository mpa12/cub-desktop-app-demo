import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import IProject from "../../types/IProject";
import ProjectService from "../../services/ProjectService";
import LoaderSpinner from "../ui/LoaderSpinner";
import BackButton from "../ui/BackButton";
import ProjectView from "../projects/ProjectView";

const wrapperClassName = 'flex items-center justify-center min-h-full flex-col gap-[20px]';
const notFoundLabel = 'font-bold text-[20px]';
const contentWrapperClassName = 'grow flex items-center justify-center w-full';

const Project = () => {
  const {id: projectId} = useParams();

  const [project, setProject] = useState<IProject>();
  const [isLoading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await ProjectService.view(projectId);
      setProject(response.data[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData().then(() => {
    });
  }, []);

  return (
    <div className={wrapperClassName}>
      <BackButton to={'/projects'}/>
      <div className={contentWrapperClassName}>
        {isLoading && <LoaderSpinner loading={isLoading}/>}
        {(!isLoading && !project) && <ProjectNotFound/>}
        {(!isLoading && !!project) && <ProjectView
            data={project}
        />}
      </div>
    </div>
  );
};

const ProjectNotFound = () => {
  return (
    <h1 className={notFoundLabel}>Проект не найден</h1>
  );
};

export default Project;
