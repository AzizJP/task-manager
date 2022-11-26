import {FC, memo} from 'react';
import {Route, Routes} from 'react-router-dom';

import './App.scss';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Project from '../Project/Project';

const App: FC = memo(() => {
  return (
    <div className="page">
      <div className="page__wrapper">
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </div>
    </div>
  );
});

export default App;
