<template>
  <aside class="drawer-side" style="background-color: #FFFFFF; border-right: 2px solid #80AF81;">
    <label for="my-drawer" aria-label="Close sidebar" class="drawer-overlay"></label>

    <nav class="menu p-4 w-64 min-h-full" style="background-color: #FFFFFF; color: #000000;" aria-label="Main navigation">
      <!-- Header -->
      <header class="mb-6 px-3 py-3 flex items-center" style="border-bottom: 2px solid #80AF81;">
        <h1 class="text-base font-bold" style="color: #1A5319;">EGG FLOW SYSTEM</h1>
      </header>

      <ul class="space-y-1" role="list">
        <li v-for="(link, index) in links" :key="index" class="relative">
          <button
            class="flex items-center w-full px-3 py-2.5 rounded-lg text-left transition-all duration-200 text-sm"
            :style="link.active ? 'background-color: #508D4E; color: #FFFFFF; font-weight: 600;' : 'color: #000000;'"
            @mouseenter="!link.active ? $event.target.style.backgroundColor = '#D6EFD8' : null"
            @mouseleave="!link.active ? $event.target.style.backgroundColor = 'transparent' : null"
            :aria-expanded="link.children ? link.open : undefined"
            :aria-haspopup="link.children ? 'true' : undefined"
            @click="setActive(index)"
          >
            <Icon :icon="link.icon" class="w-5 h-5 flex-shrink-0" />
            <span class="ml-3 flex-1">{{ link.name }}</span>

            <Icon
              v-if="link.children"
              :icon="link.open ? 'line-md:chevron-down' : 'line-md:chevron-right'"
              class="w-5 h-5 transition-transform duration-200"
              aria-hidden="true"
            />
          </button>

          <!-- Submenu -->
          <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="opacity-0 -translate-y-1"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-1"
          >
            <ul
              v-if="link.children && link.open"
              class="mt-1 ml-7 space-y-1 pl-3"
              style="border-left: 2px solid #80AF81;"
              role="group"
            >
              <li v-for="(child, childIndex) in link.children" :key="childIndex">
                <a
                  href="#"
                  class="block px-2 py-2 rounded-md text-xs transition-colors duration-200"
                  style="color: #000000;"
                  @mouseenter="$event.target.style.backgroundColor = '#D6EFD8'"
                  @mouseleave="$event.target.style.backgroundColor = 'transparent'"
                  @click.prevent="setActiveChild(index, childIndex)"
                >
                  {{ child.name }}
                </a>
              </li>
            </ul>
          </transition>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const emit = defineEmits(['navigate']);

const links = ref([
    {
        name: 'Dashboard',
        icon: 'line-md:home',
        active: true,
        open: false,
        view: 'dashboard'
    },
    {
        name: 'Reservations',
        icon: 'heroicons-outline:calendar-days',
        active: false,
        open: false,
        view: 'reservations'
    },
    {
        name: 'Products',
        icon: 'heroicons-outline:cube',
        active: false,
        open: false,
        view: 'products',
        children: [
            { name: 'All Products', icon: 'heroicons-outline:squares-2x2', active: false, view: 'products-all' },
            { name: 'Add New Inventory', icon: 'heroicons-outline:plus-circle', active: false, view: 'products-add' },
            { name: 'Inventory', icon: 'heroicons-outline:clipboard-document-list', active: false, view: 'products-inventory' }
        ]
    },
    {
        name: 'Customers',
        icon: 'heroicons-outline:user-group',
        active: false,
        open: false,
        view: 'customers'
    },
    {
        name: 'Delivery',
        icon: 'heroicons-outline:truck',
        active: false,
        open: false,
        view: 'delivery'
    },
    {
        name: 'Reports',
        icon: 'heroicons-outline:chart-bar',
        active: false,
        open: false,
        view: 'reports',
        children: [
            { name: 'Sales Report', icon: 'line-md:chart-line', active: false, view: 'reports-sales' },
            { name: 'Customer Report', icon: 'line-md:account-chart', active: false, view: 'reports-customers' }
        ]
    },
    {
        name: 'Settings',
        icon: 'line-md:cog-filled',
        active: false,
        open: false,
        view: 'settings'
    },
    {
        name: 'Users',
        icon: 'line-md:person',
        active: false,
        open: false,
        view: 'users',
        children: [
            { name: 'All Users', icon: 'line-md:account-plus', active: false, view: 'users-all' },
            { name: 'Add New', icon: 'line-md:account-multiple', active: false, view: 'users-add' },
            { name: 'Roles and Permissions', icon: 'line-md:account-permissions', active: false, view: 'users-permissions' }
        ]
    },
    {
        name: 'Chats',
        icon: 'line-md:email',
        active: false,
        open: false,
        view: 'chats'
    }
]);

const setActive = (index) => {
  const link = links.value[index];

  // Toggle submenu for items with children
  if (link.children) {
    link.open = !link.open;
  } else {
    // Emit navigation if no children
    emit('navigate', link.view);
  }

  // Set active state
  links.value.forEach((item, i) => {
    item.active = i === index;
  });
};

const setActiveChild = (parentIndex, childIndex) => {
  const child = links.value[parentIndex].children[childIndex];
  emit('navigate', child.view);
};
</script>
