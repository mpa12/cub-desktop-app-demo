import React from "react";
import { ReactComponent as search } from './search.svg';
import { ReactComponent as dropdownArrow } from './dropdown-arrow.svg';
import { ReactComponent as tasks } from './tasks.svg';
import { ReactComponent as people } from './people.svg';
import { ReactComponent as calendar } from './calendar.svg';
import { ReactComponent as folder } from './folder.svg';
import { ReactComponent as arrowLeft } from './arrow-left.svg';
import { ReactComponent as clock } from './clock.svg';
import { ReactComponent as chevronLeft } from './chevron-left.svg';
import { ReactComponent as chevronRight } from './chevron-right.svg';
import { ReactComponent as plusCircle } from './plus-circle.svg';

export const ICONS = {
  search,
  tasks,
  people,
  calendar,
  folder,
  dropdownArrow,
  arrowLeft,
  clock,
  chevronLeft,
  chevronRight,
  plusCircle,
};

export function getIcon(key: keyof typeof ICONS, props: Record<string, any>) {
  if (!key || !ICONS[key]) {
    return React.createElement('div', null, `Иконка не найдена: ${key}`);
  }

  return React.createElement(ICONS[key], props);
}
