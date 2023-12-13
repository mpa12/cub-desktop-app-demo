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
import { ReactComponent as trash } from './trash.svg';
import { ReactComponent as folderImg } from './folder-img.svg';
import { ReactComponent as file } from './file.svg';
import { ReactComponent as download } from './download.svg';
import { ReactComponent as threeDotsVertical } from './three-dots-vertical.svg';
import { ReactComponent as pencil } from './pencil.svg';
import { ReactComponent as person } from './person.svg';
import { ReactComponent as circleThreeDots } from './circle-three-dots.svg';
import { ReactComponent as fileEarmarkBarGraph } from './file-earmark-bar-graph.svg';
import { ReactComponent as gear } from './gear.svg';
import { ReactComponent as house } from './house.svg';

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
  trash,
  folderImg,
  file,
  download,
  threeDotsVertical,
  pencil,
  person,
  circleThreeDots,
  fileEarmarkBarGraph,
  gear,
  house,
};

export function getIcon(key: keyof typeof ICONS, props: Record<string, any>) {
  if (!key || !ICONS[key]) {
    return React.createElement('div', null, `Иконка не найдена: ${key}`);
  }

  return React.createElement(ICONS[key], props);
}
