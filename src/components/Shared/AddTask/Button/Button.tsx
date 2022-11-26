import {FC, memo} from 'react';

import './Button.scss';

interface ButtonProp {
  title?: string;
  text: string;
}

const Button: FC<ButtonProp> = memo(({title, text}) => {
  return (
    <button
      className="button button_hover"
      type="submit"
      disabled={!title}
    >
      {text}
    </button>
  );
});

export default Button;
