<template>
  <div class="drawer lg:drawer-open font-display h-screen">
    <input type="checkbox" id="my-drawer" class="drawer-toggle" />

    <!-- Main content area -->
    <main class="drawer-content flex flex-col h-screen bg-base-100">
      <!-- Navbar -->
      <header class="navbar sticky top-0 shadow-sm z-10" style="background-color: #FFFFFF; border-bottom: 2px solid #D9E9CF;">
        <section class="flex items-center">
          <label 
            for="my-drawer" 
            class="btn btn-ghost btn-circle lg:hidden ml-2 transition-all duration-200"
            aria-label="Toggle sidebar"
            style="color: #FEA405;"
            @mouseenter="$event.target.style.backgroundColor = '#D9E9CF'"
            @mouseleave="$event.target.style.backgroundColor = 'transparent'"
          >
            <Icon icon="line-md:menu" width="24" height="24" />
          </label>
        </section>

        <section class="flex-1 flex items-center gap-3 ml-4">
          <Icon icon="mdi:egg" width="32" height="32" style="color: #FEA405;" class="animate-bounce-slow" />
          <span class="text-xl font-bold" style="color: #FEA405;">Manager Dashboard</span>
        </section>

        <section class="flex items-center gap-6 mr-4">
          <h1 class="text-base font-semibold hidden md:block" style="color: #000000;">
            Welcome, {{ currentUser?.name || 'Manager' }}!
          </h1>
          <div class="dropdown dropdown-end">
            <button
              tabindex="0"
              role="button"
              class="btn btn-ghost btn-circle avatar transition-all duration-200"
              @mouseenter="$event.target.style.backgroundColor = '#D9E9CF'"
              @mouseleave="$event.target.style.backgroundColor = 'transparent'"
            >
              <div class="w-10 rounded-full" style="background-color: #D9E9CF;">
                <Icon icon="line-md:account" class="text-2xl mt-2" style="color: #FEA405;" />
              </div>
            </button>
            <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content rounded-box w-56 space-y-1 font-semibold text-sm animate-fade-in" style="background-color: #FFFFFF; border: 2px solid #D9E9CF;">
              <li class="menu-title"><span style="color: #FEA405;">{{ currentUser?.name }}</span></li>
              <li><a class="transition-colors duration-200" style="color: #000000;" @mouseenter="$event.target.style.backgroundColor = '#F5F5F0'" @mouseleave="$event.target.style.backgroundColor = 'transparent'">Profile</a></li>
              <li><a class="transition-colors duration-200" style="color: #000000;" @mouseenter="$event.target.style.backgroundColor = '#F5F5F0'" @mouseleave="$event.target.style.backgroundColor = 'transparent'">Settings</a></li>
              <li><a @click="handleLogout" class="cursor-pointer transition-colors duration-200" style="color: #FEA405;" @mouseenter="$event.target.style.backgroundColor = '#F5F5F0'" @mouseleave="$event.target.style.backgroundColor = 'transparent'">Logout</a></li>
            </ul>
          </div>
        </section>
      </header>

      <!-- Dashboard Content -->
      <div class="flex-1 overflow-auto p-6" style="background-color: #FFFFF0;">
        <div class="max-w-7xl mx-auto">
          <!-- Welcome Section -->
          <header class="mb-8 animate-slide-in">
            <h1 class="text-3xl font-bold" style="color: #FEA405;">Overview</h1>
            <p class="mt-2" style="color: #000000;">Welcome to Eggflow Manager System</p>
          </header>

          <!-- Stats Cards -->
          <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <article 
              v-for="(stat, index) in stats" 
              :key="index"
              class="rounded-lg shadow-sm p-6 card-hover cursor-pointer"
              style="background-color: #FFFFFF; border: 2px solid #D9E9CF;"
              :style="{ animationDelay: `${index * 100}ms` }"
            >
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium" style="color: #000000;">{{ stat.label }}</p>
                  <p class="text-2xl font-bold mt-2" style="color: #FEA405;">{{ stat.value }}</p>
                </div>
                <div class="p-3 rounded-lg" style="background-color: #D9E9CF;">
                  <Icon :icon="stat.icon" class="w-6 h-6" style="color: #FEA405;" />
                </div>
              </div>
            </article>
          </section>

          <!-- Charts Section -->
          <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <article class="rounded-lg shadow-sm p-6 card-hover" style="background-color: #FFFFFF; border: 2px solid #D9E9CF;">
              <h3 class="text-lg font-semibold mb-4" style="color: #FEA405;">Sales This Month</h3>
              <div class="h-64 flex items-center justify-center rounded" style="background-color: #FFFFF0;">
                <div class="text-center">
                  <Icon icon="line-md:loading-twotone-loop" class="text-4xl mb-2" style="color: #FEA405;" />
                  <p style="color: #000000;">Chart placeholder</p>
                </div>
              </div>
            </article>

            <article class="rounded-lg shadow-sm p-6 card-hover" style="background-color: #FFFFFF; border: 2px solid #D9E9CF;">
              <h3 class="text-lg font-semibold mb-4" style="color: #FEA405;">Activity Overview</h3>
              <div class="h-64 flex items-center justify-center rounded" style="background-color: #FFFFF0;">
                <div class="text-center">
                  <Icon icon="line-md:loading-twotone-loop" class="text-4xl mb-2" style="color: #FEA405;" />
                  <p style="color: #000000;">Chart placeholder</p>
                </div>
              </div>
            </article>
          </section>

          <!-- Quick Actions -->
          <section class="rounded-lg shadow-sm p-6 mb-8 card-hover" style="background-color: #FFFFFF; border: 2px solid #D9E9CF;">
            <h2 class="text-lg font-semibold mb-4" style="color: #FEA405;">Quick Actions</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button 
                v-for="(action, index) in quickActions" 
                :key="index"
                class="btn transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                :style="action.primary ? 'background-color: #FEA405; color: white; border: none;' : 'background-color: #D9E9CF; color: #000000; border: none;'"
              >
                <Icon :icon="action.icon" class="text-xl" /> {{ action.label }}
              </button>
            </div>
          </section>

          <!-- Recent Activity -->
          <section class="rounded-lg shadow-sm p-6" style="background-color: #FFFFFF; border: 2px solid #D9E9CF;">
            <h2 class="text-lg font-semibold mb-4" style="color: #FEA405;">Recent Orders</h2>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead style="border-bottom: 2px solid #D9E9CF;">
                  <tr>
                    <th class="text-left py-3 px-4 font-semibold" style="color: #000000;">Order ID</th>
                    <th class="text-left py-3 px-4 font-semibold" style="color: #000000;">Customer</th>
                    <th class="text-left py-3 px-4 font-semibold" style="color: #000000;">Amount</th>
                    <th class="text-left py-3 px-4 font-semibold" style="color: #000000;">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="order in orders"
                    :key="order.id"
                    class="transition-colors duration-200 cursor-pointer"
                    style="border-bottom: 1px solid #D9E9CF;"
                    @mouseenter="$event.currentTarget.style.backgroundColor = '#FFFFF0'"
                    @mouseleave="$event.currentTarget.style.backgroundColor = 'transparent'"
                  >
                    <td class="py-3 px-4 font-medium" style="color: #FEA405;">#{{ order.id }}</td>
                    <td class="py-3 px-4" style="color: #000000;">{{ order.customer }}</td>
                    <td class="py-3 px-4" style="color: #000000;">{{ order.amount }}</td>
                    <td class="py-3 px-4">
                      <span :class="getStatusClass(order.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                        {{ order.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>

    <!-- Sidebar -->
    <div class="drawer-side z-40">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>
      <aside class="w-64 min-h-full flex flex-col" style="background-color: #FFFFFF; border-right: 2px solid #D9E9CF;">
        <!-- Logo -->
        <header class="mb-6 px-4 py-4 flex items-center gap-2" style="border-bottom: 2px solid #D9E9CF;">
          <Icon icon="mdi:egg" width="28" height="28" style="color: #FEA405;" />
          <h1 class="text-lg font-bold" style="color: #FEA405;">EGG FLOW SYSTEM</h1>
        </header>

        <!-- Navigation -->
        <nav class="menu p-4 flex-1">
          <ul class="space-y-1">
            <li v-for="(link, index) in navLinks" :key="index" class="relative">
              <button
                class="flex items-center w-full px-3 py-2.5 rounded-lg text-left transition-all duration-200 text-sm"
                :style="link.active ? 'background-color: #D9E9CF; color: #FEA405; font-weight: 600;' : 'color: #000000;'"
                @mouseenter="!link.active ? $event.target.style.backgroundColor = '#F5F5F0' : null"
                @mouseleave="!link.active ? $event.target.style.backgroundColor = 'transparent' : null"
                @click="setActive(index)"
              >
                <Icon :icon="link.icon" class="w-5 h-5 flex-shrink-0" />
                <span class="ml-3 flex-1">{{ link.name }}</span>
                <Icon
                  v-if="link.children"
                  :icon="link.open ? 'line-md:chevron-down' : 'line-md:chevron-right'"
                  class="w-5 h-5 transition-transform duration-200"
                />
              </button>

              <!-- Submenu with animation -->
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 -translate-y-1"
                enter-to-class="opacity-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 translate-y-0"
                leave-to-class="opacity-0 -translate-y-1"
              >
                <ul v-if="link.children && link.open" class="mt-1 ml-7 space-y-1 pl-3" style="border-left: 2px solid #D9E9CF;">
                  <li v-for="(child, childIndex) in link.children" :key="childIndex">
                    <a
                      href="#"
                      class="block px-2 py-2 rounded-md text-xs transition-colors duration-200"
                      style="color: #000000;"
                      @mouseenter="$event.target.style.backgroundColor = '#F5F5F0'"
                      @mouseleave="$event.target.style.backgroundColor = 'transparent'"
                    >
                      {{ child.name }}
                    </a>
                  </li>
                </ul>
              </transition>
            </li>
          </ul>
        </nav>

        <!-- Logout -->
        <div class="p-4 border-t" style="border-color: #D9E9CF;">
          <button 
            @click="handleLogout" 
            class="btn btn-block transition-all duration-300 transform hover:scale-105"
            style="background-color: #FEA405; color: white; border: none;"
          >
            <Icon icon="line-md:logout" class="text-xl" /> Logout
          </button>
        </div>
      </aside>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Icon } from '@iconify/vue';
