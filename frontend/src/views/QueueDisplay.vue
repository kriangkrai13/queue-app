<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
    <!-- Header -->
    <header class="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 px-8 py-6">
      <div class="max-w-6xl mx-auto">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-3">
            <div class="w-10 h-10 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <h1 class="text-2xl font-bold text-slate-900 dark:text-white">หน้าจอแสดงคิว</h1>
              <p class="text-sm text-slate-600 dark:text-slate-400">ระบบจัดการคิวอัตโนมัติ</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <div class="text-sm text-slate-600 dark:text-slate-400">
              อัพเดตล่าสุด: {{ new Date().toLocaleTimeString('th-TH') }}
            </div>
            <router-link 
              to="/" 
              class="btn-secondary px-4 py-2 text-sm"
            >
              กลับหน้าหลัก
            </router-link>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Display -->
    <div class="flex flex-col items-center justify-center py-20 px-8">
      <!-- Current Queue Card -->
      <div class="card-dark p-12 w-full max-w-2xl text-center mb-12 shadow-2xl">
        <div class="mb-6">
          <div class="inline-flex items-center px-4 py-2 bg-sky-100 dark:bg-sky-900/30 text-sky-700 dark:text-sky-300 rounded-full text-sm font-medium mb-4">
            <svg class="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            คิวปัจจุบัน
          </div>
          
          <div class="relative">
            <div class="text-8xl md:text-9xl font-black text-transparent bg-gradient-to-r from-sky-600 via-cyan-500 to-emerald-500 bg-clip-text mb-4 leading-none">
              {{ currentQueue?.queue_number || "-" }}
            </div>
            
            <div v-if="currentQueue?.service_channel" class="inline-flex items-center px-6 py-3 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-xl font-medium text-lg">
              <svg class="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              ช่องบริการ: {{ currentQueue.service_channel }}
            </div>
          </div>
        </div>
      </div>

      <!-- Previous Queues -->
      <div class="w-full max-w-4xl">
        <div class="text-center mb-8">
          <h3 class="text-xl font-bold text-slate-700 dark:text-slate-300 mb-2">คิวก่อนหน้า</h3>
          <div class="w-20 h-1 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-full mx-auto"></div>
        </div>

        <div v-if="previousQueues.length > 0" class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            v-for="(queue, index) in previousQueues" 
            :key="queue.id"
            class="card-dark p-6 text-center transform transition-all duration-300 hover:scale-105"
            :class="{ 'opacity-75': index > 0, 'opacity-50': index > 1 }"
          >
            <div class="text-3xl font-bold text-slate-600 dark:text-slate-400 mb-2">
              {{ queue.queue_number }}
            </div>
            <div v-if="queue.service_channel" class="text-sm text-slate-500 dark:text-slate-500">
              ช่อง {{ queue.service_channel }}
            </div>
            <div class="text-xs text-slate-400 dark:text-slate-600 mt-2">
              {{ index === 0 ? 'ล่าสุด' : `${index + 1} คิวก่อน` }}
            </div>
          </div>
        </div>

        <div v-else class="text-center py-12">
          <svg class="w-16 h-16 text-slate-400 dark:text-slate-600 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 009.586 13H7" />
          </svg>
          <p class="text-slate-500 dark:text-slate-500">ยังไม่มีคิวก่อนหน้า</p>
        </div>
      </div>
    </div>

    <!-- Footer -->
    <footer class="bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border-t border-slate-200 dark:border-slate-700 py-6">
      <div class="max-w-6xl mx-auto px-8 text-center">
        <p class="text-sm text-slate-600 dark:text-slate-400">
          ระบบจะอัพเดตอัตโนมัติทุก 1.5 วินาที
        </p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { api } from "../utils/api.js";

const currentQueue = ref(null);
const previousQueues = ref([]);
let interval = null;

async function fetchQueues() {
  try {
    const [currentResult, previousResult] = await Promise.all([
      api.queue.getCurrent(),
      api.queue.getPrevious(),
    ]);
    if (currentResult.ok) {
      currentQueue.value = currentResult.data.currentQueue;
    }
    
    if (previousResult.ok) {
      previousQueues.value = previousResult.data.previousQueues || [];
    }
  } catch (e) {
    // ในการใช้งานจริง ควรแสดงข้อความ error ให้ user เห็น หรือ log error
    console.error("Error fetching queues:", e);
    currentQueue.value = null;
    previousQueues.value = [];
  }
}

// เริ่มต้นดึงข้อมูล และตั้ง interval
onMounted(() => {
  fetchQueues();
  interval = setInterval(fetchQueues, 1500); // ทุก 1.5 วินาที (ไม่ถี่เกินไป)
});
// ลบ interval ทิ้งตอน component ถูกถอดออก
onUnmounted(() => {
  if (interval) clearInterval(interval);
});
</script>
