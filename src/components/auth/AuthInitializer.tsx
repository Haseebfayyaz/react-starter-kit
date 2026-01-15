import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setLoading, setUser, setError, clearUser } from '@/store/userSlice';
import { authAPI } from '@/services/api';
import type { User } from '@/store/userSlice';

const AuthInitializer = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated, user } = useAppSelector((state) => state.user);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('token');
      
      // If token exists but user is not loaded, fetch user details
      if (token && !user) {
        dispatch(setLoading(true));
        try {
          const userData = await authAPI.getUser();
          const user: User = {
            id: userData.id,
            email: userData.email,
            name: userData.name,
            token: token,
          };
          dispatch(setUser(user));
        } catch (error) {
          // If fetching user fails, clear token and auth state
          localStorage.removeItem('token');
          dispatch(clearUser());
          dispatch(setError('Session expired. Please login again.'));
        }
      } else if (!token && isAuthenticated) {
        // If no token but state says authenticated, clear state
        dispatch(clearUser());
      }
    };

    initializeAuth();
  }, [dispatch, user, isAuthenticated]);

  return null;
};

export default AuthInitializer;

