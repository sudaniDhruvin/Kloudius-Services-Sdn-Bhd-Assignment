import React, {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContextType, User } from '../types';

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined,
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | { email: string } | null>(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (err) {
        console.error('Failed to load user:', err);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const login = async (email: string, password: string): Promise<void> => {
    setError(null);
    if (!email || !password) {
      setError('Invalid email/password format');
      return;
    }

    try {
      setLoading(true);
      const allUsers: string | null = await AsyncStorage.getItem('users');
      const getAllUsers: User[] = allUsers ? JSON.parse(allUsers) : [];
      const findUser = getAllUsers?.find(
        (u: User) => u?.email === email && u?.password,
      );
      if (findUser && Object.keys(findUser).length > 0) {
        setUser(findUser);
        await AsyncStorage.setItem('user', JSON.stringify(findUser));
      } else {
        setError('Incorrect credentials');
        throw new Error('Incorrect credentials');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const signup = async (
    name: string,
    email: string,
    password: string,
  ): Promise<void> => {
    setError(null);
    if (!name || !email || !password || password.length < 6) {
      setError('Missing fields or password too short');
      return;
    }

    try {
      setLoading(true);
      const allUsers: string | null = await AsyncStorage.getItem('users');
      const getAllUsers: User[] = allUsers ? JSON.parse(allUsers) : [];
      if (getAllUsers.length > 0) {
        const findDuplicate = getAllUsers.some((u: User) => u.email === email);
        if (findDuplicate) {
          setError({
            email: 'Please try different one, this one is already taken!',
          });
          return;
        }
      }
      const mockUser: User = {
        id: Date.now().toString(),
        name,
        email,
        password,
      };
      setUser(mockUser);
      const addNewUser = [...getAllUsers, mockUser];
      await AsyncStorage.setItem('user', JSON.stringify(mockUser));
      await AsyncStorage.setItem('users', JSON.stringify(addNewUser));
    } catch (err) {
      console.error('err: while signup', err);
      setError('Signup failed');
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setUser(null);
    await AsyncStorage.removeItem('user');
  };

  const value: AuthContextType = {
    user,
    login,
    signup,
    logout,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
