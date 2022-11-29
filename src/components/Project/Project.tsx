import {FC, memo, useCallback, useState} from 'react';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import {Link, useParams} from 'react-router-dom';

import Column from './Column/Column';

import {
  ColumnType,
  ProjectInitialData,
  ProjectType,
} from './Column/types';

import './Project.scss';

const Project: FC = memo(() => {
  const {id} = useParams();

  const [project, setProject] = useState<ProjectType>(
    JSON.parse(localStorage.getItem('projectTasks'))?.[id] ||
      ProjectInitialData,
  );

  const handleAddTask = useCallback(
    (title?: string, type?: ColumnType) => {
      const newProject = {...project};
      newProject[type].tasks.push({
        id: `${Math.floor(Math.random() * 1000000)}`,
        title,
      });
      setProject(newProject);
      const projectTasks =
        JSON.parse(localStorage.getItem('projectTasks')) || {};
      projectTasks[id] = newProject;
      localStorage.setItem(
        'projectTasks',
        JSON.stringify(projectTasks),
      );
    },
    [project, id],
  );

  const handleOnDragEnd = useCallback(
    (result: DropResult) => {
      const {destination, source} = result;
      if (!destination) {
        return;
      }
      if (
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ) {
        return;
      }
      const sourceDroppableId = source.droppableId as ColumnType;
      const destinationDroppableId =
        destination.droppableId as ColumnType;

      const start = project[sourceDroppableId];
      const finish = project[destinationDroppableId];

      if (start === finish) {
        const newTasks = [...start.tasks];
        const [activeElem] = newTasks.splice(source.index, 1);
        newTasks.splice(destination.index, 0, activeElem);

        const newColumn = {
          ...start,
          tasks: newTasks,
        };

        const newState = {
          ...project,
          [sourceDroppableId]: newColumn,
        };

        setProject(newState);
        const projectTasks =
          JSON.parse(localStorage.getItem('projectTasks')) || {};
        projectTasks[id] = newState;
        localStorage.setItem(
          'projectTasks',
          JSON.stringify(projectTasks),
        );
        return;
      }

      const startTaskIds = [...start.tasks];
      const [activeFinishElem] = startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        tasks: startTaskIds,
      };

      const finishTaskIds = [...finish.tasks];
      finishTaskIds.splice(destination.index, 0, activeFinishElem);
      const newFinish = {
        ...finish,
        tasks: finishTaskIds,
      };

      const newState = {
        ...project,
        [sourceDroppableId]: newStart,
        [destinationDroppableId]: newFinish,
      };
      setProject(newState);
      const projectTasks =
        JSON.parse(localStorage.getItem('projectTasks')) || {};
      projectTasks[id] = newState;
      localStorage.setItem(
        'projectTasks',
        JSON.stringify(projectTasks),
      );
      setProject(newState);
    },
    [project, id],
  );

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <section className="project">
        <div className="project__wrapper">
          <div className="project__title-section">
            <h2 className="project__title">Project</h2>
            <Link to="/" className="project__link link_hover">
              Back to select a project
            </Link>
          </div>
          <div className="project__sections">
            <Column
              handleAddTask={handleAddTask}
              columnData={project[ColumnType.QUEUE]}
            />
            <Column
              handleAddTask={handleAddTask}
              columnData={project[ColumnType.DEVELOPMENT]}
            />
            <Column
              handleAddTask={handleAddTask}
              columnData={project[ColumnType.DONE]}
            />
          </div>
        </div>
      </section>
    </DragDropContext>
  );
});

export default Project;
