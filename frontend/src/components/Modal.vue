<template>
  <!-- Modal Backdrop -->
  <div 
    v-if="isVisible" 
    class="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 transition-all duration-300"
    :class="{ 'opacity-100': isVisible, 'opacity-0': !isVisible }"
    @click="closeModal"
  >
    <!-- Modal Content -->
    <div 
      class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 max-w-md w-full transform transition-all duration-300"
      :class="{ 'scale-100 opacity-100': isVisible, 'scale-95 opacity-0': !isVisible }"
      @click.stop
    >
      <!-- Modal Header -->
      <div class="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-700">
        <div class="flex items-center space-x-3">
          <!-- Success Icon -->
          <div 
            v-if="type === 'success'" 
            class="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center"
          >
            <svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <!-- Error Icon -->
          <div 
            v-else-if="type === 'error'" 
            class="w-8 h-8 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center"
          >
            <svg class="w-5 h-5 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          
          <!-- Info Icon -->
          <div 
            v-else 
            class="w-8 h-8 bg-sky-100 dark:bg-sky-900/30 rounded-full flex items-center justify-center"
          >
            <svg class="w-5 h-5 text-sky-600 dark:text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          
          <h3 class="text-lg font-semibold text-slate-900 dark:text-white">
            {{ title }}
          </h3>
        </div>
        
        <!-- Close Button -->
        <button 
          @click="closeModal"
          class="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors duration-200"
        >
          <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <!-- Modal Body -->
      <div class="p-6">
        <p class="text-slate-700 dark:text-slate-300 leading-relaxed">
          {{ message }}
        </p>
      </div>
      
      <!-- Modal Footer -->
      <div class="flex justify-end gap-3 p-6 border-t border-slate-200 dark:border-slate-700">
        <button 
          @click="closeModal"
          class="btn-primary px-6 py-2.5 rounded-lg font-medium transition-all duration-200"
        >
          ตกลง
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

// Props
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: 'แจ้งเตือน'
  },
  message: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    default: 'info', // 'success', 'error', 'info'
    validator: (value) => ['success', 'error', 'info'].includes(value)
  }
});

// Emits
const emit = defineEmits(['update:modelValue', 'close']);

// Reactive state
const isVisible = ref(props.modelValue);

// Watch for prop changes
watch(() => props.modelValue, (newValue) => {
  isVisible.value = newValue;
});

// Methods
const closeModal = () => {
  isVisible.value = false;
  emit('update:modelValue', false);
  emit('close');
};

// Auto close after 3 seconds for success messages
watch(isVisible, (newValue) => {
  if (newValue && props.type === 'success') {
    setTimeout(() => {
      closeModal();
    }, 3000);
  }
});
</script>