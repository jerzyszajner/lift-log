import type { ComponentProps } from "react";

type InputProps = ComponentProps<"input">;

export function Input(props: InputProps) {
  return <input {...props} />;
}
