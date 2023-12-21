import { Separator } from "src/components/ui/separator";
import { SidebarNav } from "src/components/ui/sidebar-nav";

const sidebarNavItems = [
  {
    title: "Products",
    href: "/admin/products",
  },
  {
    title: "Categories",
    href: "/admin/categories",
  },
  {
    title: "Orders",
    href: "/admin/orders",
  },
];

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <>
      <div className=" space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">
            Frituur d`Aa Admin Dashboard
          </h2>
          <p className="text-muted-foreground">
            Manage your products, categories and orders
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1">{children}</div>
        </div>
      </div>
    </>
  );
}
