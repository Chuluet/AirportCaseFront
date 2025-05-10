import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-grid-add',
    route: '/dashboard',
  },
  {
    displayName: 'Usuarios',
    iconName: 'users',
    route: '/users',
  },
  {
    displayName: 'Pedido',
    iconName: 'wheelchair-off',
    route: '/pedidos/listado',
  },
];
