import { BatchResponse } from "firebase-admin/lib/messaging/messaging-api";
import * as fa from "firebase-admin";
import { firebaseAdmin } from "~/lib/firebase/server";

export const sendFirebaseCloudMessage = async (
  notification: { title: string; body: string },
  tokens: string[]
): Promise<BatchResponse> => {
  const params = {
    notification,
    tokens,
  };

  return await fa.messaging().sendEachForMulticast(params);
};
