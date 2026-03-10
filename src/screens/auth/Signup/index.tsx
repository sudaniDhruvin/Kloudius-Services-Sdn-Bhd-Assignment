import React, { useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Controller, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { styles } from '../styles';
import { Input } from '../../../components/Input';
import { useAuth } from '../../../context/AuthContext';
import { NavigationProp } from '../../../types/navigation';
import { authRules, SignupFormData } from '../../../validations/authSchema';
import { Button } from '../../../components/Button';

export const SignupScreen = () => {
  const { signup, error, loading } = useAuth();
  const navigation = useNavigation<NavigationProp>();

  const {
    control,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<SignupFormData>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignupFormData) => {
    signup(data.name, data.email, data.password);
  };

  useEffect(() => {
    if (error?.email) {
      console.log('error', {
        type: 'server',
        message: error?.email,
      });
      setError('email', {
        type: 'server',
        message: error?.email,
      });
    }
  }, [error, setError]);

  console.log('errors =--->', errors);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Join us and get started</Text>
        </View>

        <View style={styles.form}>
          <Controller
            control={control}
            name="name"
            rules={authRules.signup.name}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder="Full Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                errorMessage={errors.name?.message}
              />
            )}
          />

          <Controller
            control={control}
            name="email"
            rules={authRules.signup.email}
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
            rules={authRules.signup.password}
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

          {/* <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >

            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity> */}
          <Button
            title="Sign Up"
            disabled={
              watch('name') && watch('email') && watch('password')
                ? false
                : true
            }
            loading={loading}
            onPress={handleSubmit(onSubmit)}
          />

          <TouchableOpacity
            style={styles.footer}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.footerText}>
              Already have an account?{' '}
              <Text style={styles.footerLink}>Login</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
