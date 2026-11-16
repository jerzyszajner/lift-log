import type { ComponentProps } from "react";

type ErrorMessageProps = ComponentProps<"p">;

export function ErrorMessage(props: ErrorMessageProps) {
  return <p {...props} />;
}
