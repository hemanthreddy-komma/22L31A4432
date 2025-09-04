/**
 * Logging Middleware for URL Shortener Application
 * Provides structured logging functionality without using console or built-in loggers
 */

class Logger {
  constructor() {
    this.logs = [];
    this.maxLogs = 1000; // Prevent memory overflow
  }

  info(message, data = {}) {
    this.addLog('INFO', message, data);
  }

  error(message, data = {}) {
    this.addLog('ERROR', message, data);
  }

  warn(message, data = {}) {
    this.addLog('WARN', message, data);
  }

  debug(message, data = {}) {
    this.addLog('DEBUG', message, data);
  }

  addLog(level, message, data) {
    const logEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
      id: this.generateLogId(),
    };

    this.logs.unshift(logEntry);

    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(0, this.maxLogs);
    }

    this.notifyListeners(logEntry);
  }

  generateLogId() {
    return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  getLogs() {
    return [...this.logs];
  }

  getLogsByLevel(level) {
    return this.logs.filter((log) => log.level === level);
  }

  clearLogs() {
    this.logs = [];
    this.notifyListeners({ type: 'CLEAR' });
  }

  addListener(callback) {
    if (!this.listeners) {
      this.listeners = [];
    }
    this.listeners.push(callback);
  }

  removeListener(callback) {
    if (this.listeners) {
      this.listeners = this.listeners.filter((listener) => listener !== callback);
    }
  }

  notifyListeners(logEntry) {
    if (this.listeners) {
      this.listeners.forEach((listener) => {
        try {
          listener(logEntry);
        } catch (error) {
          // ignore listener errors
        }
      });
    }
  }

  exportLogs() {
    return JSON.stringify(this.logs, null, 2);
  }

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

// Singleton instance
const logger = new Logger();

export default logger;
export { Logger };
