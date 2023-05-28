import { Group } from "@prisma/client";
import { watch } from "fs";
import { useQRCode } from "next-qrcode";
import { FC } from "react";
import { Button } from "react-day-picker";
import { ScheduleForm } from "~/app/(authed)/ticket/create/_components/ScheduleForm";
import { Sheet, SheetTrigger, SheetContent } from "~/components/common/sheet";
import { createTicket } from "~/servers/ticket/mutation";

type GroupInviteButtonProps = {
  token: Group["token"];
};

export const GroupInviteButton: FC<GroupInviteButtonProps> = ({ token }) => {
  const { Canvas } = useQRCode();

  return (
    <Sheet>
      <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 w-full">
        グループに招待する
      </SheetTrigger>
      <SheetContent position="bottom" size="content">
        <p className="mt-4">
          以下のQRコードを読み取ると他の人がグループに参加できます
        </p>
        <div className="flex justify-center mt-4">
          <Canvas
            text={token}
            // logo={{
            //   src: imageUrl ?? "",
            //   options: {
            //     width: 50,
            //     x: 75,
            //     y: 75,
            //   },
            // }}
            options={{
              level: "M",
              margin: 3,
              scale: 4,
              width: 200,
              color: {
                dark: "#000",
                light: "#fff",
              },
            }}
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};
