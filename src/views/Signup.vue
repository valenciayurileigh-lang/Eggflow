

<template>
  <div class="min-h-screen flex items-center justify-center p-4" style="background: linear-gradient(to bottom right, #D6EFD8, #80AF81);">
    <div class="w-full max-w-md">
      <!-- Logo/Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold mb-2" style="color: #1A5319;">Eggflow</h1>
        <p style="color: #000000;">Create your account to get started</p>
      </div>

      <!-- Signup Card -->
      <div class="card" style="background-color: #FFFFFF; border: 2px solid #80AF81; box-shadow: 0 10px 30px rgba(26, 83, 25, 0.15); border-radius: 1rem;">
        <div class="card-body">
          <h2 class="card-title text-2xl mb-6 justify-center" style="color: #1A5319;">Create Account</h2>

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
          <form @submit.prevent="handleSignup" class="space-y-4">
            <!-- Full Name Input -->
            <div class="form-control w-full">
              <label class="label py-2">
                <span class="label-text font-semibold" style="color: #000000;">Full Name</span>
              </label>
              <input
                v-model="name"
                type="text"
                placeholder="Enter your full name"
                class="input input-bordered w-full"
                style="border-color: #80AF81; color: #333333; background-color: white;"
                @focus="$event.target.style.borderColor = '#508D4E'; $event.target.style.boxShadow = '0 0 0 3px rgba(80, 141, 78, 0.2)'"
                @blur="$event.target.style.borderColor = '#80AF81'; $event.target.style.boxShadow = 'none'"
                required
              />
            </div>

            <!-- Email Input -->
            <div class="form-control w-full">
              <label class="label py-2">
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

            <!-- Role Selection -->
            <div class="form-control w-full">
              <label class="label py-2">
                <span class="label-text font-semibold" style="color: #000000;">Account Type</span>
              </label>
              <div class="grid grid-cols-3 gap-2">
                <label 
                  class="cursor-pointer p-3 rounded-lg border-2 text-center transition-all"
                  :style="selectedRole === 'manager' 
                    ? 'border-color: #508D4E; background-color: #D6EFD8;' 
                    : 'border-color: #80AF81; background-color: white;'"
                >
                  <input 
                    type="radio" 
                    v-model="selectedRole" 
                    value="manager" 
                    class="hidden"
                  />
                  <div class="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" :style="selectedRole === 'manager' ? 'color: #1A5319;' : 'color: #508D4E;'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span class="text-xs font-medium" :style="selectedRole === 'manager' ? 'color: #1A5319;' : 'color: #000000;'">Manager</span>
                  </div>
                </label>

                <label 
                  class="cursor-pointer p-3 rounded-lg border-2 text-center transition-all"
                  :style="selectedRole === 'staff' 
                    ? 'border-color: #508D4E; background-color: #D6EFD8;' 
                    : 'border-color: #80AF81; background-color: white;'"
                >
                  <input 
                    type="radio" 
                    v-model="selectedRole" 
                    value="staff" 
                    class="hidden"
                  />
                  <div class="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" :style="selectedRole === 'staff' ? 'color: #1A5319;' : 'color: #508D4E;'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span class="text-xs font-medium" :style="selectedRole === 'staff' ? 'color: #1A5319;' : 'color: #000000;'">Staff</span>
                  </div>
                </label>

                <label 
                  class="cursor-pointer p-3 rounded-lg border-2 text-center transition-all"
                  :style="selectedRole === 'customer' 
                    ? 'border-color: #508D4E; background-color: #D6EFD8;' 
                    : 'border-color: #80AF81; background-color: white;'"
                >
                  <input 
                    type="radio" 
                    v-model="selectedRole" 
                    value="customer" 
                    class="hidden"
                  />
                  <div class="flex flex-col items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mb-1" :style="selectedRole === 'customer' ? 'color: #1A5319;' : 'color: #508D4E;'" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span class="text-xs font-medium" :style="selectedRole === 'customer' ? 'color: #1A5319;' : 'color: #000000;'">Customer</span>
                  </div>
                </label>
              </div>
            </div>

            <!-- Password Input -->
            <div class="form-control w-full">
              <label class="label py-2">
                <span class="label-text font-semibold" style="color: #000000;">Password</span>
              </label>
              <input
                v-model="password"
                type="password"
                placeholder="At least 6 characters"
                class="input input-bordered w-full"
                style="border-color: #80AF81; color: #333333; background-color: white;"
                @focus="$event.target.style.borderColor = '#508D4E'; $event.target.style.boxShadow = '0 0 0 3px rgba(80, 141, 78, 0.2)'"
                @blur="$event.target.style.borderColor = '#80AF81'; $event.target.style.boxShadow = 'none'"
                required
              />
              <label class="label py-1">
                <span class="label-text-alt" style="color: #508D4E;">Minimum 6 characters</span>
              </label>
            </div>

            <!-- Confirm Password Input -->
            <div class="form-control w-full">
              <label class="label py-2">
                <span class="label-text font-semibold" style="color: #000000;">Confirm Password</span>
              </label>
              <input
                v-model="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                class="input input-bordered w-full"
                style="border-color: #80AF81; color: #333333; background-color: white;"
                @focus="$event.target.style.borderColor = '#508D4E'; $event.target.style.boxShadow = '0 0 0 3px rgba(80, 141, 78, 0.2)'"
                @blur="$event.target.style.borderColor = '#80AF81'; $event.target.style.boxShadow = 'none'"
                required
              />
            </div>

            <!-- Terms and Conditions -->
            <div class="form-control">
              <label class="label cursor-pointer justify-start gap-3 py-2">
                <input v-model="agreeTerms" type="checkbox" class="checkbox" style="border-color: #80AF81; accent-color: #508D4E;" />
                <span class="label-text" style="color: #000000;">I agree to the terms and conditions</span>
              </label>
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              class="btn w-full mt-4 text-white font-semibold transition-all"
              :disabled="isLoading || !agreeTerms"
              style="background-color: #508D4E; border-color: #508D4E;"
              @mouseenter="$event.target.style.backgroundColor = '#1A5319'; $event.target.style.transform = 'translateY(-2px)'; $event.target.style.boxShadow = '0 4px 12px rgba(26, 83, 25, 0.4)'"
              @mouseleave="$event.target.style.backgroundColor = '#508D4E'; $event.target.style.transform = 'translateY(0)'; $event.target.style.boxShadow = 'none'"
            >
              <span v-if="!isLoading">Create Account</span>
              <span v-else>
                <span class="loading loading-spinner loading-sm"></span>
                Creating...
              </span>
            </button>
          </form>

          <!-- Divider -->
          <div class="divider" style="color: #80AF81;">OR</div>

          <!-- Login Link -->
          <p class="text-center" style="color: #000000;">
            Already have an account?
            <router-link to="/login" class="font-semibold hover:underline" style="color: #1A5319;">
              Sign in
            </router-link>
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
import { signup, getAuthError, getDashboardRoute, UserRoles } from '../stores/auth.js';

const router = useRouter();
const name = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const selectedRole = ref(UserRoles.CUSTOMER);
const agreeTerms = ref(false);
const isLoading = ref(false);

const authError = computed(() => getAuthError.value);

const handleSignup = async () => {
  if (!agreeTerms.value) {
    return;
  }

  isLoading.value = true;
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const result = signup(name.value, email.value, password.value, confirmPassword.value, selectedRole.value);
  
  if (result.success) {
    // Redirect to role-specific dashboard
    router.push(getDashboardRoute(result.role));
  }
  
  isLoading.value = false;
};
</script>
