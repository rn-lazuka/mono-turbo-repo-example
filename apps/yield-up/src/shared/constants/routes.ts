export const ROUTES = {
  main: '/',
  dashboard: 'dashboard',
  activity: 'activity',
  asset: 'asset',
  error: 'error',
};

export const NavBarRoutes = [
  { name: 'dashboard', url: ROUTES.dashboard, protected: false },
  { name: 'activity', url: ROUTES.activity, protected: false },
] as const;
