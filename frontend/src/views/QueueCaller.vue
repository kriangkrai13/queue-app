<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
    <!-- Navigation Bar -->
    <nav class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 px-6 py-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">C</span>
          </div>
          <div>
            <span class="text-xl font-bold text-slate-900 dark:text-white">Queue Caller</span>
            <div v-if="isAuthenticated && sessionExpiry" class="text-xs text-slate-500 dark:text-slate-400">
              หมดอายุ: {{ sessionExpiry.toLocaleTimeString('th-TH') }}
            </div>
          </div>
        </div>
        
        <div class="flex items-center space-x-4">
          <router-link 
            to="/customer" 
            class="text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
          >
            หน้าลูกค้า
          </router-link>
          <button 
            v-if="isAuthenticated"
            @click="logout"
            class="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors duration-200"
          >
            ออกจากระบบ
          </button>
          <router-link 
            to="/" 
            class="btn-secondary px-4 py-2"
          >
            กลับหน้าหลัก
          </router-link>
        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <div v-if="isAuthenticated" class="flex items-center justify-center py-20 px-6">
      <div class="card-dark p-8 w-full max-w-lg">
        <div class="text-center mb-8">
          <div class="w-16 h-16 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
            </svg>
          </div>
          <h2 class="text-3xl font-bold mb-2 text-slate-900 dark:text-white">เรียกคิว</h2>
          <p class="text-slate-600 dark:text-slate-300">จัดการการเรียกคิวลูกค้า</p>
        </div>

        <!-- Queue Number Input -->
        <div class="mb-6">
          <label class="block text-slate-700 dark:text-slate-300 font-medium mb-2">เลขคิว</label>
          <input
            v-model="queueNumber"
            type="number"
            class="input-modern"
            placeholder="กรอกเลขคิวที่ต้องการเรียก"
          />
        </div>

        <!-- Service Channel Input -->
        <div class="mb-8">
          <label class="block text-slate-700 dark:text-slate-300 font-medium mb-2">ช่องบริการ</label>
          <input
            v-model="serviceChannel"
            type="text"
            class="input-modern"
            placeholder="ช่องบริการ (ถ้ามี)"
          />
        </div>

        <!-- Action Buttons -->
        <div class="space-y-4 mb-6">
          <button 
            class="btn-primary w-full py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200" 
            @click="callQueue"
          >
            <svg class="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h4a1 1 0 011 1v2m3 0V1.5A1.5 1.5 0 0014.5 0h-5A1.5 1.5 0 008 1.5V4m11 3.5V20a2 2 0 01-2 2H5a2 2 0 01-2-2V7.5A2 2 0 015 5.5h14a2 2 0 012 2z" />
            </svg>
            เรียกคิวตามเลขที่กรอก
          </button>
          
          <button 
            class="btn-secondary w-full py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200" 
            @click="callNextQueue"
          >
            <svg class="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            เรียกคิวถัดไป
          </button>
        </div>

        <!-- Called Queue Display -->
        <div v-if="calledQueueNumber" class="bg-sky-50 dark:bg-sky-900/20 border border-sky-200 dark:border-sky-700/50 rounded-lg p-6 mb-6">
          <div class="flex items-center justify-center">
            <svg class="w-6 h-6 text-sky-600 dark:text-sky-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a6.5 6.5 0 100-13 6.5 6.5 0 000 13z" />
            </svg>
            <div class="text-center">
              <div class="text-sm text-sky-600 dark:text-sky-400 font-medium">เรียกคิว</div>
              <div class="text-3xl font-bold text-sky-700 dark:text-sky-300">{{ calledQueueNumber }}</div>
            </div>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="space-y-2">
          <router-link 
            to="/display" 
            class="block w-full text-center text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 py-2 rounded-lg hover:bg-sky-50 dark:hover:bg-sky-900/20 transition-colors duration-200"
          >
            ดูหน้าจอแสดงคิว
          </router-link>
        </div>
      </div>
    </div>

    <!-- Password Modal -->
    <div v-if="showPasswordModal" class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-md p-6 transform transition-all duration-300">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 class="text-2xl font-bold text-slate-900 dark:text-white mb-2">ป้อนรหัสผ่าน</h3>
          <p class="text-slate-600 dark:text-slate-300">กรุณาใส่รหัสผ่านเพื่อเข้าใช้งานระบบเรียกคิว</p>
        </div>

        <div class="space-y-4">
          <div>
            <input
              v-model="password"
              type="password"
              class="input-modern"
              placeholder="รหัสผ่าน"
              @keyup.enter="validatePassword"
              @input="passwordError = ''"
            />
            <div v-if="passwordError" class="text-red-500 text-sm mt-2 flex items-center">
              <svg class="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {{ passwordError }}
            </div>
          </div>

          <button 
            @click="validatePassword"
            class="btn-primary w-full py-3 text-lg font-semibold rounded-xl"
          >
            <svg class="w-5 h-5 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            เข้าสู่ระบบ
          </button>

          <router-link 
            to="/" 
            class="block w-full text-center text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white py-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-200"
          >
            กลับหน้าหลัก
          </router-link>
        </div>

        
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
import Modal from "../components/Modal.vue";
import { api } from "../utils/api.js";
import { config } from "../utils/config.js";

const queueNumber = ref("");
const serviceChannel = ref("");
const calledQueueNumber = ref(null);

// Authentication state
const isAuthenticated = ref(false);
const showPasswordModal = ref(false);
const password = ref("");
const passwordError = ref("");
const sessionExpiry = ref(null);

