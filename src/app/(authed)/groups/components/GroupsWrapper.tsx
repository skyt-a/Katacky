import { GroupInfo } from "~/app/(authed)/groups/components/GroupInfo";
import { GroupsForm } from "~/app/(authed)/groups/components/GroupsForm";
import { getUserInfo } from "~/lib/auth/getUser";
import { rsc } from "~/lib/trpc/server/trpc";

export const GroupsWrapper = async () => {
  const [user, group] = await Promise.all([
    getUserInfo(),
    rsc.group.group.fetch(),
  ]);
  if (!user) {
    throw new Error("User not found");
  }
  if (!group || !user.groupId) {
    return <GroupsForm user={user} />;
  }
  const users = await rsc.user.byGroup.fetch({ groupId: user.groupId });
  return <GroupInfo group={group} user={user} groupUsers={users} />;
};
