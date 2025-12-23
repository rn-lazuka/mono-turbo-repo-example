export const ROUTES = {
  main: '/',
  about: 'about',
  trackerViews: 'tracker-views',
  insights: 'insights',
  error: 'error',
};

export const NavBarRoutes = [
  { name: 'yieldTracker', url: ROUTES.main, protected: false },
  {
    name: 'myViews',
    url: `/${ROUTES.trackerViews}`,
    protected: true,
  },
] as const;
