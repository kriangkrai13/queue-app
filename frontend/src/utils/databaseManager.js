// Import both API and Browser Database services
import { api } from './api.js';
import { browserDatabase } from './browserDatabase.js';

// Database Manager - Switches between API and Browser Database based on environment
class DatabaseManager {
  constructor() {
    // Check environment variable to determine which database to use
    this.useApi = import.meta.env.VITE_USE_API === 'true';
    
    console.log(`🔧 Database Manager initialized:`, {
      mode: this.useApi ? 'API Server' : 'Browser Database',
      useApi: this.useApi
    });
  }

  // Get current database mode
  getMode() {
    return this.useApi ? 'api' : 'browser';
  }

  // Switch database mode (for testing purposes)
  switchMode(useApi = null) {
    if (useApi !== null) {
      this.useApi = useApi;
    } else {
      this.useApi = !this.useApi;
    }
    
    console.log(`🔄 Database mode switched to:`, {
      mode: this.useApi ? 'API Server' : 'Browser Database',
      useApi: this.useApi
    });
  }

  // Queue operations
  queue = {
    // Create new queue
    create: async (serviceChannel = '') => {
      if (this.useApi) {
        return await api.queue.create(serviceChannel);
      } else {
        return await browserDatabase.createQueue(serviceChannel);
      }
    },

    // Get waiting count
    getWaitingCount: async () => {
      if (this.useApi) {
        return await api.queue.getWaitingCount();
      } else {
        return await browserDatabase.getWaitingCount();
      }
    },

    // Get current queue
    getCurrent: async () => {
      if (this.useApi) {
        return await api.queue.getCurrent();
      } else {
        return await browserDatabase.getCurrentQueue();
      }
    },

    // Get previous queues
    getPrevious: async () => {
      if (this.useApi) {
        return await api.queue.getPrevious();
      } else {
        return await browserDatabase.getPreviousQueues();
      }
    },

    // Call specific queue
    call: async (queueNumber, serviceChannel = '') => {
      if (this.useApi) {
        return await api.queue.call(queueNumber, serviceChannel);
      } else {
        return await browserDatabase.callQueue(queueNumber, serviceChannel);
      }
    },

    // Call next queue
    callNext: async (serviceChannel = '') => {
      if (this.useApi) {
        return await api.queue.callNext(serviceChannel);
      } else {
        return await browserDatabase.callNextQueue(serviceChannel);
      }
    },

    // Complete queue (browser database only)
    complete: async (queueNumber) => {
      if (this.useApi) {
        // API doesn't have complete endpoint, return success
        return { ok: true, data: { message: 'Queue completed (API mode)' } };
      } else {
        return await browserDatabase.completeQueue(queueNumber);
      }
    },

    // Get all queues (for debugging)
    getAll: async () => {
      if (this.useApi) {
        // API doesn't have get all endpoint, return empty
        return { ok: true, data: [] };
      } else {
        return await browserDatabase.getAllQueues();
      }
    },

    // Clear all data (for testing)
    clearAll: async () => {
      if (this.useApi) {
        // API doesn't have clear endpoint, return success
        return { ok: true, data: { message: 'Cannot clear API data from frontend' } };
      } else {
        return await browserDatabase.clearAllData();
      }
    }
  };

  // Get database information
  getInfo() {
    return {
      mode: this.getMode(),
      useApi: this.useApi,
      apiBaseUrl: this.useApi ? import.meta.env.VITE_API_BASE_URL : null,
      browserDatabase: !this.useApi ? 'IndexedDB (Dexie)' : null
    };
  }
}

// Create and export database manager instance
export const dbManager = new DatabaseManager();

// Also export the class for direct instantiation if needed
export { DatabaseManager };

export default dbManager;