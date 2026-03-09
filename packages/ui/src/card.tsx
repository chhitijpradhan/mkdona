import * as React from "react";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  interactive?: boolean;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = "", interactive = false, children, ...props }, ref) => {
    const baseStyles = "rounded-[24px] bg-md-surface-container overflow-hidden p-6 md:p-8 text-md-on-surface transition-all duration-300 ease-md";
    const interactiveStyles = interactive ? "group shadow-sm hover:shadow-md hover:scale-[1.02] cursor-pointer hover:bg-md-surface-variant/20" : "shadow-sm";

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${interactiveStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
);
Card.displayName = "Card";
