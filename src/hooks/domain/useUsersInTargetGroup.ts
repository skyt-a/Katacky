import { trpc } from "~/lib/trpc/connectNext";

export const useUsersInTargetGroup = (groupId: number | undefined | null) => {
  return trpc.user.byGroup.useQuery(
    {
      groupId: groupId!,
    },
    { enabled: Boolean(groupId) }
  );
};
