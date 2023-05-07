import { GroupInfo } from "~/app/authed/groups/components/GroupInfo";
import { GroupsForm } from "~/app/authed/groups/components/GroupsForm";
import { createCaller } from "~/servers";

export const GroupsWrapper = async () => {
  const caller = await createCaller();
  const user = await caller.user.loggedInUser();
  if (!user) {
    throw new Error("User not found");
  }
  const group = await caller.group.group();
  if (!group || !user.groupId) {
    return <GroupsForm user={user} />;
  }
  const users = await caller.user.byGroup({ groupId: user.groupId });
  return <GroupInfo group={group} user={user} groupUsers={users} />;
};
