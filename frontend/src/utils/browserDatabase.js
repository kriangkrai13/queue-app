import Dexie from 'dexie';

// Queue Database using Dexie (IndexedDB wrapper)
class QueueDatabase extends Dexie {
  constructor() {
    super('QueueManagementDB');
    
    // Define schema
    this.version(1).stores({
      queues: '++id, queue_number, service_channel, status, created_at, called_at',
      settings: 'key, value'
    });

    // Table references
    this.queues = this.table('queues');
    this.settings = this.table('settings');
  }
}

// Create database instance
const db = new QueueDatabase();

// Browser Database Manager
export class BrowserDatabaseManager {
  constructor() {
    this.db = db;
    this.currentQueueNumber = 1;
    this.initialize();
  }

  // Initialize database with default settings
  async initialize() {
    try {
      // Get current queue number from settings
      const currentNumber = await this.db.settings.get('currentQueueNumber');
      if (currentNumber) {
        this.currentQueueNumber = currentNumber.value;
      } else {
        // Set initial queue number
        await this.db.settings.put({ key: 'currentQueueNumber', value: 1 });
      }
    } catch (error) {
      console.error('❌ Database initialization error:', error);
    }
  }

  // Generate next queue number
  async getNextQueueNumber() {
    const number = this.currentQueueNumber;
    this.currentQueueNumber++;
    
    // Update in database
    await this.db.settings.put({ 
      key: 'currentQueueNumber', 
      value: this.currentQueueNumber 
    });
    
    return number;
  }

  // Create new queue
  async createQueue(serviceChannel = '') {
    try {
      const queueNumber = await this.getNextQueueNumber();
      const queueData = {
        queue_number: queueNumber,
        service_channel: serviceChannel,
        status: 'waiting',
        created_at: new Date().toISOString(),
        called_at: null
      };

      const id = await this.db.queues.add(queueData);
      
      return {
        ok: true,
        data: { id, ...queueData }
      };
    } catch (error) {
      console.error('❌ Create queue error:', error);
      return {
        ok: false,
        error: error.message
      };
    }
  }

  // Get waiting count
  async getWaitingCount() {
    try {
      const count = await this.db.queues
        .where('status')
        .equals('waiting')
        .count();

      return {
        ok: true,
        data: { waiting_count: count }
      };
    } catch (error) {
      console.error('❌ Get waiting count error:', error);
      return {
        ok: false,
        error: error.message
      };
    }
  }

  // Get current queue (latest called)
  async getCurrentQueue() {
    try {
      const current = await this.db.queues
        .where('status')
        .equals('called')
        .reverse()
        .sortBy('called_at');

      const currentQueue = current.length > 0 ? current[0] : null;

      return {
        ok: true,
        data: { current_queue: currentQueue }
      };
    } catch (error) {
      console.error('❌ Get current queue error:', error);
      return {
        ok: false,
        error: error.message
      };
    }
  }

  // Get previous queues (completed)
  async getPreviousQueues() {
    try {
      const previous = await this.db.queues
        .where('status')
        .equals('completed')
        .reverse()
        .sortBy('called_at');

      return {
        ok: true,
        data: { previous_queues: previous.slice(0, 10) } // Last 10
      };
    } catch (error) {
      console.error('❌ Get previous queues error:', error);
      return {
        ok: false,
        error: error.message
      };
    }
  }

  // Call specific queue
  async callQueue(queueNumber, serviceChannel = '') {
    try {
      const queue = await this.db.queues
        .where('queue_number')
        .equals(queueNumber)
        .first();

      if (!queue) {
        return {
          ok: false,
          error: 'Queue not found'
        };
      }

      if (queue.status !== 'waiting') {
        return {
          ok: false,
          error: 'Queue is not waiting'
        };
      }

      // Update queue status
      await this.db.queues.update(queue.id, {
        status: 'called',
        service_channel: serviceChannel,
        called_at: new Date().toISOString()
      });

      const updatedQueue = await this.db.queues.get(queue.id);

      return {
        ok: true,
        data: { called_queue: updatedQueue }
      };
    } catch (error) {
      console.error('❌ Call queue error:', error);
      return {
        ok: false,
        error: error.message
      };
    }
  }

  // Call next queue
  async callNextQueue(serviceChannel = '') {
    try {
      const nextQueue = await this.db.queues
        .where('status')
        .equals('waiting')
        .first();

      if (!nextQueue) {
        return {
          ok: false,
          error: 'No waiting queue found'
        };
      }

      return await this.callQueue(nextQueue.queue_number, serviceChannel);
    } catch (error) {
      console.error('❌ Call next queue error:', error);
      return {
        ok: false,
        error: error.message
      };
    }
  }

  // Complete current queue (for display management)
  async completeQueue(queueNumber) {
    try {
      const queue = await this.db.queues
        .where('queue_number')
        .equals(queueNumber)
        .first();

      if (!queue) {
        return {
          ok: false,
          error: 'Queue not found'
        };
      }

      await this.db.queues.update(queue.id, {
        status: 'completed'
      });

      return {
        ok: true,
        data: { message: 'Queue completed' }
      };
    } catch (error) {
      console.error('❌ Complete queue error:', error);
      return {
        ok: false,
        error: error.message
      };
    }
  }

  // Get all queues (for debugging)
  async getAllQueues() {
    try {
      const queues = await this.db.queues.orderBy('created_at').toArray();
      return {
        ok: true,
        data: queues
      };
    } catch (error) {
      console.error('❌ Get all queues error:', error);
      return {
        ok: false,
        error: error.message
      };
    }
  }

  // Clear all data (for testing)
  async clearAllData() {
    try {
      await this.db.queues.clear();
      await this.db.settings.clear();
      this.currentQueueNumber = 1;
      await this.initialize();
      
      return {
        ok: true,
        data: { message: 'All data cleared' }
      };
    } catch (error) {
      console.error('❌ Clear data error:', error);
      return {
        ok: false,
        error: error.message
      };
    }
  }
}

// Export browser database instance
export const browserDatabase = new BrowserDatabaseManager();
export default browserDatabase;