// Import config for API detection
import { config } from './config.js';

// API utility functions
export const api = {
  // Base fetch wrapper
  async request(endpoint, options = {}) {
    const baseUrl = config.api.baseUrl;
    const url = `${baseUrl}${endpoint}`;
    
    const requestConfig = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      console.log(`🔄 API Request: ${url}`);
      const response = await fetch(url, requestConfig);
      const data = await response.json();
      
      return {
        ok: response.ok,
        status: response.status,
        data,
        response
      };
    } catch (error) {
      console.error(`❌ API Error (${url}):`, error);
      throw error;
    }
  },

  // Queue API methods
  queue: {
    // Create new queue
    async create(serviceChannel = '') {
      return api.request('/api/queue/new', {
        method: 'POST',
        body: JSON.stringify({ service_channel: serviceChannel }),
      });
    },

    // Get waiting count
    async getWaitingCount() {
      return api.request('/api/queue/waiting/count');
    },

    // Get current queue
    async getCurrent() {
      return api.request('/api/queue/current');
    },

    // Get previous queues
    async getPrevious() {
      return api.request('/api/queue/previous');
    },

    // Call specific queue
    async call(queueNumber, serviceChannel = '') {
      return api.request('/api/queue/call', {
        method: 'POST',
        body: JSON.stringify({
          queue_number: queueNumber,
          service_channel: serviceChannel,
        }),
      });
    },

    // Call next queue
    async callNext(serviceChannel = '') {
      return api.request('/api/queue/next', {
        method: 'POST',
        body: JSON.stringify({ service_channel: serviceChannel }),
      });
    },
  },
};

export default api;