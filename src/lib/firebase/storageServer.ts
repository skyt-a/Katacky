import { storage } from "~/lib/firebase/server";

export const getDownloadURLFromStorage = async (pathToFile: string | null) => {
  if (!pathToFile) {
    return;
  }
  const ref = storage.file(pathToFile);
  const [metadata] = await ref.getMetadata();

  const token = metadata.metadata.firebaseStorageDownloadTokens;
  const link = `https://firebasestorage.googleapis.com/v0/b/${
    storage.name
  }/o/${encodeURIComponent(pathToFile)}?alt=media&token=${token}`;
  return link;
};
