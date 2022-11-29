import {FC, memo} from 'react';

import './Button.scss';

interface ButtonProp {
  title?: string;
  text: string;
  classNameButton?: string;
}

const Button: FC<ButtonProp> = memo(
  ({title, text, classNameButton}) => {
    return (
      <button
        className={`button button_hover ${classNameButton}`}
        type="submit"
        disabled={!title}
      >
        {text}
      </button>
    );
  },
);

export default Button;
