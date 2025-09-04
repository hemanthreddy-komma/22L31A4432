/**
 * Logging Middleware for URL Shortener Application
 * Provides structured logging functionality without using console or built-in loggers
 */

class Logger {
  constructor() {
    this.logs = [];
    this.maxLogs = 1000; // Prevent memory overflow
  }

  /**
   * Log an info message
   * @param {string} message - The message to log
   * @param {object} data - Additional data to log
   */
  info(message, data = {}) {
    this.addLog('INFO', message, data);
  }

  /**
   * Log an error message
   * @param {string} message - The error message to log
   * @param {object} data - Additional error data
   */
  error(message, data = {}) {
    this.addLog('ERROR', message, data);
  }

  /**
   * Log a warning message
   * @param {string} message - The warning message to log
   * @param {object} data - Additional warning data
   */
  warn(message, data = {}) {
    this.addLog('WARN', message, data);
  }

  /**
   * Log a debug message
   * @param {string} message - The debug message to log
   * @param {object} data - Additional debug data
   */
  debug(message, data = {}) {
    this.addLog('DEBUG', message, data);
  }

  /**
   * Add a log entry to the internal log store
   * @param {string} level - Log level
   * @param {string} message - Log message
   * @param {object} data - Additional data
   */
  addLog(level, message, data) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      id: this.generateLogId()
    };

    this.logs.unshift(logEntry);

    // Maintain max log limit
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    // Emit to any registered listeners
    this.notifyListeners(logEntry);
  }

  /**
   * Generate a unique log ID
   * @returns {string} Unique log identifier
   */
  generateLogId() {
    return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get all logs
   * @returns {Array} Array of log entries
   */
  getLogs() {
    return [...this.logs];
  }

  /**
   * Get logs by level
   * @param {string} level - Log level to filter by
   * @returns {Array} Filtered log entries
   */
  getLogsByLevel(level) {
    return this.logs.filter(log => log.level === level);
  }

  /**
   * Clear all logs
   */
  clearLogs() {
    this.logs = [];
    this.notifyListeners({ type: 'CLEAR' });
  }

  /**
   * Register a listener for log events
   * @param {Function} callback - Callback function to call on new logs
   */
  addListener(callback) {
    if (!this.listeners) {
      this.listeners = [];
    }
    this.listeners.push(callback);
  }

  /**
   * Remove a listener
   * @param {Function} callback - Callback function to remove
   */
  removeListener(callback) {
    if (this.listeners) {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    }
  }

  /**
   * Notify all registered listeners of new log entries
   * @param {object} logEntry - The log entry to broadcast
   */
  notifyListeners(logEntry) {
    if (this.listeners) {
      this.listeners.forEach(listener => {
        try {
          listener(logEntry);
        } catch (error) {
          // Silently handle listener errors to prevent cascading issues
        }
      });
    }
  }

  /**
   * Export logs as JSON string
   * @returns {string} JSON representation of logs
   */
  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }

  /**
   * Import logs from JSON string
   * @param {string} jsonLogs - JSON string of logs to import
   */
  importLogs(jsonLogs) {
    try {
      const importedLogs = JSON.parse(jsonLogs);
      if (Array.isArray(importedLogs)) {
        this.logs = importedLogs;
        this.notifyListeners({ type: 'IMPORT', count: importedLogs.length });
      }
    } catch (error) {
      this.error('Failed to import logs', { error: error.message });
    }
  }
}

// Create and export a singleton instance
const logger = new Logger();

export default logger;

// Also export the Logger class for testing purposes
export { Logger };