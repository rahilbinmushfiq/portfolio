'use client';

import Link from "next/link";
import { Leckerli_One } from "next/font/google";
import { CgMenuRight, CgClose, CgExternal } from "react-icons/cg";
import { useState } from "react";

const leckerliOne = Leckerli_One({
  weight: '400',
  subsets: ['latin'],
});

export default function Header() {
  const [isMobileNavMenuOpen, setIsMobileNavMenuOpen] = useState(false); // State hook for keeping track whether to show or hide the navbar menu on smaller devices

  return (
    <header className={`${isMobileNavMenuOpen ? "min-h-screen bg-[#7342D5] text-white" : "bg-white bg-opacity-75 backdrop-blur-sm"} sticky top-0 flex flex-col px-5 py-6 sm:px-12 sm:py-8 md:px-16 lg:px-20 xl:px-28 2xl:px-36 lg:bg-white lg:bg-opacity-75 lg:backdrop-blur-sm`}>
      <div className="flex justify-between lg:items-center lg: font-semibold">
        {/* Website Logo */}
        <div>
          <Link href="/">
            <p className={`${leckerliOne.className} inline text-2xl leading-none sm:text-3xl`}>Rahil.dev</p>
          </Link>
        </div>
        {/* Mobile Navigation Menu Toggle Button */}
        <button className="lg:hidden" onClick={() => setIsMobileNavMenuOpen(prevState => !prevState)}>
          {isMobileNavMenuOpen ? (
            <CgClose className="text-[26px] sm:text-[32px]" />
          ) : (
            <CgMenuRight className="text-[26px] sm:text-[32px]" />
          )}
        </button>
        {/* Desktop Navigation Bar */}
        <nav className="hidden lg:block">
          {/* Navigation Links */}
          <ul className="w-fit flex gap-x-6 hover:[&>li]:text-[#864DF8] xl:gap-x-10 2xl:gap-x-14">
            <li onClick={() => setIsMobileNavMenuOpen(false)}>
              <Link href="/">Home</Link>
            </li>
            <li onClick={() => setIsMobileNavMenuOpen(false)}>
              <Link href="/#skills">Skills</Link>
            </li>
            <li onClick={() => setIsMobileNavMenuOpen(false)}>
              <Link href="/#about">About</Link>
            </li>
            <li onClick={() => setIsMobileNavMenuOpen(false)}>
              <Link href="/#projects">Projects</Link>
            </li>
            <li onClick={() => setIsMobileNavMenuOpen(false)}>
              <Link href="/#contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <div className="hidden lg:block">
          {/* External Link for Resume */}
          <Link
            className="w-fit mx-auto flex items-center gap-x-2 px-4 py-2 rounded-sm text-white bg-[#864DF8] hover:bg-[#9664F9]"
            href="https://www.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Resume</p>
            <CgExternal size={18} />
          </Link>
        </div>
      </div>
      {/* Mobile Navigation Menu */}
      {isMobileNavMenuOpen && (
        <div className="grow flex flex-col justify-center gap-y-10 text-xl text-center sm:gap-y-14 sm:text-2xl font-semibold">
          <nav>
            {/* Navigation Links */}
            <ul className="w-fit flex flex-col gap-y-10 mx-auto sm:gap-y-14">
              <li onClick={() => setIsMobileNavMenuOpen(false)}>
                <Link href="/">Home</Link>
              </li>
              <li onClick={() => setIsMobileNavMenuOpen(false)}>
                <Link href="/#skills">Skills</Link>
              </li>
              <li onClick={() => setIsMobileNavMenuOpen(false)}>
                <Link href="/#about">About</Link>
              </li>
              <li onClick={() => setIsMobileNavMenuOpen(false)}>
                <Link href="/#projects">Projects</Link>
              </li>
              <li onClick={() => setIsMobileNavMenuOpen(false)}>
                <Link href="/#contact">Contact</Link>
              </li>
            </ul>
          </nav>
          {/* External Link for Resume */}
          <Link
            className="w-fit mx-auto flex items-center gap-x-2 px-6 py-3 rounded-sm border border-white"
            href="https://www.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Resume</p>
            <CgExternal size={26} />
          </Link>
        </div>
      )}
    </header>
  );
}