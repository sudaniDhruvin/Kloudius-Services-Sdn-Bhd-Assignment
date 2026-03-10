import React, { useEffect } from 'react';
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from '../styles';
import { Input } from '../../../components/Input';
import { useAuth } from '../../../context/AuthContext';
import { NavigationProp } from '../../../types/navigation';
import { authRules, LoginFormData } from '../../../validations/authSchema';
import { Button } from '../../../components/Button';

export const LoginScreen = () => {
  const { login, loading, error } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: LoginFormData) => {
    login(data.email, data.password);
  };

  useEffect(() => {
    if (error && !error?.email) {
        Alert.alert(error)
    }
  }, [error])
  

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="email"
            rules={authRules.login.email}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Email Address"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
                errorMessage={errors.email?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="password"
            rules={authRules.login.password}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                isPassword
                errorMessage={errors.password?.message}
              />
            )}
          />

          <Button
            title="Login"
            disabled={
              watch('email') && watch('password')
                ? false
                : true
            }
            loading={loading}
            onPress={handleSubmit(onSubmit)}
          />
          <TouchableOpacity
            style={styles.footer}
            onPress={() => navigation.navigate('Signup')}
          >
            <Text style={styles.footerText}>
              Don't have an account?{' '}
              <Text style={styles.footerLink}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
