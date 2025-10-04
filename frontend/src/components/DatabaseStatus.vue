<template>
  <div class="fixed top-4 right-4 z-50">
    <div class="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm border border-slate-200 dark:border-slate-600 rounded-lg shadow-lg p-3 min-w-[200px]">
      <!-- Database Mode Status -->
      <div class="flex items-center justify-between mb-2">
        <div class="flex items-center">
          <div 
            :class="[
              'w-2 h-2 rounded-full mr-2',
              isApiMode ? 'bg-green-500' : 'bg-blue-500'
            ]"
          ></div>
          <span class="text-sm font-medium text-slate-700 dark:text-slate-300">
            {{ isApiMode ? 'API Server' : 'Browser DB' }}
          </span>
        </div>
        
        <!-- Mode Toggle Button (Development only) -->
        <button 
          v-if="isDevelopment"
          @click="toggleMode"
          class="text-xs px-2 py-1 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 rounded transition-colors duration-200"
          title="สลับโหมด (เฉพาะการพัฒนา)"
        >
          สลับ
        </button>
      </div>
      
      <!-- Status Details -->
      <div class="text-xs text-slate-500 dark:text-slate-400 space-y-1">
        <div v-if="isApiMode">
          <div>🌐 {{ apiBaseUrl }}</div>
          <div v-if="apiStatus" class="flex items-center">
            <div :class="[
              'w-1.5 h-1.5 rounded-full mr-2',
              apiStatus === 'online' ? 'bg-green-400' : 'bg-red-400'
            ]"></div>
            {{ apiStatus === 'online' ? 'เชื่อมต่อแล้ว' : 'ไม่สามารถเชื่อมต่อ' }}
          </div>
        </div>
        
        <div v-else>
          <div>💾 IndexedDB (Dexie)</div>
          <div class="flex items-center">
            <div class="w-1.5 h-1.5 rounded-full bg-blue-400 mr-2"></div>
            ออฟไลน์พร้อมใช้งาน
          </div>
        </div>
      </div>

      <!-- Environment Info (Development only) -->
      <div v-if="isDevelopment" class="mt-2 pt-2 border-t border-slate-200 dark:border-slate-600">
        <div class="text-xs text-slate-400 dark:text-slate-500">
          <div>ENV: {{ isDevelopment ? 'Development' : 'Production' }}</div>
          <div>VITE_USE_API: {{ envUseApi }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { dbManager } from '../utils/databaseManager.js'

// Reactive state
const apiStatus = ref(null)
const isDevelopment = computed(() => import.meta.env.DEV)
const envUseApi = computed(() => import.meta.env.VITE_USE_API)

// Database info
const dbInfo = computed(() => dbManager.getInfo())
const isApiMode = computed(() => dbInfo.value.useApi)
const apiBaseUrl = computed(() => dbInfo.value.apiBaseUrl)

// Toggle mode (for development)
const toggleMode = () => {
  dbManager.switchMode()
  checkApiStatus()
}

// Check API status
const checkApiStatus = async () => {
  if (isApiMode.value) {
    try {
      // Try to ping the API
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 3000) // 3 second timeout
      
      const response = await fetch(`${apiBaseUrl.value}/api/queue/waiting/count`, {
        method: 'GET',
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      apiStatus.value = response.ok ? 'online' : 'offline'
    } catch (error) {
      apiStatus.value = 'offline'
    }
  } else {
    apiStatus.value = null
  }
}

// Initialize
onMounted(() => {
  checkApiStatus()
  
  // Check API status periodically if in API mode
  if (isApiMode.value) {
    setInterval(checkApiStatus, 30000) // Check every 30 seconds
  }
})
</script>