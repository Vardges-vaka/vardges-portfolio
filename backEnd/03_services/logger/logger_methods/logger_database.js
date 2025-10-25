/**
 * Database logging methods
 * Provides specialized logging for database operations
 */

export const createDatabaseMethods = (logger) => ({
  /**
   * Log database connection
   * @param {string} dbName - Name of the database
   * @param {object} meta - Additional metadata (host, port, etc.)
   */
  connect: (dbName, meta = {}) => {
    logger.info(`🔌 Database connected: ${dbName}`, {
      type: "db_connect",
      database: dbName,
      ...meta,
    });
  },

  /**
   * Log database disconnection
   * @param {string} dbName - Name of the database
   * @param {object} meta - Additional metadata
   */
  disconnect: (dbName, meta = {}) => {
    logger.info(`🔌❌ Database disconnected: ${dbName}`, {
      type: "db_disconnect",
      database: dbName,
      ...meta,
    });
  },

  /**
   * Log database query operation
   * @param {string} operation - Type of operation (find, insert, update, delete, etc.)
   * @param {string} collection - Collection/table name
   * @param {object} meta - Additional metadata (filter, query details, etc.)
   */
  query: (operation, collection, meta = {}) => {
    logger.debug(`🗃️ DB Operation: ${operation} on ${collection}`, {
      type: "db_query",
      operation,
      collection,
      ...meta,
    });
  },

  /**
   * Log database error
   * @param {string} operation - Operation that failed
   * @param {Error} error - Error object
   * @param {object} meta - Additional metadata
   */
  error: (operation, error, meta = {}) => {
    logger.error(`🗃️❌ DB Error: ${operation}`, {
      type: "db_error",
      operation,
      error: error.message,
      stack: error.stack,
      ...meta,
    });
  },
});
