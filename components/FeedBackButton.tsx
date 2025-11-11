/* eslint-disable @typescript-eslint/ban-ts-comment */
//  @ts-nocheck
"use client";
import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { FaBug } from "react-icons/fa";
// import type { buildFeedbackIntegration } from "/home/neba/personal-projects/learning/next-js/yc_directory/node_modules/@sentry/nextjs/node_modules/@sentry-internal/feedback/build/npm/types/core/integration";
// type FeedbackIntegration = ReturnType<typeof buildFeedbackIntegration>;

type SentryWidget =
  | {
      removeFromDom: () => void;
    }
  | null
  | undefined;

const FeedBackButton = () => {
  const [feedback, setFeedback] = useState();
  // Read `getFeedback` on the client only, to avoid hydration errors during server rendering
  useEffect(() => {
    setFeedback(Sentry.getFeedback());
  }, []);

  const [widget, setWidget] = useState<SentryWidget>(null);
  return (
    <div className="rounded-2xl">
      <Tooltip className="bg-white">
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant={"outline"}
            className="h-ful"
            onClick={async () => {
              if (widget) {
                widget.removeFromDom();
                setWidget(null);
              } else {
                setWidget(feedback?.createWidget());
              }
            }}
          >
            <FaBug className={"border-black-100"}/>
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {widget ? (
              <div>
                <span className="hover:cursor-pointer bg-black text-white rounded p-1">
                  Check the right corner widget. Click here to hide bug report
                  widget.
                </span>
              </div>
            ) : (
              <div>
                <span className="hover:cursor-pointer bg-black text-white rounded p-1">
                  Want to report a bug? Click here.
                </span>
              </div>
            )}
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default FeedBackButton;
