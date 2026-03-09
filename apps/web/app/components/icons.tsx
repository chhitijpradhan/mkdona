 "use client";
 
 import React from "react";
 
 const iconProps = {
   fill: "none",
   stroke: "currentColor",
   strokeWidth: 1.5,
   strokeLinecap: "round" as const,
   strokeLinejoin: "round" as const,
   viewBox: "0 0 24 24",
 };
 
 function IconCollaboration({ className }: { className?: string }) {
   return (
     <svg className={className} {...iconProps}>
       <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
       <circle cx="9" cy="7" r="4" />
       <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
       <path d="M16 3.13a4 4 0 0 1 0 7.75" />
     </svg>
   );
 }
 
 function IconAutomation({ className }: { className?: string }) {
   return (
     <svg className={className} {...iconProps}>
       <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
     </svg>
   );
 }
 
 function IconAnalytics({ className }: { className?: string }) {
   return (
     <svg className={className} {...iconProps}>
       <line x1="18" y1="20" x2="18" y2="10" />
       <line x1="12" y1="20" x2="12" y2="4" />
       <line x1="6" y1="20" x2="6" y2="14" />
     </svg>
   );
 }
 
 function IconIntegrations({ className }: { className?: string }) {
   return (
     <svg className={className} {...iconProps}>
       <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
       <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
     </svg>
   );
 }
 
 function IconSecurity({ className }: { className?: string }) {
   return (
     <svg className={className} {...iconProps}>
       <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
     </svg>
   );
 }
 
 function IconSupport({ className }: { className?: string }) {
   return (
     <svg className={className} {...iconProps}>
       <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
       <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
       <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
     </svg>
   );
 }
 
 function IconGlobal({ className }: { className?: string }) {
   return (
     <svg className={className} {...iconProps}>
       <circle cx="12" cy="12" r="10" />
       <line x1="2" y1="12" x2="22" y2="12" />
       <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
     </svg>
   );
 }
 
 export {
   IconCollaboration,
   IconAutomation,
   IconAnalytics,
   IconIntegrations,
   IconSecurity,
   IconSupport,
   IconGlobal,
 };