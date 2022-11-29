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

  const handleUpdateProject = useCallback(
    (newState: ProjectType) => {
      setProject(newState);
      const projectTasks =
        JSON.parse(localStorage.getItem('projectTasks')) || {};
      projectTasks[id] = newState;
      localStorage.setItem(
        'projectTasks',
        JSON.stringify(projectTasks),
      );
    },
    [id],
  );

  const handleAddTask = useCallback(
    (title?: string, type?: ColumnType) => {
      const newProject = {...project};
      newProject[type].tasks.push({
        id: `${Math.floor(Math.random() * 1000000)}`,
        title,
      });
      handleUpdateProject(newProject);
    },
    [project, handleUpdateProject],
  );

  const handleDeleteTask = useCallback(
    (taskId: string, type?: ColumnType) => {
      const newProject = {...project};
      const taskIndex = newProject[type].tasks.findIndex(
        el => el.id === taskId,
      );
      newProject[type].tasks.splice(taskIndex, 1);
      handleUpdateProject(newProject);
    },
    [project, handleUpdateProject],
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

        handleUpdateProject(newState);
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
      handleUpdateProject(newState);
    },
    [project, handleUpdateProject],
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
              handleDeleteTask={handleDeleteTask}
              columnData={project[ColumnType.QUEUE]}
              handleUpdateProject={handleUpdateProject}
            />
            <Column
              handleAddTask={handleAddTask}
              handleDeleteTask={handleDeleteTask}
              columnData={project[ColumnType.DEVELOPMENT]}
              handleUpdateProject={handleUpdateProject}
            />
            <Column
              handleAddTask={handleAddTask}
              handleDeleteTask={handleDeleteTask}
              columnData={project[ColumnType.DONE]}
              handleUpdateProject={handleUpdateProject}
            />
          </div>
        </div>
      </section>
    </DragDropContext>
  );
});

export default Project;
