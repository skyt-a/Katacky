import { GroupInfo } from "~/app/(authed)/groups/_components/GroupInfo";
import { GroupsForm } from "~/app/(authed)/groups/_components/GroupsForm";
import { getGroup, groupHistory } from "~/servers/group/query";
import { getLoginUser, getUserByGroup } from "~/servers/user/query";

export const GroupsWrapper = async () => {
  const [user, group] = await Promise.all([getLoginUser(), getGroup()]);
  if (!user) {
    throw new Error("User not found");
  }
  if (!group || !user.groupId) {
    return <GroupsForm user={user} />;
  }
  const users = await getUserByGroup(user.groupId);
  const ticketGroupHistory = await groupHistory(users.map((u) => u.id));
  return (
    <GroupInfo
      group={group}
      user={user}
      groupUsers={users}
      ticketGroupHistory={ticketGroupHistory}
    />
  );
};
