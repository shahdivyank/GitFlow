import crypto from "node:crypto";
import { App } from "octokit";

const privateKeyPkcs8 = crypto
  .createPrivateKey(process.env.PRIVATE_KEY)
  .export({
    type: "pkcs8",
    format: "pem",
  });

const app = new App({
  appId: process.env.APP_ID,
  privateKey: privateKeyPkcs8,
});

export default app;
