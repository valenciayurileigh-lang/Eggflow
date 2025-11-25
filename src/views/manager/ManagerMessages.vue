<template>
  <div class="h-full flex" style="background-color: #D6EFD8;">
    <!-- Customer List Sidebar -->
    <aside class="w-80 flex flex-col" style="background-color: #FFFFFF; border-right: 2px solid #80AF81;">
      <!-- Header -->
      <header class="p-4 flex items-center justify-between" style="border-bottom: 2px solid #80AF81;">
        <div class="flex items-center gap-3">
          <Icon icon="heroicons-outline:chat-bubble-left-right" class="w-6 h-6" style="color: #1A5319;" />
          <h2 class="text-lg font-bold" style="color: #1A5319;">Messages</h2>
        </div>
        <span class="px-2 py-1 text-xs font-bold rounded-full" style="background-color: #DCFCE7; color: #166534;">
          {{ unreadMessages }} unread
        </span>
      </header>

      <!-- Search -->
      <div class="p-3">
        <div class="relative">
          <Icon icon="heroicons-outline:magnifying-glass" class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" style="color: #6B7280;" />
          <input 
            v-model="searchQuery"
            type="text" 
            placeholder="Search customers..."
            class="w-full pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none"
            style="background-color: #F3F4F6; border: 1px solid #E5E7EB;"
          />
        </div>
      </div>

      <!-- Customer List -->
      <div class="flex-1 overflow-y-auto p-2">
        <div 
          v-for="customer in filteredCustomers" 
          :key="customer.id"
          @click="selectCustomer(customer)"
          class="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 mb-2"
          :style="selectedCustomer?.id === customer.id ? 'background-color: #D6EFD8;' : ''"
          @mouseenter="$event.currentTarget.style.backgroundColor = '#D6EFD8'"
          @mouseleave="selectedCustomer?.id !== customer.id ? $event.currentTarget.style.backgroundColor = 'transparent' : null"
        >
          <div class="relative">
            <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: #508D4E;">
              <span class="text-white font-semibold">{{ customer.initials }}</span>
            </div>
            <span 
              v-if="customer.online" 
              class="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-white"
              style="background-color: #22C55E;"
            ></span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold text-sm truncate" style="color: #1A5319;">{{ customer.name }}</h3>
              <span class="text-xs" style="color: #6B7280;">{{ customer.lastMessageTime }}</span>
            </div>
            <p class="text-xs truncate mt-1" style="color: #6B7280;">{{ customer.lastMessage }}</p>
          </div>
          <span 
            v-if="customer.unread > 0" 
            class="px-2 py-0.5 text-xs font-bold rounded-full"
            style="background-color: #EF4444; color: white;"
          >{{ customer.unread }}</span>
        </div>
      </div>
    </aside>

    <!-- Chat Area -->
    <main class="flex-1 flex flex-col" style="background-color: #FFFFFF;">
      <!-- No Chat Selected -->
      <div v-if="!selectedCustomer" class="flex-1 flex items-center justify-center">
        <div class="text-center">
          <div class="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4" style="background-color: #D6EFD8;">
            <Icon icon="heroicons-outline:chat-bubble-left-right" class="w-12 h-12" style="color: #1A5319;" />
          </div>
          <h3 class="text-xl font-semibold" style="color: #1A5319;">Customer Messages</h3>
          <p class="mt-2" style="color: #6B7280;">Select a customer to start chatting</p>
        </div>
      </div>

      <!-- Chat View -->
      <template v-else>
        <!-- Chat Header -->
        <header class="p-4 flex items-center justify-between" style="border-bottom: 2px solid #80AF81;">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full flex items-center justify-center" style="background-color: #508D4E;">
              <span class="text-white font-semibold text-sm">{{ selectedCustomer.initials }}</span>
            </div>
            <div>
              <h3 class="font-semibold" style="color: #1A5319;">{{ selectedCustomer.name }}</h3>
              <p class="text-xs flex items-center gap-1" :style="selectedCustomer.online ? 'color: #22C55E;' : 'color: #6B7280;'">
                <span class="w-2 h-2 rounded-full" :style="selectedCustomer.online ? 'background-color: #22C55E;' : 'background-color: #6B7280;'"></span>
                {{ selectedCustomer.online ? 'Online' : 'Offline' }}
              </p>
            </div>
          </div>
          <div class="flex items-center gap-2">
            <button class="p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100">
              <Icon icon="heroicons-outline:phone" class="w-5 h-5" style="color: #1A5319;" />
            </button>
            <button class="p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100">
              <Icon icon="heroicons-outline:video-camera" class="w-5 h-5" style="color: #1A5319;" />
            </button>
            <button class="p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100">
              <Icon icon="heroicons-outline:information-circle" class="w-5 h-5" style="color: #1A5319;" />
            </button>
          </div>
        </header>

        <!-- Messages -->
        <div ref="chatContainer" class="flex-1 overflow-y-auto p-6 space-y-4" style="background-color: #F9FAFB;">
          <!-- Date Divider -->
          <div class="flex items-center gap-4 my-4">
            <div class="flex-1 h-px" style="background-color: #E5E7EB;"></div>
            <span class="text-xs font-medium px-3 py-1 rounded-full" style="background-color: #E5E7EB; color: #6B7280;">Today</span>
            <div class="flex-1 h-px" style="background-color: #E5E7EB;"></div>
          </div>

          <div 
            v-for="message in messages" 
            :key="message.id"
            :class="message.sender === 'manager' ? 'flex justify-end' : 'flex justify-start'"
          >
            <div class="flex items-end gap-2" :class="message.sender === 'manager' ? 'flex-row-reverse' : ''">
              <div 
                v-if="message.sender === 'customer'"
                class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" 
                style="background-color: #508D4E;"
              >
                <span class="text-white font-semibold text-xs">{{ selectedCustomer.initials }}</span>
              </div>
              <div 
                class="max-w-md rounded-2xl px-4 py-3 shadow-sm"
                :style="message.sender === 'manager' 
                  ? 'background-color: #508D4E; color: white; border-bottom-right-radius: 4px;' 
                  : 'background-color: #FFFFFF; color: #000000; border: 1px solid #E5E7EB; border-bottom-left-radius: 4px;'"
              >
                <p class="text-sm leading-relaxed">{{ message.text }}</p>
                <div class="flex items-center justify-end gap-1 mt-2">
                  <span class="text-xs" :style="message.sender === 'manager' ? 'color: #D6EFD8;' : 'color: #9CA3AF;'">
                    {{ message.time }}
                  </span>
                  <Icon 
                    v-if="message.sender === 'manager'" 
                    :icon="message.read ? 'heroicons-solid:check-circle' : 'heroicons-outline:check'" 
                    class="w-4 h-4" 
                    :style="message.read ? 'color: #D6EFD8;' : 'color: #9CA3AF;'"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Message Input -->
        <footer class="p-4" style="border-top: 2px solid #80AF81;">
          <div class="flex items-center gap-3">
            <button class="p-2 rounded-full transition-colors duration-200 hover:bg-gray-100">
              <Icon icon="heroicons-outline:paper-clip" class="w-6 h-6" style="color: #6B7280;" />
            </button>
            <button class="p-2 rounded-full transition-colors duration-200 hover:bg-gray-100">
              <Icon icon="heroicons-outline:photo" class="w-6 h-6" style="color: #6B7280;" />
            </button>
            <input 
              v-model="newMessage"
              @keyup.enter="sendMessage"
              type="text" 
              placeholder="Type your message..."
              class="flex-1 px-4 py-3 rounded-full text-sm focus:outline-none focus:ring-2"
              style="background-color: #F3F4F6; border: 1px solid #E5E7EB; --tw-ring-color: #80AF81;"
            />
            <button 
              @click="sendMessage"
              class="p-3 rounded-full transition-all duration-200 hover:scale-110"
              style="background-color: #508D4E;"
            >
              <Icon icon="heroicons-solid:paper-airplane" class="w-5 h-5 text-white" />
            </button>
          </div>
        </footer>
      </template>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, nextTick } from 'vue';
