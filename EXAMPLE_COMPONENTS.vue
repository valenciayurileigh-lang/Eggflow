<!-- ============================================================================
     EXAMPLE COMPONENT TEMPLATE
     Shows how to create new components using centralized CSS
     ============================================================================
     
     This example demonstrates:
     1. Template structure with BEM class names
     2. Script with component logic (no <style> block)
     3. Corresponding CSS in src/style.css
     
     ========================================================================== -->

<!-- ============================================================================
   EXAMPLE 1: Cards Component
   ============================================================================ -->

<template>
  <div class="card-grid">
    <div v-for="card in cards" :key="card.id" class="card">
      <div class="card__header">
        <h3 class="card__title">{{ card.title }}</h3>
        <span class="card__badge" :class="card.status">{{ card.status }}</span>
      </div>
      
      <div class="card__content">
        <p class="card__description">{{ card.description }}</p>
      </div>
      
      <div class="card__footer">
        <button class="card__btn card__btn--primary">View</button>
        <button class="card__btn card__btn--secondary">Edit</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const cards = ref([
  { id: 1, title: 'Card 1', status: 'active', description: 'Sample card description' },
  { id: 2, title: 'Card 2', status: 'inactive', description: 'Another card description' },
  { id: 3, title: 'Card 3', status: 'active', description: 'Third card description' },
]);
</script>

<!-- NO STYLE BLOCK - All styles are in src/style.css under CARD COMPONENT STYLES section -->


<!-- ============================================================================
   EXAMPLE 2: Modal/Dialog Component
   ============================================================================ -->

<template>
  <div v-if="isOpen" class="modal-overlay" @click.self="closeModal">
    <div class="modal">
      <div class="modal__header">
        <h2 class="modal__title">{{ title }}</h2>
        <button class="modal__close-btn" @click="closeModal" aria-label="Close">
          <Icon icon="line-md:close" />
        </button>
      </div>
      
      <div class="modal__body">
        <slot />
      </div>
      
      <div class="modal__footer">
        <button class="modal__btn modal__btn--secondary" @click="closeModal">
          Cancel
        </button>
        <button class="modal__btn modal__btn--primary" @click="confirmAction">
          {{ confirmText }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Icon } from '@iconify/vue';

const props = defineProps({
  title: String,
  confirmText: { type: String, default: 'Confirm' },
});

const emit = defineEmits(['close', 'confirm']);

const isOpen = ref(true);

const closeModal = () => {
  isOpen.value = false;
  emit('close');
};

const confirmAction = () => {
  emit('confirm');
  closeModal();
};
</script>

<!-- NO STYLE BLOCK - All styles are in src/style.css under MODAL COMPONENT STYLES section -->


<!-- ============================================================================
   EXAMPLE 3: Form Component
   ============================================================================ -->

<template>
  <form class="form" @submit.prevent="submitForm">
    <div v-for="field in fields" :key="field.name" class="form__group">
      <label :for="field.name" class="form__label">
        {{ field.label }}
        <span v-if="field.required" class="form__required">*</span>
      </label>
      
      <input
        :id="field.name"
        v-model="formData[field.name]"
        :type="field.type || 'text'"
        :placeholder="field.placeholder"
        :required="field.required"
        class="form__input"
      />
      
      <p v-if="errors[field.name]" class="form__error">
        {{ errors[field.name] }}
      </p>
    </div>
    
    <button type="submit" class="form__submit">
      {{ submitText }}
    </button>
  </form>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  fields: Array,
  submitText: { type: String, default: 'Submit' },
});

const emit = defineEmits(['submit']);

const formData = ref({});
const errors = ref({});

const submitForm = () => {
  // Validate and emit
  emit('submit', formData.value);
};
</script>

<!-- NO STYLE BLOCK - All styles are in src/style.css under FORM COMPONENT STYLES section -->


