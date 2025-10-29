"use server";

import { auth } from "@/auth";
import { parseServerActionResponse } from "./utils";
import slugify from "slugify";
import { writeCleint } from "@/sanity/lib/write-client";
import React from "react";

export const createPitch = async (
  state: React.SetStateAction<Record<string, string>>,
  form: FormData,
  pitch: string
) => {
  const session = await auth();

  if (!session)
    return parseServerActionResponse({
      error: "Not signed in.",
      status: "ERROR",
    });
  const { title, description, category, link } = Object.fromEntries(
    Array.from(form).filter(([key]) => key !== "pitch")
  );
  const slug = slugify(title as string, {
    lower: true,
    strict: true,
    trim: true,
  });

  try {
    const startup = {
      title,
      description,
      category,
      slug: {
        _type: slug,
        current: slug,
      },
      image: link,
      author: {
        _type: "reference",
        _ref: session.user?.id,
      },
      pitch,
    };
    // console.log(`startup.author: ${JSON.stringify(startup.author, null, 2)}`);
    const result = await writeCleint.create({
      _type: "startup",
      ...startup,
    });
    return parseServerActionResponse({
      ...result,
      error: "",
      status: "SUCCESS",
    });
  } catch (error) {
    const err = JSON.stringify(error, null, 2);
    console.log(`Something went wrong: ${err}`);
    return parseServerActionResponse({
      error: err,
    });
  }
};
