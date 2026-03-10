import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useAuth } from '../../../context/AuthContext';
import { FONTS } from '../../../theme/fonts';

export const HomeScreen = () => {
  const { user, logout } = useAuth();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.content}>
        {/* Welcome Section */}
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
        </View>

        {/* User Info Card */}
        <View style={styles.card}>
          <Text style={styles.cardLabel}>Account Details</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>{user?.email}</Text>
          </View>
        </View>

        {/* Logout Button */}
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={logout}
          activeOpacity={0.7}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontFamily: FONTS.regular,
    fontSize: 18,
    color: '#6C757D',
  },
  userName: {
    fontFamily: FONTS.bold,
    fontSize: 32,
    color: '#1A1A1A',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    width: '100%',
    marginBottom: 40,
    // Shadow/Elevation for a "premium" feel
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  cardLabel: {
    fontFamily: FONTS.semiBold,
    fontSize: 14,
    color: '#007AFF',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
  },
  infoRow: {
    borderTopWidth: 1,
    borderTopColor: '#F1F3F5',
    paddingTop: 16,
  },
  infoLabel: {
    fontFamily: FONTS.regular,
    fontSize: 12,
    color: '#ADB5BD',
  },
  infoValue: {
    fontFamily: FONTS.medium,
    fontSize: 16,
    color: '#343A40',
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: '#FF3B30', // Destructive Red
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    width: '100%',
  },
  logoutText: {
    fontFamily: FONTS.semiBold,
    color: '#FFFFFF',
    fontSize: 16,
  },
});
