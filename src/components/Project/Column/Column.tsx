import {FC, memo} from 'react';
import {Draggable, Droppable} from 'react-beautiful-dnd';

import SearchForm from '../../Shared/AddTask/SearchForm';

import './Column.scss';

import {ColumnProps, ColumnType} from './types';

interface Props {
  columnData: ColumnProps;
  handleAddTask(title: string, type?: ColumnType): void;
}

const Column: FC<Props> = memo(({columnData, handleAddTask}) => {
  return (
    <div className="column">
      <h3 className="column__title">{columnData.title}</h3>
      <SearchForm
        handleAdd={e => handleAddTask(e, columnData.id)}
        placeholder="Enter task title"
        buttonText="Add task"
        classNameInput="column__input"
        classNameButton="column__button"
      />
      <Droppable droppableId={columnData.id}>
        {providedDrop => (
          <div
            className="column__tasks"
            ref={providedDrop.innerRef}
            {...providedDrop.droppableProps}
          >
            {columnData.tasks.map((task, index) => (
              <Draggable
                key={task.id}
                draggableId={task.id.toString()}
                index={index}
              >
                {providedDragTask => (
                  <div
                    className="task"
                    ref={providedDragTask.innerRef}
                    {...providedDragTask.draggableProps}
                    {...providedDragTask.dragHandleProps}
                  >
                    <h4 className="task__title">{task.title}</h4>
                  </div>
                )}
              </Draggable>
            ))}
            {providedDrop.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
});
export default Column;
