import React from "react";
import classNames from "classnames";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "danger";
  isLoading?: boolean;
}

const buttonVariants = {
  primary:
    "bg-primary text-background hover:text-white hover:bg-background px-4 py-2 border rounded-lg duration-300",
  secondary:
    "bg-background text-white hover:text-white hover:bg-gray-01 px-4 py-2 border rounded-lg duration-300",
  outline:
    "bg-transparent text-background hover:text-white hover:bg-gray-01 px-4 py-2 border border-background rounded-lg duration-300",
  danger:
    "bg-red-500 text-white border hover:bg-red-700 px-4 py-2 rounded-lg duration-300",
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  isLoading,
  children,
  className,
  ...props
}) => {
  const classes = classNames(
    "font-size-1em margin-1em padding-0.50em-1em border-2 border-radius-3 cursor-pointer transition-background-color-0.3s-ease color-0.3s-ease",
    buttonVariants[variant],
    className
  );

  return (
    <button className={classes} {...props}>
      {isLoading ? "Carregando..." : children}
    </button>
  );
};

export default Button;
