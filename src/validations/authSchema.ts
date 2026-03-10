export interface LoginFormData {
  email: string;
  password: string;
}

export interface SignupFormData {
  name: string;
  email: string;
  password: string;
}

const emailRules = {
  required: 'Email is required',
  pattern: {
    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
    message: 'Invalid email format',
  },
};

const passwordRules = {
  required: 'Password is required',
  minLength: {
    value: 6,
    message: 'Password must be at least 6 characters',
  },
};

const nameRules = {
  required: 'Name is required',
};

export const authRules = {
  login: {
    email: emailRules,
    password: { required: 'Password is required' },
  },
  signup: {
    name: nameRules,
    email: emailRules,
    password: passwordRules,
  },
};
