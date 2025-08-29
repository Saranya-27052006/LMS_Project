import { OAuth2Client } from "google-auth-library";
import { appConfig } from "../config/appConfig";

const client = new OAuth2Client(appConfig.googleClientId);

export const verifyAuth = async (idToken: string) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: appConfig.googleClientId,
    });
    return ticket.getPayload();
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
};
