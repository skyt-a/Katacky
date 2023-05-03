import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = process.env.NEXT_PUBLIC_ADMIN_SECRET
  ? JSON.parse(process.env.NEXT_PUBLIC_ADMIN_SECRET)
  : undefined;
export const firebaseAdmin =
  getApps()[0] ??
  initializeApp({
    credential: cert({
      ...serviceAccount,
      privateKey: serviceAccount.private_key.replace(/\\n/gm, "\n"),
    }),
  });

export const auth = getAuth();
