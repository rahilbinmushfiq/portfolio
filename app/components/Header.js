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
    <header className={`${isMobileNavMenuOpen ? "max-lg:min-h-screen max-lg:bg-[#7342D5] max-lg:text-white" : "max-lg:bg-white max-lg:bg-opacity-75 max-lg:backdrop-blur-sm"} sticky top-0 flex flex-col z-[2] p-6 shadow-lg sm:px-12 md:px-16 lg:px-20 lg:bg-white lg:bg-opacity-75 lg:backdrop-blur-sm xl:px-36 2xl:px-56`}>
      <div className="flex justify-between lg:items-center lg:font-medium">
        {/* Website Logo */}
        <div>
          <Link href="/">
            <p className={`${leckerliOne.className} inline text-2xl leading-none`}>Rahil.dev</p>
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
            className="flex items-center gap-x-2 px-4 py-2 rounded-sm text-xs text-white border border-[#864DF8] bg-[#864DF8] hover:text-[#864DF8] hover:bg-transparent 2xl:text-sm"
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
        <div className="grow flex flex-col justify-center gap-y-12 text-lg text-center font-medium sm:gap-y-16 sm:text-2xl lg:hidden">
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
            className="flex items-center gap-x-2 w-fit mx-auto px-6 py-3 rounded-sm border border-white sm:px-8 sm:py-4"
            href="https://www.google.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <p>Resume</p>
            <CgExternal size={20} />
          </Link>
        </div>
      )}
    </header>
  );
}