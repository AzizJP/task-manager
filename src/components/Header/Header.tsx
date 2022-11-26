import {FC, memo} from 'react';

import './Header.scss';

const Header: FC = memo(() => {
  return (
    <header className="header">
      <h1 className="header__title">Task manager</h1>
    </header>
  );
});

export default Header;
