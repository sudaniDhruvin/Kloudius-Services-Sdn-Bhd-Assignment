import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { AppNavigator } from './AppNavigator';
import { AuthNavigator } from './AuthNavigator';

export const RootNavigator: React.FC = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null; // Or <ActivityIndicator size="large" color="#0000ff" style={{ flex: 1, justifyContent: 'center' }} />
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};
