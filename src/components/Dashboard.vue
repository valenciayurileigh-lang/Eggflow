<template class="user-select-none">
  <main class="flex-1 p-6 bg-gray-50 dark:bg-gray-900 overflow-auto">
    <!-- Page Header -->
    <div class="mb-8 pointer-events-none user-select-none">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white select-none user-select-none">Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400 mt-2 user-select-none">Welcome to Eggflow System</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 dark:text-gray-400 text-sm font-medium">Total Orders</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">1,234</p>
          </div>
          <div class="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
            <Icon icon="heroicons-outline:shopping-cart" class="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 dark:text-gray-400 text-sm font-medium">Revenue</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">$45,320</p>
          </div>
          <div class="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
            <Icon icon="heroicons-outline:currency-dollar" class="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 dark:text-gray-400 text-sm font-medium">Customers</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">523</p>
          </div>
          <div class="bg-purple-100 dark:bg-purple-900/30 p-3 rounded-lg">
            <Icon icon="heroicons-outline:user-group" class="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-gray-600 dark:text-gray-400 text-sm font-medium">Pending</p>
            <p class="text-2xl font-bold text-gray-900 dark:text-white mt-2">42</p>
          </div>
          <div class="bg-orange-100 dark:bg-orange-900/30 p-3 rounded-lg">
            <Icon icon="heroicons-outline:clock" class="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Section -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Sales Chart -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Sales This Month</h2>
        <div class="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded">
          <p class="text-gray-600 dark:text-gray-400">Chart placeholder</p>
        </div>
      </div>

      <!-- Activity Chart -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Activity Overview</h2>
        <div class="h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded">
          <p class="text-gray-600 dark:text-gray-400">Chart placeholder</p>
        </div>
      </div>
    </div>

    <!-- Recent Activity -->
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
      <h2 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Orders</h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead class="border-b border-gray-200 dark:border-gray-700">
            <tr>
              <th class="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Order ID</th>
              <th class="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Customer</th>
              <th class="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Amount</th>
              <th class="text-left py-3 px-4 font-semibold text-gray-700 dark:text-gray-300">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.id" class="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700/50">
              <td class="py-3 px-4 text-gray-900 dark:text-white">#{{ order.id }}</td>
              <td class="py-3 px-4 text-gray-700 dark:text-gray-300">{{ order.customer }}</td>
              <td class="py-3 px-4 text-gray-700 dark:text-gray-300">${{ order.amount }}</td>
              <td class="py-3 px-4">
                <span :class="getStatusClass(order.status)" class="px-2 py-1 rounded-full text-xs font-medium">
                  {{ order.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
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
  'Completed': 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
  'Pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  'Processing': 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
};

const getStatusClass = (status) => {
  return statusClassMap[status] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
};
</script>
