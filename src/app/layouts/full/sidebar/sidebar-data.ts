import { NavItem } from "./nav-item/nav-item";

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',  // Icono equivalente en Tabler
    route: '/dashboard',
  },
  {
    displayName: 'Usuarios',
    iconName: 'users',             // Nombre correcto en Tabler
    route: '/users',
  },
  {
    displayName: 'Personnel',
    iconName: 'users-group',       // Icono para grupos de usuarios
    route: '/personnel',
  },
  {
    displayName: 'Passenger',
    iconName: 'user',              // Icono genérico de usuario
    route: '/passengers',
  },
  {
    displayName: 'Airport Service',
    iconName: 'building-skyscraper',  // Icono específico de aeropuerto
    route: '/airportservices',
  },
  {
    displayName: 'Flight',
    iconName: 'plane',             // Icono de avión
    route: '/flights',
  },
  {
    displayName: 'Flight Detail',
    iconName: 'route',             // Icono para rutas de vuelo
    route: '/pedidos/listado',
  },
  {
    displayName: 'Baggage',
    iconName: 'luggage',           // Mismo nombre en Tabler
    route: '/baggages',
  },
];