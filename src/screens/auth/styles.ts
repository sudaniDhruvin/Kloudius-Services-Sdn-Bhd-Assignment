import { StyleSheet } from 'react-native';
import { FONTS } from '../../theme/fonts';

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F8F9FA', // Light, modern neutral background
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 40,
    justifyContent: 'center',
  },
  headerContainer: {
    marginBottom: 40,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 32,
    color: '#1A1A1A',
    letterSpacing: 0.5,
    fontFamily: FONTS.semiBold,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C757D',
    marginTop: 8,
    fontFamily: FONTS.regular,
  },
  form: {
    width: '100%',
  },
  // Customizing your common Input spacing via containerStyle prop
  inputGap: {
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF', // Professional Blue
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
    // Shadow for iOS
    shadowColor: '#007AFF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    // Elevation for Android
    elevation: 6,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    fontFamily: FONTS.semiBold,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
  },
  footerText: {
    fontSize: 14,
    color: '#6C757D',
    fontFamily: FONTS.regular,
  },
  footerLink: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '700',
    marginLeft: 4,
    fontFamily: FONTS.semiBold,
  },
});
