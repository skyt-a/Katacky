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

  console.log(fa.messaging);
  const message = await fa.messaging().sendEachForMulticast(params);
  console.log(message.successCount, message.failureCount, message.responses);
  return message;
};
