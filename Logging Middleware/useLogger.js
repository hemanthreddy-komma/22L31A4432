/**
 * React Hook for Logging Middleware Integration
 * Provides easy access to logging functionality within React components
 */

import { useEffect, useState, useCallback } from 'react';
import logger from './logger.js';

/**
 * Custom hook for logging functionality
 * @returns {object} Logger utilities and log state
 */
export const useLogger = () => {
  const [logs, setLogs] = useState([]);

  // Update logs when new entries are added
  useEffect(() => {
    const handleLogUpdate = (logEntry) => {
      if (logEntry.type === 'CLEAR') {
        setLogs([]);
      } else if (logEntry.type === 'IMPORT') {
        setLogs(logger.getLogs());
      } else {
        setLogs(logger.getLogs());
      }
    };

    logger.addListener(handleLogUpdate);

    // Initialize with existing logs
    setLogs(logger.getLogs());

    return () => {
      logger.removeListener(handleLogUpdate);
    };
  }, []);

  // Memoized logging functions
  const logInfo = useCallback((message, data) => {
    logger.info(message, data);
  }, []);

  const logError = useCallback((message, data) => {
    logger.error(message, data);
  }, []);

  const logWarn = useCallback((message, data) => {
    logger.warn(message, data);
  }, []);

  const logDebug = useCallback((message, data) => {
    logger.debug(message, data);
  }, []);

  const clearLogs = useCallback(() => {
    logger.clearLogs();
  }, []);

  const exportLogs = useCallback(() => {
    return logger.exportLogs();
  }, []);

  const getLogsByLevel = useCallback((level) => {
    return logger.getLogsByLevel(level);
  }, []);

  return {
    logInfo,
    logError,
    logWarn,
    logDebug,
    
    clearLogs,
    exportLogs,
    getLogsByLevel,
    
    logs,
    
    hasErrors: logs.some(log => log.level === 'ERROR'),
    hasWarnings: logs.some(log => log.level === 'WARN'),
    logCount: logs.length,
    errorCount: logs.filter(log => log.level === 'ERROR').length,
    warningCount: logs.filter(log => log.level === 'WARN').length,
  };
};

export default useLogger;