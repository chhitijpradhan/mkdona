import * as React from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className = "", label, ...props }, ref) => {
        return (
            <div className={`relative flex flex-col ${className}`}>
                {label && (
                    <label className="text-sm font-medium text-md-on-surface-variant mb-1 ml-4">{label}</label>
                )}
                <input
                    ref={ref}
                    className="h-14 w-full bg-md-surface-container-low rounded-t-xl rounded-b-none border-b border-md-outline px-4 text-md-on-surface placeholder:text-md-on-surface-variant/50 focus:outline-none focus:border-b-2 focus:border-md-primary focus:bg-md-surface-container-high transition-colors duration-200"
                    {...props}
                />
            </div>
        );
    }
);
Input.displayName = "Input";