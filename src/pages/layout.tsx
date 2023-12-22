import React from "react";
import Header from "~/components/Header";
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen">
      <Header />
      {children}
    </div>
  );
}
