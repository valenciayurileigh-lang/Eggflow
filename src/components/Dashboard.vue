<template class="user-select-none">
  <main class="flex-1 p-6 bg-gray-50 dark:bg-gray-900 overflow-auto">
    <!-- Page Header -->
    <header class="mb-8">
      <h1 id="dashboard-title"  class="text-3xl font-bold  user-select-none"\
       style="color: #EA4405;">Overview</h1>
      <p class="mt-2" style="color: #000000;">Welcome to Eggflow System</p>
    </header>

    <!-- Stats Grid -->
    <section class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8" aria-labelledby="stats-heading">
      <h2 id="stats-heading" class="sr-only">Key Statistics</h2>

      <article class="rounded-lg shadow-sm p-6 card-hover" style="background-color: #FFFFFF; border: 2px solid #DBE4C9;">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium" style="color: #000000;">Total Orders</p>
            <p class="text-2xl font-bold mt-2" style="color: #EA4405;" aria-label="Total orders count">1,234</p>
          </div>
          <div class="p-3 rounded-lg" style="background-color: #DBE4C9;">
            <Icon icon="heroicons-outline:shopping-cart" class="w-6 h-6" style="color: #8AA624;" aria-hidden="true" />
          </div>
        </div>
      </article>

      <article class="rounded-lg shadow-sm p-6 card-hover" style="background-color: #FFFFFF; border: 2px solid #DBE4C9;">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium" style="color: #000000;">Revenue</p>
            <p class="text-2xl font-bold mt-2" style="color: #EA4405;" aria-label="Total revenue amount">$45,320</p>
          </div>
          <div class="p-3 rounded-lg" style="background-color: #DBE4C9;">
            <Icon icon="heroicons-outline:currency-dollar" class="w-6 h-6" style="color: #8AA624;" aria-hidden="true" />
          </div>
        </div>
      </article>

      <article class="rounded-lg shadow-sm p-6 card-hover" style="background-color: #FFFFFF; border: 2px solid #DBE4C9;">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium" style="color: #000000;">Customers</p>
            <p class="text-2xl font-bold mt-2" style="color: #EA4405;" aria-label="Total customers count">523</p>
          </div>
          <div class="p-3 rounded-lg" style="background-color: #DBE4C9;">
            <Icon icon="heroicons-outline:user-group" class="w-6 h-6" style="color: #8AA624;" aria-hidden="true" />
          </div>
        </div>
      </article>

      <article class="rounded-lg shadow-sm p-6 card-hover" style="background-color: #FFFFFF; border: 2px solid #DBE4C9;">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium" style="color: #000000;">Pending</p>
            <p class="text-2xl font-bold mt-2" style="color: #EA4405;" aria-label="Pending items count">42</p>
          </div>
          <div class="p-3 rounded-lg" style="background-color: #DBE4C9;">
            <Icon icon="heroicons-outline:clock" class="w-6 h-6" style="color: #8AA624;" aria-hidden="true" />
          </div>
        </div>
      </article>
    </section>

    <!-- Charts Section -->
    <section class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8" aria-labelledby="charts-heading">
      <h2 id="charts-heading" class="sr-only">Analytics Charts</h2>

      <!-- Sales Chart -->
      <article class="rounded-lg shadow-sm p-6" style="background-color: #FFFFFF; border: 2px solid #DBE4C9;">
        <h3 class="text-lg font-semibold mb-4" style="color: #EA4405;">Sales This Month</h3>
        <div class="h-64 flex items-center justify-center rounded" style="background-color: #F8F8F0;" role="img" aria-label="Sales chart placeholder">
          <p style="color: #000000;">Chart placeholder</p>
        </div>
      </article>

      <!-- Activity Chart -->
      <article class="rounded-lg shadow-sm p-6" style="background-color: #FFFFFF; border: 2px solid #DBE4C9;">
        <h3 class="text-lg font-semibold mb-4" style="color: #EA4405;">Activity Overview</h3>
        <div class="h-64 flex items-center justify-center rounded" style="background-color: #F8F8F0;" role="img" aria-label="Activity chart placeholder">
          <p style="color: #000000;">Chart placeholder</p>
        </div>
      </article>
    </section>

    <!-- Recent Activity -->
    <section class="rounded-lg shadow-sm p-6" style="background-color: #FFFFFF; border: 2px solid #DBE4C9;" aria-labelledby="orders-heading">
      <h2 id="orders-heading" class="text-lg font-semibold mb-4" style="color: #EA4405;">Recent Orders</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm" role="table" aria-label="Recent orders table">
          <thead style="border-bottom: 2px solid #DBE4C9;">
            <tr>
              <th scope="col" class="text-left py-3 px-4 font-semibold" style="color: #000000;">Order ID</th>
              <th scope="col" class="text-left py-3 px-4 font-semibold" style="color: #000000;">Customer</th>
              <th scope="col" class="text-left py-3 px-4 font-semibold" style="color: #000000;">Amount</th>
              <th scope="col" class="text-left py-3 px-4 font-semibold" style="color: #000000;">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="order in orders"
              :key="order.id"
              class="transition-colors"
              style="border-bottom: 1px solid #DBE4C9;"
              @mouseenter="$event.currentTarget.style.backgroundColor = '#F8F8F0'"
              @mouseleave="$event.currentTarget.style.backgroundColor = 'transparent'"
            >
              <td class="py-3 px-4 font-medium" style="color: #EA4405;">#{{ order.id }}</td>
              <td class="py-3 px-4" style="color: #000000;">{{ order.customer }}</td>
              <td class="py-3 px-4" style="color: #000000;">${{ order.amount }}</td>
              <td class="py-3 px-4">
                <span
                  :class="getStatusClass(order.status)"
                  class="px-2 py-1 rounded-full text-xs font-medium"
                  :aria-label="`Order status: ${order.status}`"
                >
                  {{ order.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>

<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const orders = ref([
  { id: '1001', customer: 'John Doe', amount: '125.50', status: 'Completed' },
  { id: '1002', customer: 'Jane Smith', amount: '89.99', status: 'Pending' },
  { id: '1003', customer: 'Bob Johnson', amount: '234.75', status: 'Completed' },
  { id: '1004', customer: 'Alice Brown', amount: '56.30', status: 'Processing' },
  { id: '1005', customer: 'Charlie Wilson', amount: '178.90', status: 'Completed' },
]);

const statusClassMap = {
  'Completed': 'bg-green-100 text-green-800',
  'Pending': 'bg-yellow-100 text-yellow-800',
  'Processing': 'bg-blue-100 text-blue-800',
};

const getStatusClass = (status) => {
  return statusClassMap[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
};
</script>
