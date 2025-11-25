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
          <span class="text-xl font-bold" style="color: #FEA405;">My Account</span>
        </section>

        <section class="flex items-center gap-4 mr-4">
          <!-- Cart Icon -->
          <button 
            class="btn btn-ghost btn-circle transition-all duration-200 relative"
            @mouseenter="$event.target.style.backgroundColor = '#D9E9CF'"
            @mouseleave="$event.target.style.backgroundColor = 'transparent'"
          >
            <div class="indicator">
              <Icon icon="line-md:shopping-cart" class="text-2xl" style="color: #FEA405;" />
              <span class="badge badge-sm indicator-item animate-pulse" style="background-color: #FEA405; color: white;">{{ cartCount }}</span>
            </div>
          </button>

          <h1 class="text-base font-semibold hidden md:block" style="color: #000000;">
            Welcome, {{ currentUser?.name || 'Customer' }}!
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
              <li><a class="transition-colors duration-200" style="color: #000000;" @mouseenter="$event.target.style.backgroundColor = '#F5F5F0'" @mouseleave="$event.target.style.backgroundColor = 'transparent'">My Orders</a></li>
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
            <h1 class="text-3xl font-bold" style="color: #FEA405;">Welcome, {{ currentUser?.name }}!</h1>
            <p class="mt-2" style="color: #000000;">Fresh eggs delivered right to your doorstep.</p>
          </header>

          <!-- Stats Cards -->
          <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

          <!-- Featured Products -->
          <section class="rounded-lg shadow-sm p-6 mb-8" style="background-color: #FFFFFF; border: 2px solid #D9E9CF;">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-lg font-semibold" style="color: #FEA405;">Fresh Products</h2>
              <a href="#" class="text-sm font-semibold transition-all duration-200 hover:underline" style="color: #FEA405;">View All →</a>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <article 
                v-for="(product, index) in products" 
                :key="index"
                class="rounded-lg shadow-sm overflow-hidden product-card cursor-pointer"
                style="background-color: #FFFFFF; border: 1px solid #D9E9CF;"
              >
                <figure class="px-4 pt-4">
                  <div class="w-full h-32 rounded-lg flex items-center justify-center" style="background-color: #FFFFF0;">
                    <Icon :icon="product.icon" class="text-6xl transition-transform duration-300" style="color: #FEA405;" />
                  </div>
                </figure>
                <div class="p-4">
                  <h3 class="font-bold" style="color: #000000;">{{ product.name }}</h3>
                  <p class="text-sm mt-1" style="color: #555555;">{{ product.description }}</p>
                  <div class="flex justify-between items-center mt-4">
                    <span class="text-lg font-bold" style="color: #FEA405;">{{ product.price }}</span>
                    <button 
                      class="btn btn-sm transition-all duration-300 transform hover:scale-105"
                      style="background-color: #D9E9CF; color: #000000; border: none;"
                      @click="addToCart(product)"
                    >
                      <Icon icon="line-md:plus" /> Add
                    </button>
                  </div>
                </div>
              </article>
            </div>
          </section>

          <!-- Recent Orders -->
          <section class="rounded-lg shadow-sm p-6" style="background-color: #FFFFFF; border: 2px solid #D9E9CF;">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-semibold" style="color: #FEA405;">My Recent Orders</h2>
              <a href="#" class="text-sm font-semibold transition-all duration-200 hover:underline" style="color: #FEA405;">View All →</a>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full text-sm">
                <thead style="border-bottom: 2px solid #D9E9CF;">
                  <tr>
                    <th class="text-left py-3 px-4 font-semibold" style="color: #000000;">Order ID</th>
                    <th class="text-left py-3 px-4 font-semibold" style="color: #000000;">Date</th>
                    <th class="text-left py-3 px-4 font-semibold" style="color: #000000;">Items</th>
                    <th class="text-left py-3 px-4 font-semibold" style="color: #000000;">Total</th>
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
                    <td class="py-3 px-4" style="color: #000000;">{{ order.date }}</td>
                    <td class="py-3 px-4" style="color: #000000;">{{ order.items }}</td>
                    <td class="py-3 px-4 font-semibold" style="color: #FEA405;">{{ order.total }}</td>
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
          <h1 class="text-lg font-bold" style="color: #FEA405;">EGG FLOW SHOP</h1>
        </header>

        <!-- Navigation -->
        <nav class="menu p-4 flex-1">
          <ul class="space-y-1">
            <li v-for="(link, index) in navLinks" :key="index">
              <button
                class="flex items-center w-full px-3 py-2.5 rounded-lg text-left transition-all duration-200 text-sm"
                :style="link.active ? 'background-color: #D9E9CF; color: #FEA405; font-weight: 600;' : 'color: #000000;'"
                @mouseenter="!link.active ? $event.target.style.backgroundColor = '#F5F5F0' : null"
                @mouseleave="!link.active ? $event.target.style.backgroundColor = 'transparent' : null"
                @click="setActive(index)"
              >
                <Icon :icon="link.icon" class="w-5 h-5 flex-shrink-0" />
                <span class="ml-3 flex-1">{{ link.name }}</span>
                <span v-if="link.badge" class="badge badge-sm" style="background-color: #FEA405; color: white;">{{ link.badge }}</span>
              </button>
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

