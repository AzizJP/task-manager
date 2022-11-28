import {FC, memo, useState, useCallback} from 'react';

import SearchForm from '../Shared/AddTask/SearchForm';

import './Main.scss';
import ProjectCard from './ProjectCard/ProjectCard';

import {ProjectState} from './types';

const Main: FC = memo(() => {
  const [projects, setProjects] = useState(
    JSON.parse(localStorage.getItem('projects')) || [],
  );

  const handleAddProject = useCallback(
    (newProject: ProjectState) => {
      const newState = [
        ...projects,
        {...newProject, id: `${Math.floor(Math.random() * 1000000)}`},
      ];
      setProjects(newState);
      localStorage.setItem('projects', JSON.stringify(newState));
    },
    [projects],
  );

  const handleDeleteProject = useCallback(
    (id: string): void => {
      const copyProjects = [...projects];
      const projectIndex = copyProjects.findIndex(el => el.id === id);
      copyProjects.splice(projectIndex, 1);
      setProjects(copyProjects);
      localStorage.setItem('projects', JSON.stringify(copyProjects));
    },
    [projects],
  );

  return (
    <main className="main">
      <div className="main__wrapper">
        <h2 className="main__title">Projects</h2>
        <SearchForm
          handleAdd={handleAddProject}
          placeholder="Enter project title"
          buttonText="Add project"
        />
        <div className="main__projects">
          {projects.length === 0 ? (
            <h3 className="main__no-projects-message">
              Add projects to view them here
            </h3>
          ) : (
            projects.map((project: ProjectState) => (
              <ProjectCard
                project={project}
                key={project.id}
                handleDeleteProject={handleDeleteProject}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
});

export default Main;
