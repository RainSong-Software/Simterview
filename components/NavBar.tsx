"use client";

import Link from 'next/link'
import Image from 'next/image'
import React, { useState, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Menu, X } from 'lucide-react'

const NavBar = ({ username, userId, coinCount }: { username: string, userId: string, coinCount: number }) => {
  const userProfilePath = "/u/" + userId;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    };
    if (isMobileMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="w-full border-b border-slate-200 dark:border-slate-700 bg-transparent z-50">
      <div className="max-w-6xl mx-auto px-4">
        <nav className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2 hover:opacity-90 flex-shrink-0">
            <Image
              src="/icon.png"
              alt="logo"
              width={35}
              height={35}
              unoptimized
            />
            <h2 className="font-bold text-xl">Simterview</h2>
          </Link>

          <div className="hidden sm:flex items-center gap-6 ">
            <Link href="/custom-interview" className="text-slate-600 dark:text-slate-300 px-3 py-2 rounded-md text-md font-medium hover:bg-slate-100 dark:hover:bg-slate-800">
              Custom Interview
            </Link>
            <Link href="/interview-list" className="text-slate-600 dark:text-slate-300 px-3 py-2 rounded-md text-md font-medium hover:bg-slate-100 dark:hover:bg-slate-800">
              Interview List
            </Link>
            <Link href="/blog" className="text-slate-600 dark:text-slate-300 px-3 py-2 rounded-md text-md font-medium hover:bg-slate-100 dark:hover:bg-slate-800">
              Guide Blogs
            </Link>
            <Link href="mailto:rainsongsoftware@gmail.com" className="text-slate-600 dark:text-slate-300 px-3 py-2 rounded-md text-md font-medium hover:bg-slate-100 dark:hover:bg-slate-800">
              Support
            </Link>

            {(username !== "")
              ? (
                <div className="flex items-center gap-4 ml-4">
                  <div className="flex items-center gap-1 text-sm text-slate-600 dark:text-slate-300">
                    <Image src="/coin.png" alt="coin count" width={20} height={20} />
                    {coinCount}
                  </div>
                  <Link href={userProfilePath} className="flex items-center gap-2 hover:opacity-80">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <span className="text-sm font-bold">{username.charAt(0).toUpperCase()}</span>
                    </div>
                    <span className="font-medium text-sm text-slate-700 dark:text-slate-200 ">{username}</span>
                  </Link>
                </div>
              )
              : (
                <Button asChild size="sm" className="ml-4">
                  <Link href="/sign-in">
                    Sign In
                  </Link>
                </Button>
              )
            }
          </div>

          <div className="flex sm:hidden items-center gap-3">
            {username !== "" && (
              <Link href={userProfilePath} className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  <span className="text-sm font-bold">{username.charAt(0).toUpperCase()}</span>
                </div>
              </Link>
            )}
            <button
              onClick={toggleMobileMenu}
              className="text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-slate-100 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </div>

      {isMobileMenuOpen && (
        <div ref={menuRef} className="sm:hidden absolute top-16 left-0 right-0 z-40 bg-white dark:bg-slate-900 shadow-lg border-t dark:border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/custom-interview" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsMobileMenuOpen(false)}>
              Custom Interview
            </Link>
            <Link href="/interview-list" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsMobileMenuOpen(false)}>
              Interview List
            </Link>
            <Link href="/blog" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsMobileMenuOpen(false)}>
              Guide Blogs
            </Link>
            <Link href="mailto:rainsongsoftware@gmail.com" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsMobileMenuOpen(false)}>
              Support
            </Link>
            <hr className="border-slate-200 dark:border-slate-700 my-1" />
            {username !== "" ? (
              <>
                <Link href={userProfilePath} className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsMobileMenuOpen(false)}>
                  Your Profile
                </Link>
                <div className="px-3 py-2 text-sm text-slate-500 dark:text-slate-400">
                  <span>{username}</span>
                  <div className="flex items-center gap-1 mt-1">
                    <Image src="/coin.png" alt="coin count" width={16} height={16} />
                    <span>{coinCount} Coins</span>
                  </div>
                </div>
              </>
            ) : (
              <Link href="/sign-in" className="block px-3 py-2 rounded-md text-base font-medium text-blue-600 dark:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800" onClick={() => setIsMobileMenuOpen(false)}>
                Sign In
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}

export default NavBar