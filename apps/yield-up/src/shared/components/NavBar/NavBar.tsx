import { useLayoutEffect, useState } from 'react';

import Typography, { type TypographyProps } from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import { NavBarRoutes } from '@shared/constants/routes';
import { selectIsAuth } from '@store/selectors/userSlice';

interface NavBarProps extends TypographyProps {
  onItemClick?: () => void;
}
const NavBar = ({ onItemClick, ...props }: NavBarProps) => {
  const { t } = useTranslation('common');
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = selectIsAuth();
  const [activeRoute, setActiveRoute] = useState('');
  const navbarUrls = NavBarRoutes.map((route) => route.url);

  const handleChangeRoute = (route: string) => {
    setActiveRoute(route);
    navigate(route);
    onItemClick?.();
  };

  useLayoutEffect(() => {
    const currentRoute = NavBarRoutes.find((r) => location.pathname === r.url);
    if (currentRoute?.url && navbarUrls.includes(currentRoute.url)) {
      setActiveRoute(currentRoute.url);
    } else {
      setActiveRoute('');
    }
  }, [location.pathname, navbarUrls]);

  return (
    <>
      {NavBarRoutes.map((route) => {
        if (!route.protected || (route.protected && isAuth)) {
          return (
            <Typography
              key={route.url}
              variant="textMSB"
              color="text.secondary"
              onClick={() => handleChangeRoute(route.url)}
              sx={[
                { cursor: 'pointer', mt: 2 },
                route.url === activeRoute && { color: 'primary.main' },
              ]}
              {...props}
            >
              {t(route.name)}
            </Typography>
          );
        }
        return null;
      })}
    </>
  );
};

export default NavBar;
