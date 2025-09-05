import Sidebar  from "./Sidebar";
import DashboardNavbar from "./DashboardNavbar";

const DashboardLayout = ({ children }: React.PropsWithChildren<{}>) => {
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
export default DashboardLayout;