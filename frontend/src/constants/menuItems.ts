import {HeaderLinkProps} from "@components/header/HeaderLink";

const menuItems: HeaderLinkProps[] = [
  {
    title: 'Задачи',
    path: '/tasks',
    iconName: 'tasks',
  },
  {
    title: 'Проекты',
    path: '/projects',
    iconName: 'folder',
  },
  {
    title: 'Сотрудники',
    path: '/employees',
    iconName: 'people',
  },
  {
    title: 'Календарь',
    path: '/calendar',
    iconName: 'calendar',
  },
  {
    title: 'Сервисы',
    path: '/services',
    iconName: 'circleThreeDots',
  },
];

export default menuItems;
