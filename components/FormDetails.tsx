"use client";
import { Session } from "next-auth";
import { Input } from "./ui/input";
import { useActionState, useEffect, useState } from "react";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { createPitch, updatePitch } from "@/lib/actions";
import { toast } from "sonner";
import { STARTUP_BY_ID_QUERYResult } from "@/sanity/types";

const FormDetails = ({
  session,
  startup,
}: {
  session: Session;
  startup?: STARTUP_BY_ID_QUERYResult;
}) => {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>();
  const [pitch, setPitch] = useState<string>(startup?.pitch || "");
  const [creatingPitch, setcreatingPitch] = useState<boolean>(true);

  useEffect(() => {
    // If there is a startup to update, set state to false, i.e updating mode
    if (startup) setcreatingPitch(false);
  }, [startup]);

  const handleFormSubmission = async (
    prevState: React.SetStateAction<Record<string, string>>,
    formData: FormData
  ) => {
    const formValues = {
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      category: formData.get("category") as string,
      link: formData.get("link") as string,
      pitch, // being obtianed from the 'pitch' state, not the form
    };
    try {
      // console.log(`formValues: ${JSON.stringify(formValues, null, 2)}`);
      await formSchema.parseAsync(formValues);
      let result;

      if (creatingPitch) {
        result = await createPitch(prevState, formData, pitch);
      } else if (startup?._id) {
        result = await updatePitch(prevState, formData, pitch, startup._id);
      }

      if (result.status === "SUCCESS") {
        toast.success(
          `Your startup pitch has been ${creatingPitch ? "created" : "updated"} successfully.`
        );

        router.push(`/startup/${result._id}`);
      }
      return result;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors = error.flatten().fieldErrors;
        setErrors(fieldErrors as unknown as Record<string, string>);
        toast.error("Error", {
          description: "Please check your inputs and try again.",
        });
        return {
          prevState: { ...formValues },
          error: "Validation failed",
          status: "ERROR",
        };
      }

      toast.error("Error", {
        description: "An unexpected error has occured.",
      });
      return {
        prevState: { ...formValues },
        error: "An unexpected error has occured",
        status: "ERROR",
      };
    } finally {
    }
  };
  const [state, formAction, isPending] = useActionState(handleFormSubmission, {
    error: "",
    status: "INITIAL",
    prevState: {
      title: "",
      description: "",
      category: "",
      link: "",
    },
  });

  return (
    <>
      {session ? (
        <form action={formAction} className="startup-form">
          <div>
            <label htmlFor="title" className="startup-form_label">
              Title
            </label>
            <Input
              id="title"
              name="title"
              className="startup-form_input"
              required
              placeholder="Startup Title"
              defaultValue={state.prevState?.title || startup?.title}
            />
            {errors?.title && (
              <p className="startup-form_error">{errors.title}</p>
            )}
          </div>
          <div>
            <label htmlFor="description" className="startup-form_label">
              Description
            </label>
            <Textarea
              id="description"
              name="description"
              className="startup-form_textarea"
              required
              placeholder="Startup Description"
              defaultValue={
                state.prevState?.description || startup?.description
              }
            />
            {errors?.description && (
              <p className="startup-form_error">{errors.description}</p>
            )}
          </div>
          <div>
            <label htmlFor="category" className="startup-form_label">
              category
            </label>
            <Input
              id="category"
              name="category"
              className="startup-form_input"
              required
              placeholder="Startup category (EdTech, FinTech, MedTech...etc.)"
              defaultValue={state.prevState?.category || startup?.category}
            />
            {errors?.category && (
              <p className="startup-form_error">{errors.category}</p>
            )}
          </div>
          <div>
            <label htmlFor="link" className="startup-form_label">
              image
            </label>
            <Input
              id="link"
              name="link"
              className="startup-form_input"
              required
              placeholder="Startup Image URL"
              defaultValue={state.prevState?.link || startup?.image}
            />
            {errors?.link && (
              <p className="startup-form_error">{errors.link}</p>
            )}
          </div>
          <div data-color-mode="light">
            <label htmlFor="pitch" className="startup-form_label">
              pitch
            </label>
            <MDEditor
              value={pitch}
              onChange={(value) => setPitch(value as string)}
              preview="edit"
              height={300}
              style={{
                borderRadius: 20,
                overflow: "hidden",
              }}
              className="startup-form_textarea"
              textareaProps={{
                placeholder:
                  "Briefly describe your idea and what problem it solves.",
              }}
              previewOptions={{
                disallowedElements: ["style"],
              }}
            />
            {errors?.pitch && (
              <p className="startup-form_error">{errors.pitch}</p>
            )}
          </div>
          <Button
            type="submit"
            className="startup-form_btn text-white hover:text-primary hover:!bg-secondary"
            disabled={isPending}
            // onClick={() => toast.success('Submitted pitch.')}
          >
            {creatingPitch
              ? isPending
                ? "Submitting... "
                : "Submit Your Pitch"
              : isPending
                ? "Updating... "
                : "Update Your Pitch"}
            <Send className="size-6 ml-2" />
          </Button>
        </form>
      ) : (
        router.push("/") // should go to the newly created startup pitch page
      )}
    </>
  );
};

export default FormDetails;
