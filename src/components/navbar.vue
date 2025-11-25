<template>

  <header class="navbar sticky top-0 shadow-sm z-10" style="background-color: #FFFFFF; border-bottom: 2px solid #80AF81;">

    <!-- Sidebar Toggle Button -->
    <section class="flex items-center">
      <label 
        for="my-drawer" 
        class="btn btn-ghost btn-circle lg:hidden ml-2"
        aria-label="Toggle sidebar"
        style="color: #1A5319;"
        @mouseenter="$event.target.style.backgroundColor = '#508D4E'; $event.target.style.color = '#FFFFFF'"
        @mouseleave="$event.target.style.backgroundColor = 'transparent'; $event.target.style.color = '#1A5319'"
      >
        <Icon icon="heroicons-outline:bars-3" width="24" height="24" />
      </label>
    </section>

    <!-- Logo and Branding -->
    <section class="flex-1 flex items-center gap-3 ml-4">
      <Icon
        
        width="32"
        height="32"
        style="color: #1A5319;"
        aria-hidden="true"
      />
      <span class="text-xl font-bold" style="color: #1A5319;">Dashboard </span>
    </section>

    <!-- User Section -->
    <section class="flex items-center gap-6 mr-4">
      <h1 class="text-base font-semibold" style="color: #000000;">
        Welcome, {{ currentUser?.name || 'User' }}!
      </h1>

      <div class="dropdown dropdown-end">
        <button
          tabindex="0"
          role="button"
          class="btn btn-ghost btn-circle avatar focus-ring"
          style="background-color: transparent;"
          @mouseenter="$event.target.style.backgroundColor = '#508D4E'; $event.target.style.color = '#FFFFFF'"
          @mouseleave="$event.target.style.backgroundColor = 'transparent'; $event.target.style.color = 'inherit'"
          aria-label="User menu"
          aria-haspopup="menu"
          aria-expanded="false"
        >
          <div class="w-10 rounded-full">
            <img src="/user.jpg" alt="User avatar" />
          </div>
        </button>
        <ul
          tabindex="0"
          class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-56 space-y-1 font-semibold text-sm"
          style="background-color: #FFFFFF; border: 2px solid #80AF81; color: #000000;"
          role="menu"
          aria-label="User menu options"
        >
          <li role="none">
            <a role="menuitem" href="#" class="focus-ring" style="color: #000000;">Profile</a>
          </li>
          <li role="none">
            <a role="menuitem" href="#" class="focus-ring" style="color: #000000;">Settings</a>
          </li>
          <li role="none">
            <a role="menuitem" @click="handleLogout" class="focus-ring cursor-pointer" style="color: #EF4444;">Logout</a>
          </li>
        </ul>
      </div>
    </section>
  </header>
</template>






<script setup>
import { Icon } from '@iconify/vue';
import { useRouter } from 'vue-router';
import { currentUser, logout } from '../stores/auth.js';

const router = useRouter();

defineEmits(['toggle-drawer']);

const handleLogout = () => {
  logout();
  router.push('/login');
};
</script>