<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
    <!-- Navigation Bar -->
    <nav class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700 px-6 py-4">
      <div class="max-w-7xl mx-auto flex justify-between items-center">
        <div class="flex items-center space-x-2">
          <div class="w-8 h-8 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-lg flex items-center justify-center">
            <span class="text-white font-bold text-sm">Q</span>
          </div>
          <span class="text-xl font-bold text-slate-900 dark:text-white">Queue App</span>
        </div>
        
        <!-- Dark Mode Toggle -->
        <button 
          @click="toggleDarkMode" 
          class="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 transition-colors duration-200"
          :title="darkMode ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <svg v-if="!darkMode" class="w-5 h-5 text-slate-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
          <svg v-else class="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
          </svg>
        </button>
      </div>
    </nav>

    <!-- Main Content -->
    <div class="flex flex-col items-center justify-center py-20 px-6">
      <!-- Hero Section -->
      <div class="text-center max-w-4xl mx-auto mb-16">
        <div class="mb-8">
            <!-- Modern "Q" logo -->
            <div class="w-36 h-36 mx-auto flex items-center justify-center bg-white dark:bg-slate-800 rounded-3xl shadow-lg p-4">
            <div class="text-center">
              <svg viewBox="0 0 64 64" class="w-24 h-24 mx-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
              <linearGradient id="qGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style="stop-color:#38bdf8;stop-opacity:1" />
              <stop offset="100%" style="stop-color:#06b6d4;stop-opacity:1" />
              </linearGradient>
              </defs>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M32 60C47.464 60 60 47.464 60 32C60 16.536 47.464 4 32 4C16.536 4 4 16.536 4 32C4 47.464 16.536 60 32 60ZM32 44C38.6274 44 44 38.6274 44 32C44 25.3726 38.6274 20 32 20C25.3726 20 20 25.3726 20 32C20 38.6274 25.3726 44 32 44Z" fill="url(#qGradient)"/>
              <path d="M42.3431 42.3431L53.6568 53.6568" stroke="url(#qGradient)" stroke-width="12" stroke-linecap="round"/>
              </svg>
            </div>
            </div>
        </div>
        
        <h1 class="text-5xl font-extrabold mb-6">
          <span class="text-gradient">Queue Management</span>
        </h1>
        
        <p class="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed">
          เริ่มต้นใช้งานระบบจัดการคิวที่ทันสมัย สวยงาม และใช้งานง่าย
        </p>
        
        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <router-link 
            to="/customer" 
            class="btn-primary px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center"
            >
            <span class="flex items-center justify-center gap-2">
              <!-- Customer Icon -->
              <svg class="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 14c2.21 0 4 1.79 4 4v2H4v-2c0-2.21 1.79-4 4-4m8-6a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              เริ่มใช้งานลูกค้า
            </span>
            </router-link>
            
            <router-link 
            to="/call" 
            class="btn-secondary px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center"
            >
            <span class="flex items-center justify-center gap-2">
              <!-- Call Queue Icon -->
              <svg class="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 10l4.553-2.276A1 1 0 0020 7V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 00.447.724L9 10m6 0v4a2 2 0 01-2 2H7a2 2 0 01-2-2v-4m11 0l-4 2m0 0l-4-2" />
              </svg>
              หน้าเรียกคิว
            </span>
            </router-link>
            <router-link 
            to="/display"
            class="btn-secondary px-8 py-3 text-lg rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 flex flex-col items-center"
            >
            <span class="flex items-center justify-center gap-2">
              <!-- Display Icon -->
              <svg class="w-5 h-5 text-cyan-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="3" y="5" width="18" height="12" rx="2" stroke="currentColor" stroke-width="2" fill="none"/>
              <path d="M8 21h8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              <path d="M12 17v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
              </svg>
              จอแสดงคิว
            </span>
            </router-link>
        </div>
      </div>

      <!-- Feature Cards -->
      <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <div class="card-dark p-6 text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="w-12 h-12 bg-gradient-to-r from-sky-400 to-cyan-400 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-1a1.5 1.5 0 01-3 0V5.5A1.5 1.5 0 0018 4H6a1.5 1.5 0 00-1.5 1.5v13A1.5 1.5 0 006 20h12a1.5 1.5 0 001.5-1.5V6z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2 text-slate-900 dark:text-white">จัดการคิวอัตโนมัติ</h3>
          <p class="text-slate-600 dark:text-slate-300">ระบบจัดการคิวที่ทันสมัยและแม่นยำ</p>
        </div>
        
        <div class="card-dark p-6 text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="w-12 h-12 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2 text-slate-900 dark:text-white">หน้าจอแสดงผล</h3>
          <p class="text-slate-600 dark:text-slate-300">แสดงคิวปัจจุบันแบบเรียลไทม์</p>
        </div>
        
        <div class="card-dark p-6 text-center group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <div class="w-12 h-12 bg-gradient-to-r from-emerald-400 to-sky-400 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200">
            <svg class="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h3 class="text-xl font-bold mb-2 text-slate-900 dark:text-white">ปรับแต่งได้</h3>
          <p class="text-slate-600 dark:text-slate-300">ตั้งค่าและปรับแต่งตามความต้องการ</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: "HomeView",
  setup() {
    const darkMode = ref(false);

    const toggleDarkMode = () => {
      darkMode.value = !darkMode.value;
      if (darkMode.value) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('darkMode', 'true');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('darkMode', 'false');
      }
    };

    onMounted(() => {
      if (localStorage.getItem('darkMode') === 'true') {
        darkMode.value = true;
        document.documentElement.classList.add('dark');
      }
    });

    return {
      darkMode,
      toggleDarkMode,
    };
  },
};
</script>
