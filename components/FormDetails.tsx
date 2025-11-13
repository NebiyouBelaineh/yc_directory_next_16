"use client";
import { Session } from "next-auth";
import { Input } from "./ui/input";
import { useActionState, useState } from "react";
import { Textarea } from "./ui/textarea";
import { useRouter } from "next/navigation";
import MDEditor from "@uiw/react-md-editor";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { formSchema } from "@/lib/validation";
import { z } from "zod";
import { createPitch } from "@/lib/actions";
import { toast } from "sonner";

const FormDetails = ({ session }: { session: Session }) => {
  const router = useRouter();
  const [errors, setErrors] = useState<Record<string, string>>();
  const [pitch, setPitch] = useState<string>("");

  const handleFormSubmission = async (prevState: any, formData: FormData) => {
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

      const result = await createPitch(prevState, formData, pitch);

      if (result.status === "SUCCESS") {
        toast.success("Your startup pitch has been created successfully.");

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
              defaultValue={state.prevState?.title || ""}
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
              defaultValue={state.prevState?.description || ""}
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
              defaultValue={state.prevState?.category || ""}
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
              defaultValue={state.prevState?.link || ""}
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
            {isPending ? "Submitting... " : "Submit Your Pitch"}
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
