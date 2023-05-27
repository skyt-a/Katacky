import { GroupInfo } from "~/app/(authed)/groups/components/GroupInfo";
import { GroupsForm } from "~/app/(authed)/groups/components/GroupsForm";
import { getGroup } from "~/servers/group/query";
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
  return <GroupInfo group={group} user={user} groupUsers={users} />;
};
