import logo from "../../../../public/img/logo/planit-only.png"
import Image from "next/image";

const Navbar: React.FC = () => {

    const navItems = [
        { route: "/", label: "Home"},
        { route: "/dashboard", label: "My Dashboard"},
        { route: "/about", label: "About"},
    ]

    return (
        <nav className="relative bg-[#1d0c37] py-6 px-8 before:absolute before:bottom-0 before:left-0 before:w-full before:h-[4px] before:bg-[#a98af7] before:shadow-[0_0_5px]">
            <div className="container flex justify-between items-center mx-auto">
            <div className="flex items-center gap-5">
                <Image src={logo.src} alt={"planit-logo"} width={100} height={100} /><span className="text-[#a98af7] text-5xl font-bold">Planit</span>
            </div>
            <div>
                <ul className="flex gap-10 text-[#a98af7] font-bold text-2xl">
                    {navItems.map((item, index) => 
                        <li key={index}><button className="cursor-pointer">{item.label}</button></li>
                    )}
                </ul>
            </div>
            </div>
        </nav>
    )
};

export default Navbar;