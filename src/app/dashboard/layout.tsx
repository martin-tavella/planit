import DashboardNavbar from "@/components/layout/DashboardNavbar";
import Sidebar from "@/components/layout/Sidebar";

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const Layout = ({ children }: React.PropsWithChildren<{}>) => {
  return (
    <>
      <DashboardNavbar />
      <div className="flex justify-center relative">
        <Sidebar />
        <main className="transition-all duration-300">
          {children}
        </main>
      </div>
    </>
  );
};
export default Layout;
