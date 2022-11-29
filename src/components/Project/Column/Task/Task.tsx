import dayjs from 'dayjs';
import calendar from 'dayjs/plugin/calendar';
import {
  ChangeEvent,
  FC,
  FormEvent,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {Draggable} from 'react-beautiful-dnd';
import {useParams} from 'react-router-dom';

import {ColumnType, ProjectType} from '../types';

import TaskButtons from './TaskButtons/TaskButtons';

import {TaskTypes} from './types';

import './Task.scss';

dayjs.extend(calendar);

interface TaskProps {
  task: TaskTypes;
  handleDeleteTask(taskId: string, type?: ColumnType): void;
  index: number;
  columnType: ColumnType;
  handleUpdateProject(newState: ProjectType): void;
}

const Task: FC<TaskProps> = memo(
  ({
    task,
    handleDeleteTask,
    index,
    columnType,
    handleUpdateProject,
  }) => {
    const {id} = useParams();

    const [formState, setFormState] = useState<TaskTypes>({
      title: '',
      description: '',
      date: '',
      id: '',
      completed: false,
      timeOut: false,
      canEdit: false,
      file: '',
      ...task,
    });

    useEffect(() => {
      const today = dayjs(
        dayjs().calendar(dayjs('DD/MM/YYYY')),
      ).valueOf();
      const taskCompleteDate = dayjs(formState.date).valueOf();
      setFormState({...formState, timeOut: today > taskCompleteDate});
    }, [formState.date]);

    const handleTaskEdit = useCallback(
      (newState: TaskTypes, type: ColumnType) => {
        const newProject = JSON.parse(
          localStorage.getItem('projectTasks'),
        )[id];
        const taskIndex = newProject[type].tasks.findIndex(
          (el: TaskTypes) => el.id === formState.id,
        );
        const copyProject = {...newProject};
        copyProject[type].tasks.splice(taskIndex, 1, newState);
        handleUpdateProject(copyProject);
      },
      [formState.id, handleUpdateProject, id],
    );

    const handleCompleteTaskClick = useCallback(() => {
      const newState = {
        ...formState,
        completed: !formState.completed,
      };
      setFormState(newState);
      handleTaskEdit(newState, columnType);
    }, [formState, handleTaskEdit, columnType]);

    const handleEditButtonClick = useCallback(() => {
      setFormState({...formState, canEdit: !formState.canEdit});
    }, [formState]);

    const handleTitleChange = useCallback(
      (evt: ChangeEvent<HTMLInputElement>) => {
        setFormState({...formState, title: evt.target.value});
      },
      [formState],
    );

    const handleDateChange = useCallback(
      (evt: ChangeEvent<HTMLInputElement>) => {
        setFormState({...formState, date: evt.target.value});
      },
      [formState],
    );

    const handleTextChange = useCallback(
      (evt: ChangeEvent<HTMLTextAreaElement>) => {
        setFormState({...formState, description: evt.target.value});
      },
      [formState],
    );

    const handleConfirm = useCallback(
      (evt: FormEvent<HTMLFormElement>) => {
        const newState = {
          ...formState,
          canEdit: !formState.canEdit,
        };
        evt.preventDefault();
        handleEditButtonClick();
        handleTaskEdit(newState, columnType);
      },
      [handleEditButtonClick, handleTaskEdit, formState, columnType],
    );

    const formClassName = useMemo(() => {
      let className = 'task';
      if (formState.completed) {
        return (className += ' task_completed');
      }
      if (formState.timeOut) {
        return (className += ' task_time-out');
      }
      return className;
    }, [formState]);

    const taskTitleState = useMemo(() => {
      let res = formState.title;
      if (formState.completed) {
        return (res += ' Congratulations, task accomplished!');
      }
      if (formState.timeOut) {
        return (res += ' Unfortunately, the time is up!');
      }
      return res;
    }, [formState]);

    const taskTitle = useMemo(() => {
      if (formState.canEdit) {
        return (
          <input
            type="text"
            className="task__title_input"
            value={formState.title}
            onChange={handleTitleChange}
          />
        );
      }
      return <h2 className="task__title">{taskTitleState}</h2>;
    }, [formState, handleTitleChange, taskTitleState]);

    const dateNow = useMemo(() => {
      return `Created: ${dayjs(dayjs().calendar('DD/MM/YYYY')).format(
        'DD/MM/YYYY',
      )}`;
    }, []);

    const taskDate = useMemo(() => {
      if (formState.canEdit) {
        return (
          <input
            id="input-date"
            className="task__date-input"
            type="date"
            value={formState.date}
            onChange={handleDateChange}
          />
        );
      }
      if (!formState.date) {
        return 'Enter the end date for the task';
      }
      return dayjs(
        dayjs(formState.date).calendar('DD/MM/YYYY'),
      ).format('DD/MM/YYYY');
    }, [formState, handleDateChange]);

    return (
      <Draggable draggableId={task.id.toString()} index={index}>
        {providedDragTask => (
          <form
            id="task-form"
            className={formClassName}
            onSubmit={handleConfirm}
            ref={providedDragTask.innerRef}
            {...providedDragTask.draggableProps}
            {...providedDragTask.dragHandleProps}
          >
            <div className="task__text-group">
              <div>{taskTitle}</div>
              <h3 className="task__date">{dateNow}</h3>
              <label className="task__date">
                {'Complete before: '}
                {taskDate}
              </label>
              <textarea
                className="task__description"
                maxLength={150}
                minLength={2}
                placeholder="Task description"
                disabled={!formState.canEdit}
                spellCheck
                value={formState.description}
                onChange={handleTextChange}
                form="task-form"
              />
              <div>
                <a
                  href={formState.file}
                  target="_blank"
                  className="file__text text-hover"
                  rel="noreferrer"
                >
                  {formState.file && 'File preview'}
                </a>
              </div>
            </div>
            <TaskButtons
              formState={formState}
              handleCompleteTaskClick={handleCompleteTaskClick}
              handleEditButtonClick={handleEditButtonClick}
              handleDeleteTask={handleDeleteTask}
              columnType={columnType}
            />
          </form>
        )}
      </Draggable>
    );
  },
);

export default Task;
