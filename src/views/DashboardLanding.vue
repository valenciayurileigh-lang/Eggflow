<template>
  <!-- Main application layout with responsive drawer -->
  <div class="drawer lg:drawer-open font-display h-screen">
    <input
      type="checkbox"
      id="my-drawer"
      class="drawer-toggle"
      aria-label="Toggle navigation drawer"
    />

    <!-- Main content area -->
    <main class="drawer-content flex flex-col h-screen" role="main">
      <Navbar @toggle-drawer="toggleDrawer" :style="{ caretColor: 'transparent' }" />
      <Dashboard v-if="activeView === 'dashboard'" :style="{ caretColor: 'transparent' }" />
      <!-- Additional views can be conditionally rendered here based on activeView -->
    </main>

    <!-- Navigation sidebar -->
    <Sidebar @navigate="handleNavigation" :style="{ caretColor: 'transparent' }" />
    
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from '../components/navbar.vue';
import Sidebar from '../components/sidebar.vue';
import Dashboard from '../components/Dashboard.vue';

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
