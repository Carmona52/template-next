"use client";

import Link from "next/link";
import {usePathname} from "next/navigation";
import {FC} from "react";

const navItems = [
    {label: "Inicio", href: "/"},
    {label: "Pagina1", href: "/example1"},
    {label: "Pagina2", href: "/example2"},
    {label: "Pagina3", href: "/example3"},
];

const Navbar: FC = () => {
    const pathname = usePathname();

    return (
        <nav className="flex items-center justify-between px-6 py-4 bg-blue-600 text-white">
            <div className="text-lg font-bold">MiApp</div>
            <ul className="flex gap-6">
                {navItems.map(({label, href}) => (
                    <li key={href}>
                        <Link
                            href={href}
                            className={`hover:underline ${
                                pathname === href ? "font-semibold underline" : ""
                            }`}
                        >
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default Navbar;
