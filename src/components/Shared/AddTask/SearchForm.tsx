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
  handleAdd?(FormsState: ProjectState): void;
  placeholder?: string;
  buttonText?: string;
}

const SearchForm: FC<MainProp> = memo(
  ({handleAdd, placeholder, buttonText}) => {
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
        handleAdd(newProject);
        setNewProject({title: ''});
      },
      [newProject, handleAdd],
    );

    return (
      <form className="form__input-wrapper" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form__input"
          placeholder={placeholder}
          value={newProject.title}
          onChange={handleHeaderChange}
        />
        <Button title={newProject.title} text={buttonText} />
      </form>
    );
  },
);

export default SearchForm;
