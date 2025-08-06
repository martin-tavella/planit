import DashboardNavbar from "@/components/layout/DashboardNavbar";
import Sidebar from "@/components/layout/Sidebar"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const Layout = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <>
        <DashboardNavbar />
        <Sidebar />
        { children }
        </>
    )
} 
export default Layout;