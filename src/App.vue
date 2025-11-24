<template>
  <div class="drawer lg:drawer-open font-display">
    <input type="checkbox" id="my-drawer" class="drawer-toggle">
    <!-- Page Content -->
    <div class="drawer-content flex flex-col h-screen">
      <Navbar @toggle-drawer="toggleDrawer" />
      <Dashboard />
    </div>
    <!-- Sidebar -->
    <Sidebar @navigate="handleNavigation" />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from './components/navbar.vue';
import Sidebar from './components/sidebar.vue';
import Dashboard from './components/Dashboard.vue';

const activeView = ref('dashboard');

const toggleDrawer = () => {
  const drawer = document.getElementById('my-drawer');
  if (drawer) {
    drawer.checked = !drawer.checked;
  }
};

const handleNavigation = (view) => {
  activeView.value = view;
};
</script>

