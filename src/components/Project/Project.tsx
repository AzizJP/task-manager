import {FC, memo} from 'react';
import {Link} from 'react-router-dom';

import './Project.scss';

const Project: FC = memo(() => {
  return (
    <section className="project">
      <h1 className="project__title">Project</h1>
      <Link to="/">To main</Link>
    </section>
  );
});

export default Project;
