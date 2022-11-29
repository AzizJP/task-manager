import {FC, memo} from 'react';
import {Droppable} from 'react-beautiful-dnd';

import SearchForm from '../../Shared/AddTask/SearchForm';

import './Column.scss';
import Task from './Task/Task';

import {ColumnProps, ColumnType, ProjectType} from './types';

interface Props {
  columnData: ColumnProps;
  handleAddTask(title: string, type?: ColumnType): void;
  handleDeleteTask(taskId: string, type?: ColumnType): void;
  handleUpdateProject(newState: ProjectType): void;
}

const Column: FC<Props> = memo(
  ({
    columnData,
    handleAddTask,
    handleDeleteTask,
    handleUpdateProject,
  }) => {
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
                <Task
                  key={task.id}
                  index={index}
                  task={task}
                  columnType={columnData.id}
                  handleDeleteTask={handleDeleteTask}
                  handleUpdateProject={handleUpdateProject}
                />
              ))}
              {providedDrop.placeholder}
            </div>
          )}
        </Droppable>
      </div>
    );
  },
);
export default Column;
