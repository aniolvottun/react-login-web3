import { MouseEventHandler, CSSProperties } from "react";

export interface LoginButtonProps {
  text?: string;
  primary?: boolean;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
  onClick?: MouseEventHandler<HTMLButtonElement>;
  style?: CSSProperties;
}
