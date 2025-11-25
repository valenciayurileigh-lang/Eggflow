import { ref, computed } from 'vue';

// User roles enum
export const UserRoles = {
  MANAGER: 'manager',
  STAFF: 'staff',
  CUSTOMER: 'customer'
};

// Store user data and authentication state
const user = ref(null);
const authenticated = ref(false);
const authError = ref('');

// Load auth state from localStorage on startup
export const initializeAuth = () => {
  const savedUser = localStorage.getItem('eggflow_user');
  if (savedUser) {
    try {
      user.value = JSON.parse(savedUser);
      authenticated.value = true;
    } catch (error) {
      console.error('Failed to load auth state:', error);
      localStorage.removeItem('eggflow_user');
    }
  }
};

// Login function
export const login = (email, password) => {
  authError.value = '';
  
  // Validate inputs
  if (!email || !password) {
    authError.value = 'Email and password are required';
    return { success: false, role: null };
  }

  if (!email.includes('@')) {
    authError.value = 'Please enter a valid email address';
    return { success: false, role: null };
  }

  // Check if user exists in localStorage
  const users = JSON.parse(localStorage.getItem('eggflow_users') || '[]');
  const foundUser = users.find(u => u.email === email);

  if (!foundUser) {
    authError.value = 'User not found. Please sign up first.';
    return { success: false, role: null };
  }

  if (foundUser.password !== password) {
    authError.value = 'Invalid password';
    return { success: false, role: null };
  }

  // Successful login
  user.value = {
    id: foundUser.id,
    email: foundUser.email,
    name: foundUser.name,
    role: foundUser.role,
    createdAt: foundUser.createdAt
  };
  authenticated.value = true;
  localStorage.setItem('eggflow_user', JSON.stringify(user.value));
  
  return { success: true, role: foundUser.role };
};

// Signup function with role selection
export const signup = (name, email, password, confirmPassword, role = UserRoles.CUSTOMER) => {
  authError.value = '';

  // Validate inputs
  if (!name || !email || !password || !confirmPassword) {
    authError.value = 'All fields are required';
    return { success: false, role: null };
  }

  if (!email.includes('@')) {
    authError.value = 'Please enter a valid email address';
    return { success: false, role: null };
  }

  if (password.length < 6) {
    authError.value = 'Password must be at least 6 characters long';
    return { success: false, role: null };
  }

  if (password !== confirmPassword) {
    authError.value = 'Passwords do not match';
    return { success: false, role: null };
  }

  // Validate role
  if (!Object.values(UserRoles).includes(role)) {
    authError.value = 'Invalid role selected';
    return { success: false, role: null };
  }

  // Check if user already exists
  const users = JSON.parse(localStorage.getItem('eggflow_users') || '[]');
  if (users.some(u => u.email === email)) {
    authError.value = 'Email already registered';
    return { success: false, role: null };
  }

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    name,
    email,
    password, // Note: In production, never store plain text passwords
    role,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem('eggflow_users', JSON.stringify(users));

  // Auto-login after signup
  user.value = {
    id: newUser.id,
    email: newUser.email,
    name: newUser.name,
    role: newUser.role,
    createdAt: newUser.createdAt
  };
  authenticated.value = true;
  localStorage.setItem('eggflow_user', JSON.stringify(user.value));

  return { success: true, role: newUser.role };
};

// Logout function
export const logout = () => {
  user.value = null;
  authenticated.value = false;
  authError.value = '';
  localStorage.removeItem('eggflow_user');
};

// Clear auth error
export const clearAuthError = () => {
  authError.value = '';
};

// Get dashboard route based on user role
export const getDashboardRoute = (role) => {
  switch (role) {
    case UserRoles.MANAGER:
      return '/manager/dashboard';
    case UserRoles.STAFF:
      return '/staff/dashboard';
    case UserRoles.CUSTOMER:
      return '/customer/dashboard';
    default:
      return '/login';
  }
};

// Check if user has required role
export const hasRole = (requiredRole) => {
  if (!user.value) return false;
  if (Array.isArray(requiredRole)) {
    return requiredRole.includes(user.value.role);
  }
  return user.value.role === requiredRole;
};

// Computed properties
export const currentUser = computed(() => user.value);
export const getAuthError = computed(() => authError.value);
export const isAuthenticated = computed(() => authenticated.value);
export const userRole = computed(() => user.value?.role || null);
