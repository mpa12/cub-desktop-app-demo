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
    title: 'Профиль',
    path: '/profile',
    iconName: 'person',
  },
];

export default menuItems;
