import React from "react";
import { ReactComponent as search } from './search.svg';
import { ReactComponent as dropdownArrow } from './dropdown-arrow.svg';

export const ICONS = {
  search: search,
  dropdownArrow: dropdownArrow,
};

export function getIcon(key: keyof typeof ICONS, props: Record<string, any>) {
  if (!key || !ICONS[key]) {
    return React.createElement('div', null, `Иконка не найдена: ${key}`);
  }

  return React.createElement(ICONS[key], props);
}
