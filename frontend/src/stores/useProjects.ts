import {useEffect, useState} from "react";
import IProject from "@cub-types/IProject";
import ProjectService from "@services/ProjectService";

interface ProjectsState {
  projectsIsLoading: boolean;
  data: IProject[]
}

const useProjects = () => {
  const [projectsState, setProjectsState] = useState<ProjectsState>({
    projectsIsLoading: true,
    data: []
  });

  const getProjects = () => {
    ProjectService.index().then(response => {
      setProjectsState({
        ...projectsState,
        data: response.data,
        projectsIsLoading: false,
      })
    })
  }

  useEffect(() => {
    getProjects();
  }, []);

  return {
    projectsState
  }
};

export default useProjects;
