import { app } from "./app";
import { appConfig } from "./config/appConfig";
import { ServiceManager } from "./services/ServiceManager";
import { createUserRouter } from "./routes/userRoutes";

const startServer = async () => {
  try {
    //Initialize DAOs + Services first
    await ServiceManager.init();

    // Now that services are ready, create routes
    app.use("/api", createUserRouter());

    app.listen(appConfig.Port, () => {
      console.log(`Server running on port ${appConfig.Port}`);
    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};
startServer();
