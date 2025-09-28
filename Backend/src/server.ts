import { setupApp } from "./app";
import { appConfig } from "./Config/appConfig";




export const startServer = async () => {
  try {
    //Initialize DAOs + Services first
    const app = await setupApp(); 
   
    app.listen(appConfig.Port, () => {
      console.log(`Server running on port ${appConfig.Port}`);

    });
  } catch (err) {
    console.error("Failed to start server:", err)
    process.exit(1);
  }
};
startServer()


