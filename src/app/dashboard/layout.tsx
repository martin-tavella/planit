import Sidebar from "@/components/layout/Sidebar"

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const Layout = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <>
        <Sidebar />
        { children }
        </>
    )
} 
export default Layout;