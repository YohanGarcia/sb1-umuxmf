// ui/layouts/AdminLayout.tsx
import { ReactNode } from "react";

interface AdminLayoutProps {
  children: ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="min-h-screen ">
      {children}
    </div>
  );
}

export default AdminLayout;
