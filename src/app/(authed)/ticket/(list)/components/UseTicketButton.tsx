import { Ticket as TicketType } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useReward } from "react-rewards";
import { Button, Input } from "~/components/common";
import { Sheet, SheetContent, SheetTrigger } from "~/components/common/sheet";
import { useToast } from "~/components/common/use-toast";
import { FormControlWrapper } from "~/components/domain/form/FormControlWrapper";
import { serverActionHandler } from "~/lib/client/serverActionHandler";
import { useInput } from "~/util/form";
import { UnionNullToUndefined } from "~/util/types";

type UseTicketButtonProps = {
  ticket: UnionNullToUndefined<TicketType>;
  onUseSuccess: () => void;
  useTicket(id: number, message?: string | undefined): Promise<TicketType>;
};

export const UseTicketButton = ({
  ticket,
  onUseSuccess,
  useTicket,
}: UseTicketButtonProps) => {
  const { toast } = useToast();
  const [, startTransition] = useTransition();

  const router = useRouter();
  const messageInput = useInput("");
  const { reward } = useReward("animation-target", "confetti");

  const onClickUseTicket = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    startTransition(() => {
      if (!ticket.id) {
        return;
      }
      serverActionHandler(useTicket(ticket.id, messageInput.value), () => {
        toast({
          toastType: "info",
          description: "チケット🎫を使用しました",
        });
        onUseSuccess();
        reward();
        router.refresh();
      });
    });
  };

  return (
    <>
      {!ticket.isUsed && (
        <Sheet>
          <SheetTrigger className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4 w-full">
            チケットを使う
          </SheetTrigger>
          <SheetContent position="top" size="content">
            <FormControlWrapper id="message" label="コメント">
              <Input id="message" type="text" {...messageInput} />
            </FormControlWrapper>
            <Button
              type="button"
              className="w-full mt-4"
              onClick={onClickUseTicket}
            >
              チケットを使う
            </Button>
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};
