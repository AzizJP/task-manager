import {FC, memo} from 'react';
import {
  // DragDropContext,
  Draggable,
  Droppable,
  // DropResult,
} from 'react-beautiful-dnd';
import {Link} from 'react-router-dom';

import './Project.scss';

const sectionsData = [
  {
    title: 'project1',
    id: '1',
    tasks: [
      {
        title: 'task1',
        id: '1',
      },
      {
        title: 'task2',
        id: '2',
      },
      {
        title: 'task3',
        id: '3',
      },
    ],
  },
  {
    title: 'project2',
    id: '2',
    tasks: [
      {
        title: 'task4',
        id: '4',
      },
      {
        title: 'task5',
        id: '5',
      },
      {
        title: 'task6',
        id: '6',
      },
    ],
  },
  {
    title: 'project3',
    id: '3',
    tasks: [
      {
        title: 'task7',
        id: '7',
      },
      {
        title: 'task8',
        id: '8',
      },
      {
        title: 'task9',
        id: '9',
      },
    ],
  },
];

const Project: FC = memo(() => {
  // const [sections, setSections] = useState(sectionsData);

  // const handleOnDragEnd = useCallback(
  //   (result: DropResult) => {
  //     const items = Array.from(sections);
  //     const [reorderedItem] = items.splice(result.source.index, 1);
  //     items.splice(result.destination.index, 0, reorderedItem);
  //     setSections(items);
  //     console.log(result);
  //   },
  //   [sections],
  // );

  return (
    <section className="project">
      <div className="project__wrapper">
        <h2 className="project__title">Project</h2>
        <Link to="..">To main</Link>
        <div className="project__sections">
          {sectionsData.map(item => (
            <Droppable droppableId="sections" key={item.id}>
              {provided => (
                <div
                  className="project__section"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h3 className="project__section-title">
                    {item.title}
                  </h3>
                  <div className="project__section-tasks">
                    {item.tasks.map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {provided => (
                          <div
                            key={task.id}
                            className="task"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <h4 className="task__title">
                              {task.title}
                            </h4>
                          </div>
                        )}
                      </Draggable>
                    ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </div>
    </section>
  );
});

export default Project;
