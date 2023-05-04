import { BatchResponse } from "firebase-admin/lib/messaging/messaging-api";
import * as firebaseAdmin from "firebase-admin";

export const sendFirebaseCloudMessage = async (
  notification: { title: string; body: string },
  tokens: string[]
): Promise<BatchResponse> => {
  const params = {
    notification,
    tokens,
  };

  return await firebaseAdmin.messaging().sendEachForMulticast(params);
};
