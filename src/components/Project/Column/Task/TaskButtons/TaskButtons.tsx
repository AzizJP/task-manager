import {FC, memo, useCallback, useMemo} from 'react';

import ToggleCheckbox from '../../../../Shared/ToggleCheckbox/ToggleCheckbox';

import {ColumnType} from '../../types';

import {TaskTypes} from '../types';

import './TaskButtons.scss';

interface TaskButtonProps {
  formState: TaskTypes;
  handleCompleteTaskClick(): void;
  handleEditButtonClick(): void;
  handleDeleteTask(taskId: string, type?: ColumnType): void;
  columnType: ColumnType;
}

const TaskButtons: FC<TaskButtonProps> = memo(
  ({
    formState,
    handleCompleteTaskClick,
    handleEditButtonClick,
    handleDeleteTask,
    columnType,
  }) => {
    const taskButtonChange = useMemo(() => {
      if (!formState.canEdit) {
        return (
          <ToggleCheckbox
            toggleCheckboxClick={handleCompleteTaskClick}
            isToggled={formState.completed}
          />
        );
      }
      return (
        <button type="submit" className="task__button button-hover">
          Submit
        </button>
      );
    }, [formState, handleCompleteTaskClick]);

    const disableEditButton = useMemo(
      () => formState.completed || formState.canEdit,
      [formState],
    );

    const disableDeleteButton = useMemo(
      () => formState.canEdit,
      [formState],
    );

    const onDeleteButton = useCallback(
      () => handleDeleteTask(formState.id, columnType),
      [formState, handleDeleteTask, columnType],
    );

    return (
      <div className="task__buttons">
        {taskButtonChange}
        <button
          type="button"
          className="task__button button-hover"
          disabled={disableEditButton}
          onClick={handleEditButtonClick}
        >
          Edit
        </button>
        <button
          type="button"
          className="task__button button-hover"
          disabled={disableDeleteButton}
          onClick={onDeleteButton}
        >
          Delete
        </button>
      </div>
    );
  },
);

export default TaskButtons;
