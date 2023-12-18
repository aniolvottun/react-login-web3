import React from "react";
import { LoginButtonProps } from "./LoginButton.types";

const LoginButton: React.FC<LoginButtonProps> = ({
  size,
  primary,
  disabled,
  text,
  onClick,
  ...props
}) => {
  const buttonStyle = {
    backgroundColor: primary ? "blue" : "gray",
    // Add more styles as needed
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={{ ...buttonStyle, ...props.style }}
    >
      {text || "Connect wallet"}
    </button>
  );
};

export default LoginButton;
