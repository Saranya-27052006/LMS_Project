import { app } from "./app";
import { appConfig } from "./Config/appConfig";
import { ServiceManager } from "./services/ServiceManager";
import { createUserRouter } from "./routes/userRoutes";
import { createMeetingRouter } from "./routes/meetingRoutes";
import { createHackathonRouter } from "./routes/hackathonRoutes";
import { createReportRouter } from "./routes/reportRoutes";

const startServer = async () => {
  try {
    //Initialize DAOs + Services first
    await ServiceManager.init();
    // Now that services are ready, create routes
    app.use("/api", createUserRouter());
    app.use("/meeting",createMeetingRouter());
    app.use("/hackathon",createHackathonRouter());
    app.use("/report",createReportRouter())
    app.listen(appConfig.Port, () => {
      console.log(`Server running on port ${appConfig.Port}`);

    });
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};
startServer();