<!-- ============================================================================
   CORRESPONDING CSS STYLES IN src/style.css
   ============================================================================ 

   Copy these sections into your src/style.css file and customize as needed:

   ============================================================================
   CARD COMPONENT STYLES
   BEM: .card-grid, .card, .card__title, .card__badge
   ============================================================================

   .card-grid {
     display: grid;
     grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
     gap: 1.5rem;
   }

   .card {
     background: white;
     border-radius: 0.5rem;
     box-shadow: var(--card-shadow-sm);
     padding: 1.5rem;
     transition: all 0.3s ease;
     display: flex;
     flex-direction: column;
   }

   .card.dark {
     background: #1f2937;
   }

   .card:hover {
     box-shadow: var(--card-shadow);
     transform: translateY(-2px);
   }

   .card__header {
     display: flex;
     justify-content: space-between;
     align-items: flex-start;
     margin-bottom: 1rem;
   }

   .card__title {
     font-size: 1.125rem;
     font-weight: 600;
     color: var(--text-dark);
     margin: 0;
   }

   .card.dark .card__title {
     color: white;
   }

   .card__badge {
     padding: 0.25rem 0.75rem;
     border-radius: 9999px;
     font-size: 0.75rem;
     font-weight: 600;
     text-transform: uppercase;
   }

   .card__badge.active {
     background: #dcfce7;
     color: #166534;
   }

   .card.dark .card__badge.active {
     background: rgba(5, 122, 85, 0.3);
     color: #4ade80;
   }

   .card__badge.inactive {
     background: #fee2e2;
     color: #991b1b;
   }

   .card.dark .card__badge.inactive {
     background: rgba(127, 29, 29, 0.3);
     color: #fca5a5;
   }

   .card__content {
     flex: 1;
     margin-bottom: 1rem;
   }

   .card__description {
     color: #4b5563;
     font-size: 0.875rem;
     line-height: 1.5;
     margin: 0;
   }

   .card.dark .card__description {
     color: #d1d5db;
   }

   .card__footer {
     display: flex;
     gap: 0.5rem;
     border-top: 1px solid var(--border-color);
     padding-top: 1rem;
   }

   .card.dark .card__footer {
     border-top-color: var(--border-color-dark);
   }

   .card__btn {
     flex: 1;
     padding: 0.5rem 1rem;
     border: none;
     border-radius: 0.375rem;
     cursor: pointer;
     font-size: 0.875rem;
     font-weight: 500;
     transition: all 0.2s ease;
   }

   .card__btn--primary {
     background: var(--primary-color);
     color: white;
   }

   .card__btn--primary:hover {
     opacity: 0.9;
   }

   .card__btn--secondary {
     background: #f3f4f6;
     color: var(--text-dark);
     border: 1px solid var(--border-color);
   }

   .card.dark .card__btn--secondary {
     background: #374151;
     color: white;
     border-color: var(--border-color-dark);
   }

   .card__btn--secondary:hover {
     background: #e5e7eb;
   }

   .card.dark .card__btn--secondary:hover {
     background: #4b5563;
   }

   ============================================================================
   MODAL COMPONENT STYLES
   BEM: .modal-overlay, .modal, .modal__header, .modal__body, .modal__footer
   ============================================================================

   .modal-overlay {
     position: fixed;
     top: 0;
     left: 0;
     right: 0;
     bottom: 0;
     background: rgba(0, 0, 0, 0.5);
     display: flex;
     align-items: center;
     justify-content: center;
     z-index: 50;
   }

   .modal {
     background: white;
     border-radius: 0.5rem;
     box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
     width: 90%;
     max-width: 500px;
     max-height: 90vh;
     overflow-y: auto;
     z-index: 51;
   }

   .modal.dark {
     background: #1f2937;
   }

   .modal__header {
     display: flex;
     justify-content: space-between;
     align-items: center;
     padding: 1.5rem;
     border-bottom: 1px solid var(--border-color);
   }

   .modal.dark .modal__header {
     border-bottom-color: var(--border-color-dark);
   }

   .modal__title {
     font-size: 1.25rem;
     font-weight: 600;
     color: var(--text-dark);
     margin: 0;
   }

   .modal.dark .modal__title {
     color: white;
   }

   .modal__close-btn {
     background: none;
     border: none;
     font-size: 1.5rem;
     cursor: pointer;
     color: #6b7280;
     padding: 0;
     display: flex;
     align-items: center;
     justify-content: center;
   }

   .modal.dark .modal__close-btn {
     color: #d1d5db;
   }

   .modal__body {
     padding: 1.5rem;
   }

   .modal__footer {
     display: flex;
     gap: 1rem;
     padding: 1.5rem;
     border-top: 1px solid var(--border-color);
   }

   .modal.dark .modal__footer {
     border-top-color: var(--border-color-dark);
   }

   .modal__btn {
     flex: 1;
     padding: 0.75rem 1.5rem;
     border: none;
     border-radius: 0.375rem;
     cursor: pointer;
     font-weight: 500;
     transition: all 0.2s ease;
   }

   .modal__btn--primary {
     background: var(--primary-color);
     color: white;
   }

   .modal__btn--primary:hover {
     opacity: 0.9;
   }

   .modal__btn--secondary {
     background: #f3f4f6;
     color: var(--text-dark);
     border: 1px solid var(--border-color);
   }

   .modal.dark .modal__btn--secondary {
     background: #374151;
     color: white;
     border-color: var(--border-color-dark);
   }

   ============================================================================
   FORM COMPONENT STYLES
   BEM: .form, .form__group, .form__label, .form__input, .form__error
   ============================================================================

   .form {
     display: flex;
     flex-direction: column;
     gap: 1.5rem;
   }

   .form__group {
     display: flex;
     flex-direction: column;
     gap: 0.5rem;
   }

   .form__label {
     font-weight: 500;
     color: var(--text-dark);
     font-size: 0.875rem;
   }

   .form.dark .form__label {
     color: #e5e7eb;
   }

   .form__required {
     color: #ef4444;
     margin-left: 0.25rem;
   }

   .form__input {
     padding: 0.75rem 1rem;
     border: 1px solid var(--border-color);
     border-radius: 0.375rem;
     font-size: 1rem;
     font-family: inherit;
     transition: all 0.2s ease;
   }

   .form.dark .form__input {
     background: #374151;
     border-color: var(--border-color-dark);
     color: white;
   }

   .form__input:focus {
     outline: none;
     border-color: var(--primary-color);
     box-shadow: 0 0 0 3px rgba(70, 49, 181, 0.1);
   }

   .form.dark .form__input:focus {
     box-shadow: 0 0 0 3px rgba(70, 49, 181, 0.2);
   }

   .form__error {
     color: #ef4444;
     font-size: 0.875rem;
     margin: 0;
   }

   .form__submit {
     padding: 0.75rem 1.5rem;
     background: var(--primary-color);
     color: white;
     border: none;
     border-radius: 0.375rem;
     font-weight: 600;
     cursor: pointer;
     transition: all 0.2s ease;
   }

   .form__submit:hover {
     opacity: 0.9;
   }

   ============================================================================
-->
