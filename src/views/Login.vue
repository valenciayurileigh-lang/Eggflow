<template>
  <div class="min-h-screen flex items-center justify-center p-4" style="background: linear-gradient(to bottom right, #D6EFD8, #80AF81);">
    <div class="w-full max-w-md">
      <!-- Logo/Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-2" style="color: #1A5319;">Eggflow</h1>
        <p style="color: #000000;">Welcome back to your dashboard</p>
      </div>

      <!-- Login Card -->
      <div class="card" style="background-color: #FFFFFF; border: 2px solid #80AF81; box-shadow: 0 10px 30px rgba(26, 83, 25, 0.15); border-radius: 1rem;">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-6 justify-center" style="color: #1A5319;">Sign In</h2>

          <!-- Error Alert -->
          <div v-if="authError" class="alert mb-4" style="background-color: #FEE2E2; border: 1px solid #EF4444;">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              style="color: #EF4444;"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l-2-2m0 0l-2-2m2 2l2-2m-2 2l-2 2"
              />
            </svg>
            <span style="color: #EF4444;">{{ authError }}</span>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleLogin" class="space-y-4">
            <!-- Email Input -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold" style="color: #000000;">Email</span>
              </label>
              <input
                v-model="email"
                type="email"
                placeholder="Enter your email"
                class="input input-bordered w-full"
                style="border-color: #80AF81; color: #333333; background-color: white;"
                @focus="$event.target.style.borderColor = '#508D4E'; $event.target.style.boxShadow = '0 0 0 3px rgba(80, 141, 78, 0.2)'"
                @blur="$event.target.style.borderColor = '#80AF81'; $event.target.style.boxShadow = 'none'"
                required
              />
            </div>

            <!-- Password Input -->
            <div class="form-control">
              <label class="label">
                <span class="label-text font-semibold" style="color: #000000;">Password</span>
              </label>
              <input
                v-model="password"
                type="password"
                placeholder="Enter your password"
                class="input input-bordered w-full"
                style="border-color: #80AF81; color: #333333; background-color: white;"
                @focus="$event.target.style.borderColor = '#508D4E'; $event.target.style.boxShadow = '0 0 0 3px rgba(80, 141, 78, 0.2)'"
                @blur="$event.target.style.borderColor = '#80AF81'; $event.target.style.boxShadow = 'none'"
                required
              />
            </div>

            <!-- Remember Me -->
            <div class="form-control">
              <label class="label cursor-pointer">
                <span class="label-text" style="color: #000000;">Remember me</span>
                <input type="checkbox" class="checkbox" style="border-color: #80AF81; accent-color: #508D4E;" />
              </label>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="btn w-full text-white font-semibold transition-all"
              :disabled="isLoading"
              style="background-color: #508D4E; border-color: #508D4E;"
              @mouseenter="$event.target.style.backgroundColor = '#1A5319'; $event.target.style.transform = 'translateY(-2px)'; $event.target.style.boxShadow = '0 4px 12px rgba(26, 83, 25, 0.4)'"
              @mouseleave="$event.target.style.backgroundColor = '#508D4E'; $event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = 'none'"
            >
              <span v-if="!isLoading">Sign In</span>
              <span v-else>
                <span class="loading loading-spinner loading-sm"></span>
                Signing in...
              </span>
            </button>
          </form>

          <!-- Divider -->
          <div class="divider" style="color: #80AF81;">OR</div>

          <!-- Sign Up Link -->
          <p class="text-center" style="color: #000000;">
            Don't have an account?
            <router-link to="/signup" class="font-semibold hover:underline" style="color: #1A5319;">
              Sign up
            </router-link>
          </p>

          <!-- Forgot Password Link -->
          <p class="text-center text-sm mt-2" style="color: #000000;">
            <a href="#" class="hover:underline" style="color: #1A5319;">Forgot your password?</a>
          </p>
        </div>
      </div>

      <!-- Footer -->
      <p class="text-center text-sm mt-8" style="color: #000000;">
        © 2025 Eggflow. All rights reserved.
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { login, getAuthError, getDashboardRoute } from '../stores/auth.js';

const router = useRouter();
const email = ref('');
const password = ref('');
const isLoading = ref(false);

const authError = computed(() => getAuthError.value);

const handleLogin = async () => {
  isLoading.value = true;
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const result = login(email.value, password.value);
  
  if (result.success) {
    // Redirect to role-specific dashboard
    router.push(getDashboardRoute(result.role));
  }
  
  isLoading.value = false;
};
</script>