// Cart count
const cartCount = ref(3);

// Stats data
const stats = ref([
  { label: 'Active Orders', value: '2', icon: 'heroicons-outline:shopping-bag' },
  { label: 'Total Orders', value: '15', icon: 'heroicons-outline:clock' },
  { label: 'Loyalty Points', value: '250', icon: 'heroicons-outline:star' }
]);

// Products data
const products = ref([
  { name: 'Fresh Eggs (1 Tray)', description: '30 pieces per tray', price: '₱180', icon: 'mdi:egg' },
  { name: 'Organic Eggs (1 Tray)', description: 'Free-range, premium', price: '₱250', icon: 'mdi:egg-outline' },
  { name: 'Salted Eggs (1 Pack)', description: '6 pieces per pack', price: '₱120', icon: 'mdi:egg-easter' }
]);

// Orders data
const orders = ref([
  { id: 'ORD-015', date: 'Nov 25, 2025', items: '5 trays', total: '₱900', status: 'Processing' },
  { id: 'ORD-014', date: 'Nov 22, 2025', items: '3 trays', total: '₱540', status: 'Delivered' },
  { id: 'ORD-013', date: 'Nov 18, 2025', items: '10 trays', total: '₱1,800', status: 'Delivered' }
]);

// Navigation links
const navLinks = ref([
  { name: 'Home', icon: 'line-md:home', active: true },
  { name: 'Shop', icon: 'heroicons-outline:shopping-bag', active: false },
  { name: 'My Cart', icon: 'line-md:shopping-cart', active: false, badge: 3 },
  { name: 'My Orders', icon: 'heroicons-outline:clipboard-document-list', active: false },
  { name: 'Profile', icon: 'line-md:account', active: false },
  { name: 'Help & Support', icon: 'heroicons-outline:question-mark-circle', active: false }
]);

const setActive = (index) => {
  navLinks.value.forEach((item, i) => {
    item.active = i === index;
  });
};

const addToCart = (product) => {
  cartCount.value++;
  navLinks.value[2].badge = cartCount.value;
};

const getStatusClass = (status) => {
  const classes = {
    'Delivered': 'bg-green-100 text-green-800',
    'Processing': 'bg-yellow-100 text-yellow-800',
    'Pending': 'bg-blue-100 text-blue-800'
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

.product-card {
  transition: all 0.3s ease;
}
.product-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}
.product-card:hover .iconify {
  transform: scale(1.1) rotate(5deg);
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
