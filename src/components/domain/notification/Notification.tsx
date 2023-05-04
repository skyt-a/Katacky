"use client";
import { useQuery } from "@tanstack/react-query";
import { isSupported } from "firebase/messaging";
import { useState, useEffect } from "react";
import { requestForToken, onMessageListener } from "~/lib/firebase/fcm";

const checkSupport = async () => {
  const isSupportedThis = await isSupported();
  return isSupportedThis;
};

export const Notification = () => {
  const [notification, setNotification] = useState<{
    title: string | undefined;
    body: string | undefined;
  }>({ title: "", body: "" });
  useEffect(() => {
    if (notification?.title) {
      alert("title: " + notification?.title + "\nbody: " + notification?.body);
    }
  }, [notification]);

  const [isSupportedMessage, setIsSupportedMessage] = useState<Boolean>(false);
  useEffect(() => {
    checkSupport().then((isSupportedThis) => {
      setIsSupportedMessage(isSupportedThis);
    });
  }, []);

  requestForToken(Boolean(isSupportedMessage));
  onMessageListener(Boolean(isSupportedMessage))
    .then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
    })
    .catch((err) => console.log("failed: ", err));

  return <div />;
};
