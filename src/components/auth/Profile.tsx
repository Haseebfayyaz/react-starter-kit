import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  Box,
  Avatar,
  Button,
  Divider,
  Stack,
} from '@mui/material';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { clearUser } from '@/store/userSlice';

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, isAuthenticated } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login');
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
          }}
        >
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: 'primary.main',
              fontSize: '2.5rem',
              mb: 2,
            }}
          >
            {user.name?.charAt(0).toUpperCase() || 'U'}
          </Avatar>

          <Typography component="h1" variant="h4" gutterBottom>
            Profile
          </Typography>

          <Divider sx={{ width: '100%', my: 3 }} />

          <Stack spacing={3} sx={{ width: '100%', mt: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <Box sx={{ minWidth: { sm: 150 } }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Name
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {user.name}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
              <Box sx={{ minWidth: { sm: 150 } }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Email
                </Typography>
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  {user.email}
                </Typography>
              </Box>
            </Box>

            {user.id && (
              <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 2 }}>
                <Box sx={{ minWidth: { sm: 150 } }}>
                  <Typography variant="subtitle2" color="text.secondary">
                    User ID
                  </Typography>
                </Box>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {user.id}
                  </Typography>
                </Box>
              </Box>
            )}
          </Stack>

          <Box sx={{ mt: 4, width: '100%', display: 'flex', justifyContent: 'center' }}>
            <Button
              variant="contained"
              color="error"
              onClick={handleLogout}
              sx={{ px: 4 }}
            >
              Logout
            </Button>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;

