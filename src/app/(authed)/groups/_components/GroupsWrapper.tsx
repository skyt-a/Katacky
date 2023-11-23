import { GroupInfo } from "~/app/(authed)/groups/_components/GroupInfo";
import { GroupsForm } from "~/app/(authed)/groups/_components/GroupsForm";
import { getDownloadURLFromStorage } from "~/lib/firebase/storageServer";
import { getGroup, groupHistory } from "~/servers/group/query";
import { getLoginUser, getUserByGroup } from "~/servers/user/query";
import { createGroup } from "~/servers/group/mutation";
import { joinGroup } from "~/servers/user/mutation";

export const GroupsWrapper = async () => {
  const [user, group] = await Promise.all([getLoginUser(), getGroup()]);
  if (!user) {
    throw new Error("User not found");
  }
  if (!group || !user.groupId) {
    return <GroupsForm createGroup={createGroup} joinGroup={joinGroup} />;
  }
  const users = await getUserByGroup(user.groupId);
  const [ticketGroupHistory, ...usesrWithProfileImage] = await Promise.all([
    groupHistory(users.map((u) => u.id)),
    ...users.map(async (u) => {
      const imageUrl = await getDownloadURLFromStorage(u?.profileImageUrl);
      return {
        ...u,
        profileImageUrl: imageUrl ?? null,
      };
    }),
  ]);
  return (
    <GroupInfo
      group={group}
      user={user}
      groupUsers={usesrWithProfileImage}
      ticketGroupHistory={ticketGroupHistory}
    />
  );
};