import { currentUser, logout } from '../../stores/auth.js';

const router = useRouter();

// Stats data
const stats = ref([
  { label: 'Total Staff', value: '24', icon: 'heroicons-outline:user-group' },
  { label: 'Total Customers', value: '156', icon: 'heroicons-outline:users' },
  { label: "Today's Orders", value: '89', icon: 'heroicons-outline:shopping-cart' },
  { label: 'Revenue', value: '₱45,320', icon: 'heroicons-outline:currency-dollar' }
]);

// Quick actions
const quickActions = ref([
  { label: 'Add Staff', icon: 'line-md:account-add', primary: true },
  { label: 'View Reports', icon: 'line-md:document-report', primary: false },
  { label: 'Settings', icon: 'line-md:cog-filled', primary: true },
  { label: 'Notifications', icon: 'line-md:bell', primary: false }
]);

// Orders data
const orders = ref([
  { id: '1001', customer: 'John Doe', amount: '₱125.50', status: 'Completed' },
  { id: '1002', customer: 'Jane Smith', amount: '₱89.99', status: 'Pending' },
  { id: '1003', customer: 'Bob Johnson', amount: '₱234.75', status: 'Completed' },
  { id: '1004', customer: 'Alice Brown', amount: '₱56.30', status: 'Processing' },
  { id: '1005', customer: 'Charlie Wilson', amount: '₱178.90', status: 'Completed' }
]);

