export enum ColumnType {
  QUEUE = 'QUEUE',
  DEVELOPMENT = 'DEVELOPMENT',
  DONE = 'DONE',
}

export type ProjectType = Record<ColumnType, ColumnProps>;

export interface ColumnProps {
  title: string;
  id: ColumnType;
  tasks: Array<TaskProps>;
}

interface TaskProps {
  title: string;
  id: string;
}

export const ProjectInitialData: ProjectType = {
  [ColumnType.QUEUE]: {
    title: 'Queue',
    id: ColumnType.QUEUE,
    tasks: [],
  },
  [ColumnType.DEVELOPMENT]: {
    title: 'Development',
    id: ColumnType.DEVELOPMENT,
    tasks: [],
  },
  [ColumnType.DONE]: {
    title: 'Done',
    id: ColumnType.DONE,
    tasks: [],
  },
};
