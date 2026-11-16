import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../Input/Input";
import type { ComponentProps } from "react";

type PasswordInputProps = Omit<ComponentProps<"input">, "type">;

export function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div>
      <Input {...props} type={showPassword ? "text" : "password"} />
      <button type="button" onClick={togglePasswordVisibility}>
        {showPassword ? <EyeOff /> : <Eye />}
      </button>
    </div>
  );
}
