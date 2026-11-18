import type { ReactNode } from "react";

type ScreenHeaderProps = {
  title: string;
  back?: ReactNode;
  children?: ReactNode;
};

export function ScreenHeader({ title, back, children }: ScreenHeaderProps) {
  return (
    <header>
      <div>{back}</div>
      <h1>{title}</h1>
      <div>{children}</div>
    </header>
  );
}
