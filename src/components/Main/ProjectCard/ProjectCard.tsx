import {FC, memo} from 'react';
import {Link} from 'react-router-dom';

import './ProjectCard.scss';

import {ProjectState} from '../types';

interface ProjectCardProp {
  project: ProjectState;
  handleDeleteProject(id: number): void;
}

const ProjectCard: FC<ProjectCardProp> = memo(
  ({project, handleDeleteProject}) => {
    return (
      <div className="project-card" key={project.id}>
        <div className="project-card__link-wrapper">
          <Link
            to={`/project/${project.title}-${project.id}`}
            className="project-card__link link_hover"
          >
            {project.title}
          </Link>
        </div>
        <button
          onClick={() => handleDeleteProject(project.id)}
          className="button button_hover project-card__button"
          type="button"
        >
          Close project
        </button>
      </div>
    );
  },
);

export default ProjectCard;
