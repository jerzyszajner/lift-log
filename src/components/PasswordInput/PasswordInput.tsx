import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "../Input/Input";
import type { ComponentProps } from "react";
import styles from "./PasswordInput.module.css";

type PasswordInputProps = Omit<ComponentProps<"input">, "type">;

export function PasswordInput(props: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className={styles.wrapper}>
      <Input {...props} type={showPassword ? "text" : "password"} />
      <button
        className={styles.toggle}
        type="button"
        aria-label="Show password"
        aria-pressed={showPassword}
        onClick={togglePasswordVisibility}
      >
        {showPassword ? <EyeOff size={24} /> : <Eye size={24} />}
      </button>
    </div>
  );
}