// Get settings from config
const CALLER_PASSWORD = config.auth.callerPassword;
const SESSION_KEY = config.auth.sessionKey;
const SESSION_DURATION = config.auth.sessionDuration;

// Modal state
const showModal = ref(false);
const modalData = ref({
  title: '',
  message: '',
  type: 'info'
});

// Authentication functions
const checkAuthentication = () => {
  const savedAuth = sessionStorage.getItem(SESSION_KEY);
  if (savedAuth) {
    const authData = JSON.parse(savedAuth);
    const now = new Date().getTime();
    // Check if session is still valid
    if (now - authData.timestamp < SESSION_DURATION) {
      isAuthenticated.value = true;
      sessionExpiry.value = new Date(authData.timestamp + SESSION_DURATION);
      return;
    } else {
      sessionStorage.removeItem(SESSION_KEY);
    }
  }
  showPasswordModal.value = true;
};

const validatePassword = () => {
  if (password.value === CALLER_PASSWORD) {
    const now = new Date().getTime();
    isAuthenticated.value = true;
    showPasswordModal.value = false;
    passwordError.value = "";
    sessionExpiry.value = new Date(now + SESSION_DURATION);
    
    // Save to sessionStorage
    const authData = {
      authenticated: true,
      timestamp: now
    };
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(authData));
    
    showNotification("สำเร็จ!", "เข้าสู่ระบบสำเร็จ", "success");
  } else {
    passwordError.value = "รหัสผ่านไม่ถูกต้อง";
    password.value = "";
  }
};

const logout = () => {
  isAuthenticated.value = false;
  sessionStorage.removeItem(SESSION_KEY);
  showPasswordModal.value = true;
  showNotification("ออกจากระบบ", "ออกจากระบบเรียบร้อย", "info");
};

// Helper function to show modal
const showNotification = (title, message, type = 'info') => {
  modalData.value = { title, message, type };
  showModal.value = true;
};

// Initialize authentication check
onMounted(() => {
  checkAuthentication();
});

async function callQueue() {
  try {
    if (!queueNumber.value || isNaN(queueNumber.value) || queueNumber.value <= 0) {
      showNotification("ข้อผิดพลาด", "กรุณากรอกเลขคิวที่ถูกต้อง", "error");
      return;
    }
    const result = await api.queue.call(queueNumber.value, serviceChannel.value);
    
    if (!result.ok) {
      showNotification(
        "เกิดข้อผิดพลาด", 
        result.data.message || "เกิดข้อผิดพลาด", 
        "error"
      );
      return;
    }
    
    calledQueueNumber.value = queueNumber.value;
    playThaiNumber(queueNumber.value, serviceChannel.value);
    showNotification(
      "สำเร็จ!", 
      `เรียกคิว: ${queueNumber.value}`, 
      "success"
    );
  } catch (error) {
    showNotification(
      "เกิดข้อผิดพลาด", 
      "ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้", 
      "error"
    );
  }
}

// ปุ่มคิวถัดไป
async function callNextQueue() {
  try {
    const result = await api.queue.callNext(serviceChannel.value);
    
    if (result.ok && result.data.queue_number) {
      calledQueueNumber.value = result.data.queue_number;
      playThaiNumber(result.data.queue_number, serviceChannel.value);
      showNotification(
        "สำเร็จ!", 
        `เรียกคิว: ${result.data.queue_number}`, 
        "success"
      );
    } else {
      showNotification(
        "ไม่พบคิว", 
        result.data.message || "ไม่พบคิวถัดไป", 
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

function playThaiNumber(num, serviceChannel = "") {
  const synth = window.speechSynthesis;
  let voices = synth.getVoices();

  if (!voices.length) {
    synth.onvoiceschanged = () => playThaiNumber(num, serviceChannel);
    return;
  }

  // หา voice ภาษาไทยและเดาเพศ
  let thaiVoice = voices.find((v) => v.lang.startsWith("th"));
  let isFemale = false;
  if (thaiVoice) {
    if (
      thaiVoice.name.toLowerCase().includes("female") ||
      thaiVoice.name.includes("หญิง") ||
      thaiVoice.name.toLowerCase().includes("premwadee")
    ) {
      isFemale = true;
    }
    if (
      thaiVoice.name.toLowerCase().includes("male") ||
      thaiVoice.name.includes("ชาย") ||
      thaiVoice.name.toLowerCase().includes("pattara")
    ) {
      isFemale = false;
    }
  }

  // ใส่ pause และหางเสียง
  const tail = isFemale ? "ค่ะ" : "ครับ";
  let message = `ขอเชิญคิวที่ ... ${num} ...`;
  if (serviceChannel && serviceChannel !== "") {
    message += `ที่ช่อง ... ${serviceChannel} ...`;
  }
  message += tail;

  // รอบแรก
  const utter1 = new SpeechSynthesisUtterance(message);
  utter1.lang = config.speech.language;
  utter1.rate = config.speech.rate;
  if (thaiVoice) utter1.voice = thaiVoice;

  // รอบสอง
  const utter2 = new SpeechSynthesisUtterance(message);
  utter2.lang = config.speech.language;
  utter2.rate = config.speech.rate;
  if (thaiVoice) utter2.voice = thaiVoice;

  utter1.onend = () => {
    setTimeout(() => synth.speak(utter2), config.speech.repeatDelay);
  };

  synth.speak(utter1);
}
</script>
