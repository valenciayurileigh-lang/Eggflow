<template>
  <div class="h-full flex flex-col" style="background-color: #FFFFFF;">
    <!-- Chat Header -->
    <header class="p-4 flex items-center justify-between" style="border-bottom: 2px solid #80AF81; background-color: #FFFFFF;">
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 rounded-full flex items-center justify-center" style="background-color: #508D4E;">
          <Icon icon="mdi:egg" class="w-7 h-7 text-white" />
        </div>
        <div>
          <h3 class="font-bold text-lg" style="color: #1A5319;">Eggflow Support</h3>
          <p class="text-xs flex items-center gap-1" style="color: #22C55E;">
            <span class="w-2 h-2 rounded-full" style="background-color: #22C55E;"></span>
            Online - Usually replies within minutes
          </p>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <button class="p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100">
          <Icon icon="heroicons-outline:phone" class="w-5 h-5" style="color: #1A5319;" />
        </button>
        <button class="p-2 rounded-lg transition-colors duration-200 hover:bg-gray-100">
          <Icon icon="heroicons-outline:ellipsis-vertical" class="w-5 h-5" style="color: #1A5319;" />
        </button>
      </div>
    </header>

    <!-- Messages Area -->
    <div ref="chatContainer" class="flex-1 overflow-y-auto p-6 space-y-4" style="background-color: #F9FAFB;">
      <!-- Welcome Message -->
      <div class="text-center mb-6">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full" style="background-color: #D6EFD8;">
          <Icon icon="heroicons-outline:sparkles" class="w-4 h-4" style="color: #1A5319;" />
          <span class="text-xs font-medium" style="color: #1A5319;">Chat with Eggflow Support</span>
        </div>
      </div>

      <!-- Date Divider -->
      <div class="flex items-center gap-4 my-4">
        <div class="flex-1 h-px" style="background-color: #E5E7EB;"></div>
        <span class="text-xs font-medium px-3 py-1 rounded-full" style="background-color: #E5E7EB; color: #6B7280;">Today</span>
        <div class="flex-1 h-px" style="background-color: #E5E7EB;"></div>
      </div>

      <!-- Messages -->
      <div 
        v-for="message in messages" 
        :key="message.id"
        :class="message.sender === 'customer' ? 'flex justify-end' : 'flex justify-start'"
      >
        <div class="flex items-end gap-2" :class="message.sender === 'customer' ? 'flex-row-reverse' : ''">
          <div 
            v-if="message.sender === 'manager'"
            class="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" 
            style="background-color: #508D4E;"
          >
            <Icon icon="mdi:egg" class="w-5 h-5 text-white" />
          </div>
          <div 
            class="max-w-sm rounded-2xl px-4 py-3 shadow-sm"
            :style="message.sender === 'customer' 
              ? 'background-color: #508D4E; color: white; border-bottom-right-radius: 4px;' 
              : 'background-color: #FFFFFF; color: #000000; border: 1px solid #E5E7EB; border-bottom-left-radius: 4px;'"
          >
            <p class="text-sm leading-relaxed">{{ message.text }}</p>
            <div class="flex items-center justify-end gap-1 mt-2">
              <span class="text-xs" :style="message.sender === 'customer' ? 'color: #D6EFD8;' : 'color: #9CA3AF;'">
                {{ message.time }}
              </span>
              <Icon 
                v-if="message.sender === 'customer'" 
                :icon="message.read ? 'heroicons-solid:check-circle' : 'heroicons-outline:check'" 
                class="w-4 h-4" 
                :style="message.read ? 'color: #D6EFD8;' : 'color: #9CA3AF;'"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Typing Indicator -->
      <div v-if="isTyping" class="flex justify-start">
        <div class="flex items-end gap-2">
          <div class="w-8 h-8 rounded-full flex items-center justify-center" style="background-color: #508D4E;">
            <Icon icon="mdi:egg" class="w-5 h-5 text-white" />
          </div>
          <div class="rounded-2xl px-4 py-3 shadow-sm" style="background-color: #FFFFFF; border: 1px solid #E5E7EB;">
            <div class="flex items-center gap-1">
              <span class="w-2 h-2 rounded-full animate-bounce" style="background-color: #6B7280; animation-delay: 0ms;"></span>
              <span class="w-2 h-2 rounded-full animate-bounce" style="background-color: #6B7280; animation-delay: 150ms;"></span>
              <span class="w-2 h-2 rounded-full animate-bounce" style="background-color: #6B7280; animation-delay: 300ms;"></span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="px-4 py-3 flex gap-2 overflow-x-auto" style="border-top: 1px solid #E5E7EB;">
      <button 
        v-for="(action, index) in quickActions" 
        :key="index"
        @click="sendQuickMessage(action.message)"
        class="px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 hover:scale-105"
        style="background-color: #D6EFD8; color: #1A5319; border: 1px solid #80AF81;"
      >
        {{ action.label }}
      </button>
    </div>

    <!-- Message Input -->
    <footer class="p-4" style="border-top: 2px solid #80AF81; background-color: #FFFFFF;">
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
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import { Icon } from '@iconify/vue';

