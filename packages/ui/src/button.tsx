import * as React from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "tonal" | "outlined" | "text" | "fab";
  size?: "sm" | "default" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "filled", size = "default", children, ...props }, ref) => {

    let variantStyles = "";
    if (variant === "filled") {
      variantStyles = "bg-md-primary text-md-on-primary shadow-sm hover:shadow-md before:bg-transparent hover:before:bg-white/10 active:before:bg-white/20";
    } else if (variant === "tonal") {
      variantStyles = "bg-md-secondary-container text-md-on-secondary-container before:bg-transparent hover:before:bg-md-on-secondary-container/10 active:before:bg-md-on-secondary-container/20";
    } else if (variant === "outlined") {
      variantStyles = "border border-md-outline text-md-primary bg-transparent before:bg-transparent hover:before:bg-md-primary/10 active:before:bg-md-primary/20";
    } else if (variant === "text") {
      variantStyles = "bg-transparent text-md-primary before:bg-transparent hover:before:bg-md-primary/10 active:before:bg-md-primary/20";
    } else if (variant === "fab") {
      variantStyles = "bg-md-tertiary text-md-on-tertiary shadow-md hover:shadow-xl rounded-[28px] before:bg-transparent hover:before:bg-white/10 active:before:bg-white/20 h-14 w-14 px-0"; // FABs override size
    }

    let sizeStyles = "";
    if (variant !== "fab") {
      if (size === "sm") sizeStyles = "h-9 px-4 text-sm";
      else if (size === "default") sizeStyles = "h-10 px-6 text-sm";
      else if (size === "lg") sizeStyles = "h-12 px-8 text-base";
    }

    const baseStyles = "relative inline-flex items-center justify-center rounded-full overflow-hidden font-medium active:scale-95 transition-all duration-300 ease-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-md-primary focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none before:absolute before:inset-0 before:transition-colors before:duration-200";

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles} ${sizeStyles} ${className}`}
        {...props}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </button>
    );
  }
);
Button.displayName = "Button";
