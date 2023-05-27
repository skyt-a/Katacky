export const serverActionHandler = async <T>(
  action: Promise<T>,
  onSuccess: (data: T) => void,
  onError?: (error: unknown) => void
) => {
  return await action
    .then((res) => onSuccess(res))
    .catch((err) => onError?.(err));
};
