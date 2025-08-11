import { app } from "./app"
import { dbConnection } from "./Config/dbConnection";
import { appConfig } from "./Config/appConfig";

app.listen(appConfig.Port, () => {
    console.log(`Server is connected with port ${appConfig.Port}`);
    dbConnection();
});