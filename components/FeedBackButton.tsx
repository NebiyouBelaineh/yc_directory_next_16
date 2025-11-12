/* eslint-disable @typescript-eslint/ban-ts-comment */
//  @ts-nocheck
"use client";
import * as Sentry from "@sentry/nextjs";
import { useEffect, useState } from "react";
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
  const [widget, setWidget] = useState<SentryWidget>(null);
  useEffect(() => {
    setFeedback(Sentry.getFeedback());
  }, []);

  const handleClick = async () => {
    if (widget) {
      widget.removeFromDom();
      setWidget(null);
    } else {
      setWidget(feedback?.createWidget());
    }
  };
  return (
    <button
      type="button"
      className="hover:bg-secondary items-center gap-2 text-sm w-full text-left px-2 py-1.5 rounded-sm flex transition"
      onClick={handleClick}
    >
      <FaBug className="" />
      {widget ? "Cancel report" : "Report bug"}
    </button>
  );
};

export default FeedBackButton;
