import { email, isAuth, isAuthChecked } from '@store/slices/userSlice';
import { useAppSelector } from '@store/store';

export const selectIsAuth = () => useAppSelector(isAuth);
export const selectIsAuthChecked = () => useAppSelector(isAuthChecked);
export const selectEmail = () => useAppSelector(email);
