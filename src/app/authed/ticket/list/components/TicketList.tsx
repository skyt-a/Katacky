"use client";
import { Ticket as TicketType, User } from "@prisma/client";
import { useState } from "react";
import { CSSTransition } from "react-transition-group";
import { TicketPopupContent } from "~/app/authed/ticket/list/components/TicketPopupContent";
import { Button } from "~/components/common";
import { Ticket } from "~/components/domain/tickets/Ticket";
import { UnionNullToUndefined } from "~/util/types";

type TicketListProps = {
  tickets: TicketType[];
  user: User;
};

export const TicketList = ({ tickets, user }: TicketListProps) => {
  const [selectedTicket, setSelectedTicket] =
    useState<UnionNullToUndefined<TicketType>>();
  const onClickTicket = (ticket: UnionNullToUndefined<TicketType>) => () => {
    setSelectedTicket(ticket);
  };
  console.log(selectedTicket);
  return (
    <>
      <ul className="relative">
        {tickets.map((ticket, index) => (
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
                  <TicketPopupContent ticket={selectedTicket} user={user} />
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