// Navigation links
const navLinks = ref([
  { name: 'Dashboard', icon: 'line-md:home', active: true, open: false },
  { name: 'Staff Management', icon: 'heroicons-outline:user-group', active: false, open: false },
  { name: 'Customers', icon: 'heroicons-outline:users', active: false, open: false },
  { 
    name: 'Products', 
    icon: 'heroicons-outline:cube', 
    active: false, 
    open: false,
    children: [
      { name: 'All Products' },
      { name: 'Add New Inventory' },
      { name: 'Inventory' }
    ]
  },
  { 
    name: 'Reports', 
    icon: 'heroicons-outline:chart-bar', 
    active: false, 
    open: false,
    children: [
      { name: 'Sales Report' },
      { name: 'Customer Report' }
    ]
  },
  { name: 'Settings', icon: 'line-md:cog-filled', active: false, open: false }
]);

const setActive = (index) => {
  const link = navLinks.value[index];
  if (link.children) {
    link.open = !link.open;
  }
  navLinks.value.forEach((item, i) => {
    item.active = i === index;
  });
};

const getStatusClass = (status) => {
  const classes = {
    'Completed': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Processing': 'bg-blue-100 text-blue-800'
  };
  return classes[status] || 'bg-gray-100 text-gray-800';
};

const handleLogout = () => {
  logout();
  router.push('/login');
};
</script>

<style scoped>
.card-hover {
  transition: all 0.3s ease;
}
.card-hover:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.animate-slide-in {
  animation: slideIn 0.5s ease-out;
}

.animate-fade-in {
  animation: fadeIn 0.2s ease-out;
}

.animate-bounce-slow {
  animation: bounceSlow 2s infinite;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes bounceSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
</style>
