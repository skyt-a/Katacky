"use client";
import { isSupported } from "firebase/messaging";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { requestForToken, onMessageListener } from "~/lib/firebase/fcm";

export const checkSupport = async () => {
  const isSupportedThis = await isSupported();
  return isSupportedThis;
};

export const Notification = () => {
  const [isSupportedMessage, setIsSupportedMessage] = useState<Boolean>(false);
  useEffect(() => {
    checkSupport().then((isSupportedThis) => {
      setIsSupportedMessage(isSupportedThis);
    });
  }, []);

  const router = useRouter();
  requestForToken(Boolean(isSupportedMessage));
  onMessageListener(Boolean(isSupportedMessage))
    .then(() => {
      router.refresh();
    })
    .catch((err) => console.log("failed: ", err));

  return <div />;
};
