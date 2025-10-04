// Simple API URL detection for web app
function getApiBaseUrl() {
  const currentHost = window.location.hostname;
  const currentProtocol = window.location.protocol;
  const backendPort = 3001;
  
  let apiUrl;
  
  // Use same host as frontend for API
  if (currentHost !== 'localhost' && currentHost !== '127.0.0.1') {
    // Accessing via IP - use same IP for API
    apiUrl = `${currentProtocol}//${currentHost}:${backendPort}`;
  } else {
    // Accessing via localhost - use localhost for API
    apiUrl = `http://localhost:${backendPort}`;
  }
  
  // Debug log
  console.log(`🔗 API URL: ${apiUrl} (Host: ${currentHost})`);
  
  return apiUrl;
}

// Configuration for Queue Management System
export const config = {
  // Authentication settings
  auth: {
    callerPassword: "admin123", // รหัสผ่านสำหรับหน้าเรียกคิว
    sessionDuration: 4 * 60 * 60 * 1000, // 4 hours in milliseconds
    sessionKey: "queue_caller_auth"
  },
  
  // API settings
  api: {
    get baseUrl() {
      return getApiBaseUrl();
    }
  },
  
  // Print settings
  print: {
    paperWidth: "50mm",
    paperHeight: "60mm",
    autoDelay: 500 // milliseconds
  },
  
  // Speech settings
  speech: {
    language: "th-TH",
    rate: 0.5,
    repeatCount: 2,
    repeatDelay: 1000 // milliseconds
  },
  
  // UI settings
  ui: {
    darkMode: true,
    animations: true,
    autoHideDuration: 5000 // milliseconds for notifications
  }
};

// Security note: In production, consider moving sensitive settings to environment variables
// Example: callerPassword: import.meta.env.VITE_CALLER_PASSWORD || "admin123"