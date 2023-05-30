"use client";
import { Ticket as TicketType, User } from "@prisma/client";
import { useEffect, useState } from "react";
import { CSSTransition } from "react-transition-group";
import { AssignTicketButton } from "~/app/(authed)/ticket/(list)/components/AssignTicketButton";
import { DeleteTicketButton } from "~/app/(authed)/ticket/(list)/components/DeleteTicketButton";
import { UseTicketButton } from "~/app/(authed)/ticket/(list)/components/UseTicketButton";
import { Button } from "~/components/common";
import { checkSupport } from "~/components/domain/notification/Notification";
import { Ticket } from "~/components/domain/tickets/Ticket";
import { onMessageListener } from "~/lib/firebase/fcm";
import { ticketHolds } from "~/servers/ticket/query";
import { UnionNullToUndefined } from "~/util/types";

type TicketListProps = {
  tickets: TicketType[];
  groupUsers: User[];
};

export const TicketList = ({ tickets, groupUsers }: TicketListProps) => {
  const [ticketsState, setTicketsState] = useState<TicketType[]>(tickets);
  const [isSupportedMessage, setIsSupportedMessage] = useState<Boolean>(false);
  useEffect(() => {
    checkSupport().then((isSupportedThis) => {
      setIsSupportedMessage(isSupportedThis);
    });
  }, []);
  onMessageListener(Boolean(isSupportedMessage))
    .then(async () => {
      setTicketsState(await ticketHolds());
    })
    .catch((err) => console.log("failed: ", err));
  const [selectedTicket, setSelectedTicket] =
    useState<UnionNullToUndefined<TicketType>>();
  const onClickTicket = (ticket: UnionNullToUndefined<TicketType>) => () => {
    setSelectedTicket(ticket);
  };
  const onMutateSuccess = () => {
    setSelectedTicket(undefined);
    setTicketsState(
      ticketsState.filter((ticket) => ticket.id !== selectedTicket?.id)
    );
  };

  return (
    <>
      {ticketsState.length === 0 && (
        <p className="mt-4 text-center">チケットはありません</p>
      )}
      <ul className="relative">
        {ticketsState.map((ticket, index) => (
          <CSSTransition
            classNames="ticket"
            timeout={400}
            key={ticket.id}
            in={!selectedTicket || selectedTicket.id === ticket.id}
            unmountOnExit
            mountOnEnter
            style={
              {
                width: "100%",
                position: "absolute",
                top: `${index * 60}px`,
                animation:
                  selectedTicket &&
                  selectedTicket?.id === ticket.id &&
                  "goTop 0.3s ease-in-out forwards",
              } as React.CSSProperties
            }
          >
            <li
              onClick={onClickTicket(
                ticket as UnionNullToUndefined<TicketType>
              )}
            >
              {/** @ts-expect-error Async Component */}
              <Ticket key={ticket.id} {...ticket} />
              {selectedTicket && selectedTicket?.id === ticket.id && (
                <div className="mt-4">
                  <UseTicketButton
                    ticket={selectedTicket}
                    onUseSuccess={onMutateSuccess}
                  />
                  <div className="mt-2">
                    <AssignTicketButton
                      ticket={selectedTicket}
                      users={groupUsers}
                      onAssignSuccess={onMutateSuccess}
                    />
                  </div>
                  <div className="mt-2">
                    <DeleteTicketButton
                      selectedTicketId={selectedTicket.id}
                      onDeleteSuccess={onMutateSuccess}
                    />
                  </div>
                  <Button
                    className="w-full mt-2"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedTicket(undefined);
                    }}
                  >
                    キャンセル
                  </Button>
                </div>
              )}
            </li>
          </CSSTransition>
        ))}
      </ul>
    </>
  );
};
