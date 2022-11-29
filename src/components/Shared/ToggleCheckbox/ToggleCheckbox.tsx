import {FC, memo} from 'react';

import './ToggleCheckbox.scss';

interface ToggleCheckboxProps {
  toggleCheckboxClick(): void;
  isToggled: boolean;
}

const ToggleCheckbox: FC<ToggleCheckboxProps> = memo(
  ({toggleCheckboxClick, isToggled}) => {
    return (
      <button
        type="button"
        className={`search__toggler ${
          isToggled ? 'search__toggler_active' : ''
        }`}
        onClick={toggleCheckboxClick}
      >
        <span
          className={`search__toggler-circle ${
            isToggled ? 'search__toggler-circle_active' : ''
          }`}
        />
      </button>
    );
  },
);

export default ToggleCheckbox;
