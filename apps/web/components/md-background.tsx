import * as React from "react";

export function MdBackground() {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
            {/* Base radial gradient wash */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-md-secondary-container)_0%,_transparent_50%)] opacity-40"></div>

            {/* Large organic blur shapes */}
            <div className="absolute -top-1/4 -left-1/4 w-[120vw] h-[100vh] bg-md-primary/10 rounded-full blur-3xl mix-blend-multiply opacity-50"></div>

            <div className="absolute top-1/2 -right-1/4 w-[80vw] h-[80vh] bg-md-tertiary/10 rounded-[100px] rounded-tr-[20px] blur-3xl mix-blend-multiply opacity-50 transform rotate-12"></div>

            {/* Deep atmospheric glow */}
            <div className="absolute -bottom-1/4 left-1/4 w-[100vw] h-[80vh] bg-md-secondary/5 rounded-full blur-3xl mix-blend-multiply opacity-60"></div>
        </div>
    );
}
