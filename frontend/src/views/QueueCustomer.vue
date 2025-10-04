<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
    <!-- Navigation Bar -->
    <nav class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 px-6 py-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">Q</span>
          </div>
          <span class="text-xl font-bold text-slate-900 dark:text-white">Queue Customer</span>
        </div>
        
        <router-link 
          to="/" 
          class="btn-secondary px-4 py-2"
        >
          กลับหน้าหลัก
        </router-link>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="flex items-center justify-center py-20 px-6">
      <div class="card-dark p-8 w-full max-w-md">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold mb-2 text-slate-900 dark:text-white">ลูกค้า</h2>
          <p class="text-slate-600 dark:text-slate-300">จัดการคิวของคุณ</p>
        </div>

        <!-- Queue Status -->
        <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6 mb-6 text-center">
          <div class="text-sm text-slate-600 dark:text-slate-400 mb-2">จำนวนคิวที่รออยู่</div>
          <div class="text-4xl font-bold text-sky-600 dark:text-sky-400">{{ waitingCount }}</div>
        </div>

        <!-- Print Settings -->
        <div class="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-4 mb-6">
          <div class="flex items-center justify-between mb-3">
            <label for="autoPrint" class="text-sm font-medium text-slate-700 dark:text-slate-300">
              ปริ้นใบคิวอัตโนมัติ
            </label>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                id="autoPrint"
                type="checkbox" 
                v-model="autoPrint" 
                class="sr-only peer"
              >
              <div class="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-sky-800 rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-slate-600 peer-checked:bg-sky-600"></div>
            </label>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400">
            เมื่อเปิดใช้งาน ระบบจะปริ้นใบคิวอัตโนมัติหลังจากสร้างคิวสำเร็จ
          </p>
        </div>


        <!-- Create Queue Button -->
        <button 
          class="btn-primary w-full mb-4 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200" 
          @click="createNewQueue"
        >
          <svg class="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          กดคิว
        </button>

        <!-- Last Queue Number -->
        <div v-if="lastQueueNumber" class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-700/50 rounded-lg p-4 mb-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-emerald-600 dark:text-emerald-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <div class="text-emerald-800 dark:text-emerald-200">
                  สร้างคิวใหม่: <span class="font-bold text-xl">{{ lastQueueNumber }}</span>
                </div>
                <div v-if="lastQueueTimestamp" class="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                  {{ formatTimestamp(lastQueueTimestamp) }}
                </div>
              </div>
            </div>
            
            <!-- Reprint Button -->
            <button 
              @click="printQueue(lastQueueNumber, lastQueueTimestamp)"
              class="flex items-center px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-800/50 dark:hover:bg-emerald-700/50 text-emerald-700 dark:text-emerald-300 rounded-lg text-sm font-medium transition-colors duration-200"
              title="ปริ้นใบคิวอีกครั้ง"
            >
              <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
              </svg>
              ปริ้นอีกครั้ง
            </button>
          </div>
        </div>

        <!-- Go to Caller Button -->
        <!-- <button 
          class="btn-secondary w-full mb-6 py-3 font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200" 
          @click="goToCaller"
        >
          <svg class="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
          </svg>
          ไปหน้าเรียกคิว
        </button> -->

        <!-- Quick Links -->
        <!-- <div class="space-y-2">
          <router-link 
            to="/display" 
            class="block w-full text-center text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 py-2 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors duration-200"
          >
            ดูหน้าจอแสดงคิว
          </router-link>
        </div> -->
      </div>
    </div>

    <!-- Modal Component -->
    <Modal 
      v-model="showModal" 
      :title="modalData.title"
      :message="modalData.message"
      :type="modalData.type"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Modal from "../components/Modal.vue";
import { api } from "../utils/api.js";
import { printUtils } from "../utils/print.js";
const router = useRouter();
const serviceChannel = ref("");
const lastQueueNumber = ref(null);
const waitingCount = ref(0);

// Modal state
const showModal = ref(false);
const modalData = ref({
  title: '',
  message: '',
  type: 'info'
});

// Print settings
const autoPrint = ref(true);
const lastQueueTimestamp = ref(null);

const goToCaller = () => router.push("/call");
onMounted(fetchWaitingCount);

// Helper function to show modal
const showNotification = (title, message, type = 'info') => {
  modalData.value = { title, message, type };
  showModal.value = true;
};

// Print queue ticket
const printQueue = (queueNumber, timestamp = new Date()) => {
  printUtils.printQueueTicket({
    queueNumber: queueNumber,
    timestamp: timestamp,
    waitingCount: waitingCount.value,
    serviceChannel: serviceChannel.value
  });
};

// Format timestamp for display
const formatTimestamp = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleString('th-TH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });
};
async function createNewQueue() {
  try {
    const result = await api.queue.create(serviceChannel.value);
    
    if (result.ok && result.data.queue_number) {
      const timestamp = new Date();
      lastQueueNumber.value = result.data.queue_number;
      lastQueueTimestamp.value = timestamp;
      
      // Auto print if enabled
      if (autoPrint.value) {
        setTimeout(() => {
          printQueue(result.data.queue_number, timestamp);
        }, 500); // Delay เล็กน้อยเพื่อให้ UI update ก่อน
      }
      
      showNotification(
        "สำเร็จ!", 
        `สร้างคิวใหม่: ${result.data.queue_number}${autoPrint.value ? ' (กำลังปริ้น...)' : ''}`, 
        "success"
      );
      fetchWaitingCount();
    } else {
      showNotification(
        "เกิดข้อผิดพลาด", 
        result.data.message || "เกิดข้อผิดพลาดในการสร้างคิว", 
        "error"
      );
    }
  } catch (error) {
    showNotification(
      "เกิดข้อผิดพลาด", 
      "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้", 
      "error"
    );
  }
}

async function fetchWaitingCount() {
  try {
    const result = await api.queue.getWaitingCount();
    if (result.ok) {
      waitingCount.value = result.data.count || 0;
    }
  } catch (error) {
    console.error('Error fetching waiting count:', error);
    waitingCount.value = 0;
  }
}
</script>
