import logo from "../../../../public/img/logo/planit-only.png"
import Image from "next/image";

const Navbar: React.FC = () => {
    return (
        <nav className="flex justify-between items-center bg-[#1d0c37] py-4 px-6">
            <div className="flex items-center gap-5">
                <Image src={logo.src} alt={"planit-logo"} width={120} height={120} /><span className="text-[#a98af7] text-6xl font-bold">Planit</span>
            </div>
        </nav>
    )
};

export default Navbar;