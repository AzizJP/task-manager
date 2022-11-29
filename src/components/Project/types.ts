export interface ProjectState {
  title: string;
  id?: string;
  tasks?: Array<ProjectState>;
}
