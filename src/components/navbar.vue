<template>
  <header class="navbar bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-white-700 sticky top-0 shadow-sm">


    <!-- Logo and Branding -->
    <section class="flex-1 flex items-center gap-3 ml-4">
      <Icon
        icon="mdi:egg"
        width="32"
        height="32"
        class="text-[#F5C857]"
        aria-hidden="true"
      />
      <span class="text-xl font-bold text-gray-900 dark:text-white">Eggflow</span>
    </section>

    <!-- User Section -->
    <section class="flex items-center gap-6">
      <h1 class="text-base font-semibold text-gray-700 dark:text-gray-200">
        Welcome, User!
      </h1>

      <div class="dropdown dropdown-end">
        <button
          tabindex="0"
          role="button"
          class="btn btn-ghost btn-circle avatar hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="User menu"
        >
          <div class="w-10 rounded-full">
            <img src="/user.jpg" alt="User avatar" />
          </div>
        </button>
        <ul
          tabindex="0"
          class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-56 space-y-1 dark:bg-gray-800 font-semibold text-sm"
          role="menu"
        >
          <li role="none"><a role="menuitem">Profile</a></li>
          <li role="none"><a role="menuitem">Settings</a></li>
          <li role="none"><a role="menuitem">Logout</a></li>
        </ul>
      </div>
    </section>
  </header>
</template>






<script setup>
import { Icon } from '@iconify/vue';

defineEmits(['toggle-drawer']);
</script>