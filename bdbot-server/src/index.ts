import app from "app";
import { logger } from "utils/log/logger.util";
import { databaseClient } from "database";

app.listen(app.get("port"), async () => {
  logger.info("Server running on http://localhost:" + app.get("port") + "/");

  try {
    await databaseClient.$connect();
    logger.info("Database connection has been established.");
  } catch (error) {
    logger.error("Database connection could not be established.");
  }

  logger.info("Application is now ready to serve.");
});
