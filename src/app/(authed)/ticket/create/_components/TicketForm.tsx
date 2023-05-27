"use client";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import { Suspense, useState, useTransition } from "react";
import { ScheduleForm } from "~/app/(authed)/ticket/create/_components/ScheduleForm";
import { Button, Input as TextInput } from "~/components/common";
import { Sheet, SheetContent, SheetTrigger } from "~/components/common/sheet";
import { useToast } from "~/components/common/use-toast";
import { FormControlWrapper } from "~/components/domain/form/FormControlWrapper";
import { Ticket } from "~/components/domain/tickets/Ticket";
import { LoadingSpinner } from "~/components/layout/LoadingSpinner";
import { ph } from "~/util/form";
import { ticketFormLength } from "~/util/setting";
import { useZodForm } from "~/lib/form/useZodForm";
import {
  CreateTicketSchema,
  createTicketSchema,
} from "~/servers/ticket/createTicketSchema";
import { ControlledDatePicker } from "~/app/(authed)/ticket/create/_components/form/ControlledDatePicker";
import { Form } from "react-hook-form";
import { createTicket } from "~/servers/ticket/mutation";

type TicketFormProps = {
  user: User | null;
  groupUsers: User[];
};

export const TicketForm = ({ user, groupUsers }: TicketFormProps) => {
  const router = useRouter();
  const { register, control, watch } = useZodForm({
    schema: createTicketSchema,
  });

  const { title, message, backgroundColor, from, to, expiredDate } = watch();
  const isDisabledButton =
    title?.length === 0 ||
    !user ||
    from?.length === 0 ||
    to?.length === 0 ||
    message?.length === 0 ||
    backgroundColor?.length === 0;
  const { toast } = useToast();

  return (
    <Form
      control={control}
      className="flex flex-col gap-4"
      // @ts-ignore
      onSubmit={async ({ data }: { data: CreateTicketSchema }) => {
        const ticket = await createTicket(data).catch(() => null);
        if (!ticket) {
          toast({
            toastType: "error",
            description: "チケットの作成に失敗しました",
          });
          return;
        }
        toast({
          toastType: "info",
          description: "チケットを作成しました",
        });
        router.refresh();
        router.push("/ticket/hold");
      }}
    >
      <FormControlWrapper label="宛先" id="to">
        <TextInput
          id="to"
          type="text"
          placeholder={`宛先を入力してください(${ticketFormLength.to}文字以内)`}
          required={true}
          maxLength={ticketFormLength.to}
          {...register("to")}
        />
      </FormControlWrapper>
      <FormControlWrapper id="from" label="送り主" className="mt-2">
        <TextInput
          id="from"
          type="text"
          placeholder={`送り主を入力してください(${ticketFormLength.from}文字以内)`}
          required={true}
          maxLength={ticketFormLength.from}
          {...register("from")}
        />
      </FormControlWrapper>
      <FormControlWrapper label="タイトル" id="title" className="mt-2">
        <TextInput
          id="title"
          type="text"
          placeholder={`タイトルを入力してください(${ticketFormLength.title}文字以内)`}
          maxLength={ticketFormLength.title}
          required={true}
          {...register("title")}
        />
      </FormControlWrapper>
      <FormControlWrapper id="message" label="メッセージ" className="mt-2">
        <TextInput
          id="message"
          type="text"
          placeholder={`メッセージを入力してください(${ticketFormLength.message}文字以内)`}
          maxLength={ticketFormLength.message}
          required={true}
          {...register("message")}
        />
      </FormControlWrapper>
      <FormControlWrapper id="color" label="背景色" className="mt-2">
        <TextInput
          id="color"
          type="color"
          required={true}
          {...register("backgroundColor")}
        />
      </FormControlWrapper>
      <FormControlWrapper id="expired" label="有効期限" className="mt-2">
        <ControlledDatePicker name="expiredDate" control={control} />
      </FormControlWrapper>
      <FormControlWrapper id="startDate" label="利用開始日" className="mt-2">
        <ControlledDatePicker name="availableDateFrom" control={control} />
      </FormControlWrapper>
      <Suspense fallback={<LoadingSpinner />}>
        <Ticket
          to={ph(to, "宛先が入ります")}
          title={ph(title, "タイトルが入ります")}
          message={ph(message, "メッセージが入ります")}
          backgroundColor={backgroundColor}
          from={user?.name ?? ""}
          expiredDate={expiredDate}
        />
      </Suspense>

      <Button type="submit" disabled={isDisabledButton}>
        チケット作成
      </Button>
      <Sheet>
        <SheetTrigger
          className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background bg-primary text-primary-foreground hover:bg-primary/90 h-10 py-2 px-4"
          disabled={isDisabledButton || !Boolean(user?.groupId)}
        >
          このチケットをスケジュール発行する
        </SheetTrigger>
        <SheetContent position="bottom" size="content">
          <ScheduleForm
            createTicket={createTicket}
            users={groupUsers}
            value={watch()}
          />
        </SheetContent>
      </Sheet>
    </Form>
  );
};
