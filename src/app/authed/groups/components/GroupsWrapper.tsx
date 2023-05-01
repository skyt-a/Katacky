import { useQRCode } from "next-qrcode";
import { GroupInfo } from "~/app/authed/groups/components/GroupInfo";
import { GroupsForm } from "~/app/authed/groups/components/GroupsForm";
import { getUserInfo } from "~/lib/auth/getUser";
import { prisma } from "~/lib/prisma";

export const GroupsWrapper = async () => {
  const user = await getUserInfo();
  if (!user?.groupId) {
    return <GroupsForm />;
  }
  const group = await prisma.group.findFirst({
    where: {
      id: user.groupId,
    },
  });
  if (!group) {
    return <GroupsForm />;
  }
  return <GroupInfo group={group} />;
};
