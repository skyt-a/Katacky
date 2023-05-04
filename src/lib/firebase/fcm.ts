"use client";
import {
  MessagePayload,
  getMessaging,
  getToken,
  onMessage,
} from "firebase/messaging";
import { trpc } from "~/lib/trpc/connectNext";

export const requestForToken = async (isSupported: boolean) => {
  const updateDeviceToken = trpc.user.updateDeviceToken.useMutation();
  if (!isSupported) {
    return null;
  }
  const messaging = getMessaging();
  const tokenInLocalForage = localStorage.getItem("fcm_token");
  if (tokenInLocalForage) {
    return tokenInLocalForage;
  }
  const status = await Notification.requestPermission();
  if (!status || status !== "granted") {
    return null;
  }
  const token = await getToken(messaging, {
    vapidKey: process.env.NEXT_PUBLIC_FCM_TOKEN,
  }).catch((err) => {
    console.error("An error occurred while retrieving token. ", err);
    return null;
  });
  if (!token) {
    console.log(
      "No registration token available. Request permission to generate one."
    );
    return null;
  }
  console.log("current token for client: ", token);
  localStorage.setItem("fcm_token", token);
  await updateDeviceToken.mutateAsync({ deviceToken: token });
  return token;
};

export const onMessageListener: (
  isSupported: boolean
) => Promise<MessagePayload | undefined> = async (isSupported: boolean) => {
  if (!isSupported) {
    return;
  }
  const messaging = getMessaging();
  return new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      console.log("payload", payload);
      resolve(payload);
    });
  });
};