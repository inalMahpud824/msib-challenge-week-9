const createServer = require("./server");
const { PORT } = require("./config");
const sequelize = require("./utils/sequelize");
const logger = require("./utils/logger");
const { syncTables } = require("./utils/db");

function startServer() {
  const app = createServer();
  return app.listen(PORT, async () => {
    try {
      await sequelize.authenticate();
      await syncTables();
      logger.info(`Server is listening on port ${PORT}`);
    } catch (err) {
      logger.error(`Cannot start server, error: ${err.message}`);
      process.exit(1);
    }
  });
}

startServer();