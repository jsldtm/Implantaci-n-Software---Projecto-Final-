'use client';  // This file is a client component because it uses the `useRouter` hook from Next.js.

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Home"},
    { href: "/upcoming", label: "Upcoming"},
    { href: "/trending", label: "Trending"},
    { href: "/my-favorites", label: "My Favorites"},
    { href: "/top-rated", label: "Top Rated"},
    { href: "/popular", label: "Popular"},
    { href: "/now-playing", label: "Now Playing"}

];



const Header = () => {
    const pathname = usePathname();
    const [activeLink, setActiveLink] = useState(pathname);

    useEffect(() => {
        setActiveLink(pathname);
    }, [pathname]);

    return (
        <header>
            <nav className = "flex-gap4">
                <ul className = "flex-gap4">
                    {links.map((link) => (
                        <li key = {link.href}>
                            <Link
                                href = {link.href}
                                className={`${activeLink === link.href ? "active" : ""} ${
                                    pathname === link.href ? "blue" : "black"
                                }`}
                            >
                                {link.label}

                                


                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
