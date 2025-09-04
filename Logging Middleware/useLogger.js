import { useEffect, useState } from 'react';
import logger from './logger';

/**
 * Custom React hook to subscribe to logger updates
 * Returns logs and a function to clear them
 */
export default function useLogger() {
  const [logs, setLogs] = useState(logger.getLogs());

  useEffect(() => {
    const handleLogUpdate = () => {
      setLogs(logger.getLogs());
    };

    logger.addListener(handleLogUpdate);

    return () => {
      logger.removeListener(handleLogUpdate);
    };
  }, []);

  return {
    logs,
    clearLogs: () => logger.clearLogs(),
  };
}