import { Icon } from '@iconify/vue';

const chatContainer = ref(null);
const searchQuery = ref('');
const selectedCustomer = ref(null);
const newMessage = ref('');

const chatCustomers = ref([
  { 
    id: 1, 
    name: 'Maria Santos', 
    initials: 'MS', 
    online: true, 
    lastMessage: 'Hi, I want to inquire about bulk orders',
    lastMessageTime: '2m ago',
    unread: 3
  },
  { 
    id: 2, 
    name: 'Juan Dela Cruz', 
    initials: 'JD', 
    online: true, 
    lastMessage: 'Thank you for the delivery!',
    lastMessageTime: '15m ago',
    unread: 0
  },
  { 
    id: 3, 
    name: 'Ana Reyes', 
    initials: 'AR', 
    online: false, 
    lastMessage: 'When will my order arrive?',
    lastMessageTime: '1h ago',
    unread: 1
  },
  { 
    id: 4, 
    name: 'Pedro Garcia', 
    initials: 'PG', 
    online: false, 
    lastMessage: 'Can I cancel my reservation?',
    lastMessageTime: '3h ago',
    unread: 2
  },
  { 
    id: 5, 
    name: 'Rosa Mendoza', 
    initials: 'RM', 
    online: true, 
    lastMessage: 'I need 50 trays for next week',
    lastMessageTime: '5h ago',
    unread: 0
  }
]);

const messages = ref([
  { id: 1, sender: 'customer', text: 'Good morning! I would like to place a bulk order for eggs.', time: '9:00 AM', read: true },
  { id: 2, sender: 'manager', text: 'Good morning! Of course, how many trays would you need?', time: '9:02 AM', read: true },
  { id: 3, sender: 'customer', text: 'I need around 100 trays for a restaurant supply. Do you have that in stock?', time: '9:05 AM', read: true },
  { id: 4, sender: 'manager', text: 'Yes, we have sufficient stock. Would you like medium or large eggs?', time: '9:07 AM', read: true },
  { id: 5, sender: 'customer', text: 'Large eggs please. What\'s the price per tray for bulk orders?', time: '9:10 AM', read: true },
  { id: 6, sender: 'manager', text: 'For 100 trays, we can offer ₱180 per tray. Total would be ₱18,000. We also offer free delivery for orders above ₱10,000.', time: '9:12 AM', read: true },
  { id: 7, sender: 'customer', text: 'That sounds great! Can I schedule the delivery for next Monday?', time: '9:15 AM', read: false },
  { id: 8, sender: 'customer', text: 'Also, do you accept GCash payment?', time: '9:16 AM', read: false }
]);

const filteredCustomers = computed(() => {
  if (!searchQuery.value) return chatCustomers.value;
  return chatCustomers.value.filter(c => 
    c.name.toLowerCase().includes(searchQuery.value.toLowerCase())
  );
});

const unreadMessages = computed(() => {
  return chatCustomers.value.reduce((total, customer) => total + customer.unread, 0);
});

const selectCustomer = (customer) => {
  selectedCustomer.value = customer;
  customer.unread = 0;
  scrollToBottom();
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;
  
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  
  messages.value.push({
    id: messages.value.length + 1,
    sender: 'manager',
    text: newMessage.value,
    time: timeString,
    read: false
  });
  
  newMessage.value = '';
  await scrollToBottom();
};

const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};
</script>