const chatContainer = ref(null);
const newMessage = ref('');
const isTyping = ref(false);

const quickActions = [
  { label: '📦 Track my order', message: 'I want to track my order' },
  { label: '🛒 Place an order', message: 'I want to place a new order' },
  { label: '💰 Payment inquiry', message: 'I have a question about payment' },
  { label: '🚚 Delivery status', message: 'What is my delivery status?' },
  { label: '❓ Other inquiry', message: 'I have a question' }
];

const messages = ref([
  { id: 1, sender: 'manager', text: 'Hello! Welcome to Eggflow Support. How can I help you today? 🥚', time: '9:00 AM', read: true },
  { id: 2, sender: 'customer', text: 'Hi! I want to check on my order status.', time: '9:02 AM', read: true },
  { id: 3, sender: 'manager', text: 'Of course! Could you please provide your order number? It should start with "ORD-"', time: '9:03 AM', read: true },
  { id: 4, sender: 'customer', text: 'It\'s ORD-015', time: '9:05 AM', read: true },
  { id: 5, sender: 'manager', text: 'Thank you! I found your order. Your order for 5 trays is currently being processed and will be delivered tomorrow between 8AM-12PM. 🚚', time: '9:06 AM', read: true },
  { id: 6, sender: 'customer', text: 'Great! Can I also add 2 more trays to that order?', time: '9:08 AM', read: true },
  { id: 7, sender: 'manager', text: 'Yes, I can add that for you! The updated total will be ₱1,260 for 7 trays. Would you like me to proceed?', time: '9:10 AM', read: true }
]);

const sendQuickMessage = async (text) => {
  newMessage.value = text;
  await sendMessage();
};

const sendMessage = async () => {
  if (!newMessage.value.trim()) return;
  
  const now = new Date();
  const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  
  messages.value.push({
    id: messages.value.length + 1,
    sender: 'customer',
    text: newMessage.value,
    time: timeString,
    read: false
  });
  
  newMessage.value = '';
  await scrollToBottom();
  
  // Simulate manager typing and reply
  simulateReply();
};

const simulateReply = async () => {
  isTyping.value = true;
  await scrollToBottom();
  
  setTimeout(() => {
    isTyping.value = false;
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
    
    messages.value.push({
      id: messages.value.length + 1,
      sender: 'manager',
      text: 'Thank you for your message! Our team will respond shortly. Is there anything else I can help you with? 😊',
      time: timeString,
      read: true
    });
    
    scrollToBottom();
  }, 2000);
};

const scrollToBottom = async () => {
  await nextTick();
  if (chatContainer.value) {
    chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
  }
};
</script>

<style scoped>
@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}
</style>
