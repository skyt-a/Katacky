"use client";
import { format } from "date-fns";
import { getStorage, ref, uploadBytes } from "firebase/storage";

export const uploadFileToStorage = async (userId: string, url: string) => {
  const storageRef = ref(
    getStorage(),
    `images/${userId}/profile/${format(
      new Date(),
      "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"
    )}`
  );
  const blob = await fetch(url).then((r) => r.blob());
  const snapshot = await uploadBytes(storageRef, blob);
  return snapshot.ref.fullPath;
};
