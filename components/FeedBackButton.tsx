"use client";
import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import type { buildFeedbackIntegration } from "/home/neba/personal-projects/learning/next-js/yc_directory/node_modules/@sentry/nextjs/node_modules/@sentry-internal/feedback/build/npm/types/core/integration";
type FeedbackIntegration = ReturnType<typeof buildFeedbackIntegration>;

const FeedBackButton = () => {
  const [feedback, setFeedback] = useState<ReturnType<FeedbackIntegration>>();
  // Read `getFeedback` on the client only, to avoid hydration errors during server rendering
  useEffect(() => {
    setFeedback(Sentry.getFeedback());
  }, []);

  const [widget, setWidget] = useState<ActorComponent | undefined>();
  return (
    <div className="rounded-2xl">
      <Button
        type="button"
        className="bg-transparent hover:bg-transparent text-xl h-full"
        onClick={async () => {
          if (widget) {
            widget.removeFromDom();
            setWidget(null);
          } else {
            setWidget(feedback?.createWidget());
          }
        }}
      >
        {widget ? (
          <div>
            <p>Check right corner widget.</p>
            <span className="underline rounded hover:text-primary hover:cursor-pointer">Click to hide bug report widget.</span>
          </div>
        ) : (
          <div>
            <span  className="underline rounded hover:text-primary hover:cursor-pointer">Want to report a bug?</span>
          </div>
        )}
      </Button>
    </div>
  );
};

export default FeedBackButton;
