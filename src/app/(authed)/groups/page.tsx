import { GroupsWrapper } from "~/app/(authed)/groups/_components/GroupsWrapper";

export default function GroupPage() {
  /** @ts-expect-error Async Component  */
  return <GroupsWrapper />;
}
