import {FC, memo, useCallback, useState} from 'react';
import {
  // DragDropContext,
  Draggable,
  Droppable,
  // DropResult,
} from 'react-beautiful-dnd';
import {Link, useParams} from 'react-router-dom';

import {ProjectState} from '../Main/types';

import SearchForm from '../Shared/AddTask/SearchForm';

import './Project.scss';

interface TaskState {
  title: string;
  id: string;
  tasks?: Array<TaskState>;
}

const columns: Array<TaskState> = [
  {
    title: 'Queue',
    id: '1',
    tasks: [],
  },
  {
    title: 'Development',
    id: '2',
    tasks: [],
  },
  {
    title: 'Done',
    id: '3',
    tasks: [],
  },
];

const Project: FC = memo(() => {
  const {id} = useParams();

  const [project, setProject] = useState<Array<TaskState>>(
    JSON.parse(localStorage.getItem('projectTasks'))[id] || columns,
  );

  const handleAddTask = useCallback(
    (newTask?: ProjectState, type?: string) => {
      const newProject = [...project];
      const typeIndex = newProject.findIndex(
        item => item.title === type,
      );
      newProject[typeIndex].tasks.push({
        id: `${Math.floor(Math.random() * 1000000)}`,
        title: newTask.title,
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

  // const handleOnDragEnd = useCallback(
  //   (result: DropResult) => {
  //     if (!result.destination) {
  //       return;
  //     }
  //     const items = Array.from(sections);
  //     const [reorderedItem] = items.splice(result.source.index, 1);
  //     items.splice(result.destination.index, 0, reorderedItem);
  //     setSections(items);
  //   },
  //   [sections],
  // );

  return (
    <section className="project">
      <div className="project__wrapper">
        <h2 className="project__title">Project</h2>
        <Link to="/">To main</Link>

        <Droppable droppableId="sections">
          {provided => (
            <ul
              className="project__sections"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {project.map((item, index) => (
                <Draggable
                  key={item.id}
                  draggableId={item.id.toString()}
                  index={index}
                >
                  {providedDrag => (
                    <div
                      className="project__section"
                      ref={providedDrag.innerRef}
                      {...providedDrag.draggableProps}
                      {...providedDrag.dragHandleProps}
                    >
                      <h3 className="project__section-title">
                        {item.title}
                      </h3>
                      <SearchForm
                        handleAdd={e => handleAddTask(e, item.title)}
                        placeholder="Enter task title"
                        buttonText="Add task"
                      />

                      <div className="project__section-tasks">
                        {item.tasks.map(task => (
                          <div key={task.id} className="task">
                            <h4 className="task__title">
                              {task.title}
                            </h4>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </div>
    </section>
  );
});

export default Project;
