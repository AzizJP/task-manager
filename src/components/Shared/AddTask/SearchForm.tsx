import {
  FC,
  ChangeEvent,
  FormEvent,
  memo,
  useCallback,
  useState,
} from 'react';

import Button from './Button/Button';

import './SearchForm.scss';

import {ProjectState} from './types';

interface MainProp {
  handleAddProject?(FormsState: ProjectState): void;
}

const SearchForm: FC<MainProp> = memo(({handleAddProject}) => {
  const [newProject, setNewProject] = useState<ProjectState>({
    title: '',
  });

  const handleHeaderChange = useCallback(
    (evt: ChangeEvent<HTMLInputElement>): void => {
      setNewProject({title: evt.target.value});
    },
    [],
  );

  const handleSubmit = useCallback(
    (evt: FormEvent<HTMLFormElement>): void => {
      evt.preventDefault();
      handleAddProject(newProject);
      setNewProject({title: ''});
    },
    [newProject, handleAddProject],
  );

  return (
    <form className="form__input-wrapper" onSubmit={handleSubmit}>
      <input
        type="text"
        className="form__input"
        placeholder="Enter project title"
        value={newProject.title}
        onChange={handleHeaderChange}
      />
      <Button title={newProject.title} text="Add project" />
    </form>
  );
});

export default SearchForm;
