// components/ui/card.tsx
import React from "react";

export function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-lg shadow-md p-4 bg-gray-800 ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mb-2 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h2 className={`text-xl font-bold ${className}`}>{children}</h2>;
}

export function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mt-2 ${className}`}>{children}</div>;
}
