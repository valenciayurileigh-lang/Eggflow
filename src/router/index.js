import { createRouter, createWebHistory } from 'vue-router';
import { isAuthenticated, userRole, getDashboardRoute, UserRoles } from '../stores/auth.js';

const routes = [
  {
    path: '/',
    redirect: () => {
      if (isAuthenticated.value && userRole.value) {
        return getDashboardRoute(userRole.value);
      }
      return '/login';
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue'),
    meta: { requiresAuth: false, guestOnly: true }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../views/Signup.vue'),
    meta: { requiresAuth: false, guestOnly: true }
  },
  
  // Manager Routes
  {
    path: '/manager',
    redirect: '/manager/dashboard'
  },
  {
    path: '/manager/dashboard',
    name: 'ManagerDashboard',
    component: () => import('../views/manager/ManagerDashboard.vue'),
    meta: { requiresAuth: true, allowedRoles: [UserRoles.MANAGER] }
  },
  
  // Staff Routes
  {
    path: '/staff',
    redirect: '/staff/dashboard'
  },
  {
    path: '/staff/dashboard',
    name: 'StaffDashboard',
    component: () => import('../views/staff/StaffDashboard.vue'),
    meta: { requiresAuth: true, allowedRoles: [UserRoles.STAFF] }
  },
  
  // Customer Routes
  {
    path: '/customer',
    redirect: '/customer/dashboard'
  },
  {
    path: '/customer/dashboard',
    name: 'CustomerDashboard',
    component: () => import('../views/customer/CustomerDashboard.vue'),
    meta: { requiresAuth: true, allowedRoles: [UserRoles.CUSTOMER] }
  },
  
  // Legacy dashboard route - redirect based on role
  {
    path: '/dashboard',
    redirect: () => {
      if (isAuthenticated.value && userRole.value) {
        return getDashboardRoute(userRole.value);
      }
      return '/login';
    }
  },

  // 404 - Catch all
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Navigation guard to protect routes
router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta.requiresAuth;
  const guestOnly = to.meta.guestOnly;
  const allowedRoles = to.meta.allowedRoles;

  // If route requires authentication
  if (requiresAuth && !isAuthenticated.value) {
    // Redirect to login if trying to access protected route
    next('/login');
    return;
  }

  // If route is for guests only (login/signup) and user is authenticated
  if (guestOnly && isAuthenticated.value) {
    // Redirect to appropriate dashboard
    next(getDashboardRoute(userRole.value));
    return;
  }

  // Check role-based access
  if (allowedRoles && allowedRoles.length > 0) {
    if (!allowedRoles.includes(userRole.value)) {
      // User doesn't have the required role, redirect to their dashboard
      next(getDashboardRoute(userRole.value));
      return;
    }
  }

  next();
});

export default router;
