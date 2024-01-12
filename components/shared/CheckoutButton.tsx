"use client";
import { IEvent } from "@/lib/database/models/event.model";
import { SignedOut, useUser, SignedIn } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Checkout from "./Checkout";


const CheckoutButton = ({ event }: { event: IEvent }) => {
  // fetch the data for the user buying the ticket
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  // check if the event has already finished
  const hasEventFinished = new Date(event.endDateTime) < new Date();

  return (
    <div className="flex items-center gap-3">
      {/* cannot buy past events */}
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          {" "}
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full" size="lg">
              <Link href="/sign-in"></Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Checkout event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
