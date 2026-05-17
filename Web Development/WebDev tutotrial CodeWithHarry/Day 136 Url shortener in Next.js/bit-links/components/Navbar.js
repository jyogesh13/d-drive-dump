import React from "react";
import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="bg-gray-900 text-purple-400 flex justify-between items-center px-4 h-14 ">
            <div className="logo">
                <Link href="/">
                    <h1 className="text-3xl font-bold">Bit Links</h1>
                </Link>
            </div>
            <ul className="flex items-center justify-center gap-4">
                <Link href="/">
                    <li>Home</li>
                </Link>
                <Link href="/about">
                    <li>About</li>
                </Link>
                <Link href="/shorten">
                    <li>Shorten</li>
                </Link>
                <Link href="/contact">
                    <li>Contact us</li>
                </Link>

                <li className="flex gap-3">
                    <Link href="/shorten">
                        <button className="hover:bg-white hover:text-black p-1 px-2 rounded-xl cursor-pointer">Try now</button>
                    </Link>
                    <Link target="_blank" href="/github">
                        <button className="hover:bg-red-400 hover:text-black p-1 px-2 rounded-xl cursor-pointer">Github</button>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
