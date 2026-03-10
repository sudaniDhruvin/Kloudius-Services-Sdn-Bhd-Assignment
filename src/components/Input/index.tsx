import React, { useState } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleSheet,
  Text,
} from 'react-native';
import { Icons } from '../../assets/images/icons';
import { FONTS } from '../../theme/fonts';

interface CustomTextInputProps extends Omit<TextInputProps, 'style'> {
  isPassword?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  errorMessage?: string;
}

export const Input: React.FC<CustomTextInputProps> = ({
  isPassword = false,
  secureTextEntry: propSecure = false,
  containerStyle,
  inputStyle,
  errorMessage,
  placeholder,
  ...props
}) => {
  const secureTextEntry = isPassword || propSecure;
  const [isVisible, setIsVisible] = useState(false);

  return (
    <View style={{ marginBottom: 10 }}>
      <View
        style={[
          styles.container,
          { borderColor: errorMessage ? 'red' : 'gray' },
          containerStyle,
        ]}
      >
        <TextInput
          style={[styles.input, inputStyle]}
          placeholder={placeholder}
          secureTextEntry={secureTextEntry ? !isVisible : undefined}
          placeholderTextColor="gray"
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            onPress={() => {
              setIsVisible(!isVisible);
            }}
            style={styles.iconContainer}
            accessibilityLabel="Toggle password visibility"
            accessibilityRole="button"
          >
            {isVisible ? (
              <Icons.EyeCloseIcon width={20} height={20} />
            ) : (
              <Icons.EyeOpenIcon width={20} height={20} />
            )}
          </TouchableOpacity>
        )}
      </View>
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: 'white',
  },
  input: {
    paddingRight: 40,
    fontSize: 16,
    fontFamily: FONTS.regular,
  },
  iconContainer: {
    position: 'absolute',
    right: 12,
    bottom: "40%",
    marginTop: -10,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginTop: 4,
    textAlign: 'left',
    fontFamily: FONTS.regular,
  },
});
